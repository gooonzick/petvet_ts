import { memo, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';

import {
  Avatar, Box, Typography,
} from '@mui/material';

import { useUpdateDocInfoMutation } from '@/redux/api/doc.api';
import { useUpdateUserInfoMutation } from '@/redux/api/user.api';

import { updateUser } from '@/redux/slices/userSlice';

import { Doctor, User } from '@/models/models';

import { avatarStyle, parentBoxStyle } from './styles';

import EditableText from '../EditableText';

type Props = {
  user: User | Doctor
  editable: boolean
};

type EditFields = 'name' | 'email' | 'phone' | 'clinicAddress';

function UserInfo({ user, editable }: Props) {
  const input = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [updateDocInfo] = useUpdateDocInfoMutation();

  const editInfo = useCallback((field: EditFields) => async (newVal: string) => {
    let result;
    const requestBody = { [field]: newVal };
    switch (field) {
      case 'email':
      case 'name':
      case 'phone':
        result = await updateUserInfo(requestBody).unwrap();
        dispatch(updateUser(result));
        break;
      case 'clinicAddress':
        result = await updateDocInfo(requestBody).unwrap();
        dispatch(updateUser(result));
        break;
      default:
        break;
    }
  }, [dispatch, updateDocInfo, updateUserInfo]);

  const renderTextFields = useCallback(() => {
    if (editable) {
      const doctInfo = (user as Doctor)?.docInfo?.clinicAddress ?? 'Информация отсутсвтует';
      return (
        <>
          <EditableText text={user.name} onSubmitEdit={editInfo('name')} />
          <EditableText text={user.email} onSubmitEdit={editInfo('email')} />
          <EditableText text={user.phone} onSubmitEdit={editInfo('phone')} />
          {user.userGroupId === 1
          && <EditableText text={doctInfo} onSubmitEdit={editInfo('clinicAddress')} />}
        </>
      );
    }

    return (
      <>
        <Typography variant="h5">{user.name}</Typography>
        <Typography>{user.email}</Typography>
        <Typography>{user.phone}</Typography>
        {user.userGroupId === 1
        && <Typography>{(user as Doctor).docInfo.clinicAddress}</Typography>}
      </>
    );
  }, [editInfo, editable, user]);

  return (
    <Box sx={parentBoxStyle}>
      <Avatar
        alt={user.name}
        src={user.img}
        sx={avatarStyle}
        onClick={() => input.current?.click()}
      >
        {editable && <input hidden type="file" ref={input} />}
        {!user.img && user.name.slice(0, 1)}
      </Avatar>
      <Box sx={{ textAlign: { xs: 'center', sm: 'left', md: 'left' } }}>
        {renderTextFields()}
      </Box>
    </Box>
  );
}

export default memo(UserInfo);

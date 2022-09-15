import {
  Avatar, Box, SxProps, Theme, Typography,
} from '@mui/material';
import { memo, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Doctor, User } from '../../models/models';
import { useUpdateDocInfoMutation } from '../../redux/api/doc.api';
import { useUpdateUserInfoMutation } from '../../redux/api/user.api';
import { updateUser } from '../../redux/slices/userSlice';
import EditableText from '../EditableText/EditableText';

type Props = {
  user: User | Doctor
  editable: boolean
}

type EditFields = 'name'| 'email' | 'phone' |'clinicAddress'

const parentBoxStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  flexDirection: { xs: 'column', sm: 'row', md: 'row' },
  justifyContent: { xs: 'center', sm: 'start', md: 'start' },
};

const avatarStyle: SxProps<Theme> = {
  height: '8rem',
  width: '8rem',
};

function UserInfo({ user, editable }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [updateDocInfo] = useUpdateDocInfoMutation();
  const editInfo = useCallback((field: EditFields) => async (newVal: string) => {
    // do some async
    let result;
    const requestBody = { [field]: newVal };
    console.log(requestBody);
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
  }, []);
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
      <Box>
        {editable
          ? (
            <>
              <EditableText text={user.name} onSubmitEdit={editInfo('name')} />
              <EditableText text={user.email} onSubmitEdit={editInfo('email')} />
              <EditableText text={user.phone} onSubmitEdit={editInfo('phone')} />
              {user.userGroupId === 1
              && (
                <EditableText
                  text={(user as Doctor)?.docInfo?.clinicAddress
              ?? 'Информация отсутсвтует'}
                  onSubmitEdit={editInfo('clinicAddress')}
                />
              )}
            </>
          )
          : (
            <>
              <Typography variant="h5">{user.name}</Typography>
              <Typography>{user.email}</Typography>
              <Typography>{user.phone}</Typography>
              {user.userGroupId === 1
              && <Typography>{(user as Doctor).docInfo.clinicAddress}</Typography>}
            </>
          )}
      </Box>
    </Box>
  );
}

export default memo(UserInfo);

import {
  Avatar, Box, CardActionArea, SxProps, Theme, Typography,
} from '@mui/material';
import { memo, useRef } from 'react';
import { Doctor, User } from '../../models/models';
import EditableText from '../EditableText/EditableText';

type Props = {
  user: User | Doctor
  editable: boolean
}

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
  const editInfo = (field: string) => async (newVal: string) => {
    // do some async
  };
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
              <EditableText text={user.name} onSubmitEdit={() => editInfo('username')} />
              <EditableText text={user.email} onSubmitEdit={() => editInfo('email')} />
              <EditableText text={user.phone} onSubmitEdit={() => editInfo('phone')} />
              {user.userGroupId === 1
              && (
                <EditableText
                  text={(user as Doctor)?.docInfo?.clinicAddress
              ?? 'Информация отсутсвтует'}
                  onSubmitEdit={() => editInfo('clinicAddress')}
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

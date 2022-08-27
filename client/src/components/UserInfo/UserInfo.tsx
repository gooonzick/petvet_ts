import {
  Avatar, Box, CardActionArea, SxProps, Theme, Typography,
} from '@mui/material';
import { useRef } from 'react';
import { User } from '../../models/models';
import EditableText from '../EditableText/EditableText';

type Props = {
    user: User
    editable: boolean
}

const parentBoxStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  flexDirection: { xs: 'column', md: 'row' },
  justifyContent: { xs: 'center', md: 'start' },
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
            </>
          )
          : (
            <>
              <Typography>{user.email}</Typography>
              <Typography>{user.name}</Typography>
              <Typography>{user.phone}</Typography>
            </>
          )}
      </Box>
    </Box>
  );
}

export default UserInfo;
import {
  Avatar, Box, CardActionArea, Typography,
} from '@mui/material';
import { useRef } from 'react';
import { User } from '../../models/models';
import EditableText from '../EditableText/EditableText';

type Props = {
    user: User
    editable: boolean
}

const parentBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
};

const avatarStyle = {
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
        alt="profile pic"
        src={user.img}
        sx={avatarStyle}
        onClick={() => input.current?.click()}
      >
        {editable && <input hidden type="file" ref={input} />}
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

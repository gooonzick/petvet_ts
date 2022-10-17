import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { User } from '../../models/models';
import { RootState } from '../../redux/store';

const UserProfilePage = lazy(() => import('./blocks/UserProfilePage'));
const DocProfilePage = lazy(() => import('./blocks/DocProfilePage'));

function ProfilePage() {
  const user = useSelector((store: RootState) => store.auth.user) as User;
  return user.userGroupId === 1 ? <DocProfilePage /> : <UserProfilePage />;
}

export default ProfilePage;

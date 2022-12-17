import { lazy, memo } from 'react';
import { connect } from 'react-redux';

import { userGroupSelector } from '@/redux/selectors/userSelector';
import type { RootState } from '@/redux/types';

const UserProfilePage = lazy(() => import('./blocks/UserProfilePage/UserProfilePage'));
const DocProfilePage = lazy(() => import('./blocks/DocProfilePage/DocProfilePage'));

type Props = {
  userGroup: number | undefined;
};

const mapStateToProps = (state: RootState) => {
  const userGroup = userGroupSelector(state);
  return { userGroup };
};

function ProfilePage({ userGroup }: Props) {
  return userGroup === 1 ? <DocProfilePage /> : <UserProfilePage />;
}

export default connect(mapStateToProps)(memo(ProfilePage));

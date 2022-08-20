import React from 'react';
import EditableText from '../../components/EditableText/EditableText';

type Props = {}

function ProfilePage() {
  return (
    <>
      <div>ProfilePage</div>
      <EditableText text="bla" onSubmitEdit={async () => {}} />
    </>
  );
}

export default ProfilePage;

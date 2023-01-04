import { useState } from 'react';

import useDebounce from './useDebounce';

type DocFilter = {
  profileFilter: string
  categoryFilter: string
  userNameFilter: string
};

function useFilterDoc(initialValue: DocFilter) {
  const { profileFilter, categoryFilter, userNameFilter } = initialValue;
  const [userName, setDocName] = useState(userNameFilter);
  const [profileId, setProfileId] = useState(profileFilter);
  const [categoryId, setCategoryId] = useState(categoryFilter);
  const userNameD = useDebounce(userName, 1000);

  const inputHandlers = {
    setDocName, setProfileId, setCategoryId,
  };

  return {
    userName, userNameD, profileId, categoryId, inputHandlers,
  };
}

export default useFilterDoc;

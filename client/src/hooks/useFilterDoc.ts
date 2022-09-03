import { ChangeEvent, useState } from 'react';
import useDebounce from './useDebounce';

type DocFilter = {
  profileFilter: string
  categoryFilter: string
  userNameFilter: string
}

function useFilterDoc(initialValue: DocFilter) {
  const { profileFilter, categoryFilter, userNameFilter } = initialValue;
  const [userName, setDocName] = useState(userNameFilter);
  const [profileName, setProfileName] = useState(profileFilter);
  const [categoryName, setCategoryName] = useState(categoryFilter);
  const userNameD = useDebounce(userName, 1000);

  const inputHandlers = {
    setDocName, setProfileName, setCategoryName,
  };

  return {
    userName, userNameD, profileName, categoryName, inputHandlers,
  };
}

export default useFilterDoc;

import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import AuthPage from './pages/AuthPage/AuthPage';
import NewPetFormPage from './pages/NewPetFormPage/NewPetFormPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { setCredentials } from './redux/slices/userSlice';

const getAuthState = () => {
  const userFromStorage = localStorage.getItem('user');
  const tokenFromStorage = sessionStorage.getItem('token');
  if (userFromStorage && tokenFromStorage) {
    return { user: JSON.parse(userFromStorage), token: tokenFromStorage };
  }
  return null;
};

function App() {
  const dispath = useDispatch();
  const authState = getAuthState();

  useMemo(() => {
    if (authState) {
      dispath(setCredentials(authState));
    }
  }, [authState]);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={(<div>Hi</div>)} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/newPet" element={<NewPetFormPage />} />
      </Routes>
    </>
  );
}

export default App;

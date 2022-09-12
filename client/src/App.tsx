import { lazy, Suspense, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import NavBar from './components/NavBar/NavBar';
import PetProfilePage from './pages/PetProfilePage/PetProfilePage';
import { setCredentials } from './redux/slices/userSlice';

const AuthPage = lazy(() => import('./pages/AuthPage/AuthPage'));
const DocPublic = lazy(() => import('./pages/DocPublicPage/DocPublicPage'));
const DocSearch = lazy(() => import('./pages/DocSearchPage/DocSearch'));
const NewPetFormPage = lazy(() => import('./pages/NewPetFormPage/NewPetFormPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));

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
    <Suspense fallback={<Loader />}>
      <NavBar />
      <Routes>
        <Route path="/" element={(<div>Hi</div>)} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pets/new" element={<NewPetFormPage />} />
        <Route path="/pets/:id" element={<PetProfilePage />} />
        <Route path="/vets" element={<DocSearch />} />
        <Route path="/vets/:id" element={<DocPublic />} />
      </Routes>
    </Suspense>
  );
}

export default App;

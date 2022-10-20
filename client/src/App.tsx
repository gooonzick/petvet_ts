import {
  lazy, Suspense, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Route, Routes,
} from 'react-router-dom';
import Loader from '@/components/Loader/Loader';
import NavBar from '@/components/NavBar/NavBar';
import PetProfilePage from '@/pages/PetProfilePage/PetProfilePage';
import { useIsAuthQuery } from '@/redux/api/auth.api';
import { setCredentials, signOut } from './redux/slices/userSlice';

const AuthPage = lazy(() => import('@/pages/AuthPage/AuthPage'));
const DocPublic = lazy(() => import('@/pages/DocPublicPage/DocPublicPage'));
const DocSearch = lazy(() => import('@/pages/DocSearchPage/DocSearch'));
const NewPetFormPage = lazy(() => import('@/pages/NewPetFormPage/NewPetFormPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage/ProfilePage'));
const SchedulePage = lazy(() => import('@/pages/SchedulePage/SchedulePage'));

function HomePage() {
  return <div>Hi</div>;
}

function App() {
  const dispath = useDispatch();
  const { data, isLoading, isError } = useIsAuthQuery();

  useEffect(() => {
    if (isError || !data) {
      dispath(signOut());
    } else {
      dispath(setCredentials(data));
    }
  }, [isLoading]);

  if (isLoading) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pets/new" element={<NewPetFormPage />} />
        <Route path="/pets/:id" element={<PetProfilePage />} />
        <Route path="/vets" element={<DocSearch />} />
        <Route path="/vets/:id" element={<DocPublic />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </Suspense>
  );
}

export default App;

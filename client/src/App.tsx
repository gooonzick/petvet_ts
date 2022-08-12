import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import AuthPage from './Pages/AuthPage/AuthPage';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={(<div>Hi</div>)} />
        <Route path="auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;

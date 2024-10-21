import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

// pages & components
import Login from './pages/Login';
import Signup from './adminpages/Signup';
import Main from './pages/Main/Main';
import Singlepage from './pages/singlepage/Singlepage';
import Header from './Components/header/Header';
import LoadingSpinner from './Components/loaderSpinner/LoaderSpinner';
import Admin from './pages/admin/Admin';
import Singleuser from './pages/singleuser/Singleuser';
import Archives from './pages/archives/Archives';
import Camera from './pages/camera/Camera';
import Profile from './pages/profile/Profile';
import Setting from './pages/settings/Setting';

function App() {
  const { user } = useAuthContext();
  const { isLoading } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        {isLoading && <LoadingSpinner boolean={isLoading} />}
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Main /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/admin" element={user ? <Admin /> : <Navigate to="/login" />} />
            <Route path="/archives" element={user ? <Archives /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/setting" element={user ? <Setting /> : <Navigate to="/login" />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/signup" element={user ? <Signup /> : <Navigate to="/login" />} />
            <Route path="/debt/:id" element={user ? <Singlepage /> : <Navigate to="/login" />} />
            <Route path="/singleuser/:id" element={user ? <Singleuser /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

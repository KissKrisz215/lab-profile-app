import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { IsAnon } from './components/IsAnon';
import {IsPrivate} from './components/IsPrivate'
import {ProfilePage} from './pages/ProfilePage'

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<IsAnon> <HomePage /> </IsAnon>}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignUpPage />}></Route>
      <Route path="/profile" element={<IsPrivate> <ProfilePage /></IsPrivate>}></Route>
    </Routes>
    </div>
  );
}

export default App;

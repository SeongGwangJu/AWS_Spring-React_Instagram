import React from 'react';
import { Route, Routes } from 'react-router';
import AuthRoute from './auth/AuthRoute';
import RootLayout from './components/Layouts/RootLayout/RootLayout';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';

function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path='/' element={ <AuthRoute element={ <Home /> } /> } />
        <Route path='/accounts/emailsignup' element={ <AuthRoute element={ <Signup /> }/> } />
        <Route path='/accounts/login' element={ <AuthRoute element={ <Signin /> }/> } />
        
        <Route path='/:username' element={<AuthRoute element={ <Profile /> }/>} />
        <Route path='/explore' element={<div>test3</div>} />
      </Routes>
    </RootLayout>
  );
}

export default App;
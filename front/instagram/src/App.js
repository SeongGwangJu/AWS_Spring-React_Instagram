import React from 'react';
import { Route, Routes } from 'react-router';
import RootLayout from './components/Layouts/RootLayout/RootLayout';
import Sidebar from './components/Sidebar/Sidebar';
import { Reset } from 'styled-reset';
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';
import AuthRoute from './auth/AuthRoute';

function App(props) {
  return (
    <RootLayout>
      {/* <Sidebar /> */}
      <Reset />
      <Routes>
        {/* <Route path='' element={ <div> HOME </div> } /> */}
        <Route path='/' element={ <AuthRoute element={<div> HOME </div>} /> } />
        <Route path='/accounts/emailsignup' element={<Signup />} />
        {/* <Route path='/accounts/login' element={ <AuthRoute element={ <Signin/> }/> } /> */}
        <Route path='/accounts/login' element={ <Signin/> } />
        <Route path='/:username' element={<div></div>} />
        <Route path='/explore' element={<div></div>} />
      </Routes>
    </RootLayout>
  );
}

export default App;
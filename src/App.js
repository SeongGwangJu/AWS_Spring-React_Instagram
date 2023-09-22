import React from 'react';
import { Route, Routes } from 'react-router';
import RootLayout from './components/Layouts/RootLayout/RootLayout';
import Sidebar from './components/Sidebar/Sidebar';
import { Reset } from 'styled-reset';
import Signup from './pages/Signup/Signup';

function App(props) {
  return (
    <RootLayout>
      {/* <Sidebar /> */}
      <Reset />
      <Routes>
        <Route path='' element={<div></div>} />
        <Route path='/accounts/emailsignup' element={<Signup />} />
        <Route path='/:username' element={<div></div>} />
        <Route path='/explore' element={<div></div>} />
      </Routes>
    </RootLayout>
  );
}

export default App;
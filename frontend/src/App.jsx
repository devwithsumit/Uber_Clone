import { useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import { CaptainHome, CaptainLogin, CaptainLogout, CaptainProtectedWrapper, CaptainSignup, Home, Riding, Start, UserLogin, UserLogout, UserProtectedWrapper, UserSignup } from './pages'
import CaptainRiding from './pages/CaptainRiding'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-register' element={<UserSignup />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-register' element={<CaptainSignup />} />
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />
        <Route path='/user-logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />
        <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        } />
        <Route path='/captain-riding' element={<CaptainRiding />} />
        <Route path='/captain-logout' element={
          <CaptainProtectedWrapper>
            <CaptainLogout />
          </CaptainProtectedWrapper>
        } />
      </Routes>
    </>
  )
}

export default App

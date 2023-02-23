import axios from 'axios'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {

  axios.defaults.baseURL = 'http://localhost:3000'


  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
      </Route>
    </Routes>
  )
}

export default App

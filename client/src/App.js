import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Items from './components/Items'

export default function App() {
  const initial_token = localStorage.getItem('todo-token')
  const [progress, setprogress] = useState(0)
  const [header, setheader] = useState(initial_token)
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar setprogress={setprogress}/>
        <LoadingBar
          progress={progress}
          color='#00ff37'
        />
        <Routes>
          <Route path="/" element={<LoginForm setheader={setheader} setprogress={setprogress} />} />
          <Route path="/signup" element={<SignupForm setheader={setheader} setprogress={setprogress} />} />
          <Route path="/home" element={<Items header={header} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
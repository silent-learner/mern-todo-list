import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route , Link } from "react-router-dom"
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Items from './components/Items'
import Alert from './components/Alert'

export default function App() {
  const initial_token = localStorage.getItem('todo-token')
  const [progress, setprogress] = useState(0)
  const [header, setheader] = useState(initial_token)
  const [alert, setalert] = useState(null)
  const showAlert = (message , type) => {
    setalert({message, type});
    setTimeout(() => {
      setalert(null)
    }, 1500);
  }
  return (

    <div className='App'>
      <BrowserRouter>
        <Navbar setprogress={setprogress} showAlert={showAlert}/>
        <LoadingBar
          progress={progress}
          color='#00ff37'
        />
        <Alert alert={alert}/>
        <Routes>
          <Route path="/" element={<LoginForm setheader={setheader} setprogress={setprogress} showAlert={showAlert}/>} />
          <Route path="/signup" element={<SignupForm setheader={setheader} setprogress={setprogress} showAlert={showAlert} />} />
          <Route path="/home" element={<Items header={header} showAlert={showAlert}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
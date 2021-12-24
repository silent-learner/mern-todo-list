import React, { useState } from 'react'
import Items from './Items'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const HomeScreen = (props) => {
    const [header, setheader] = useState('')
    const [isSignUp, setisSignUp] = useState(false)
    return (
        <>
            <div className='container' style={{"maxWidth" : "600px"}}>
                {
                    !header ? (!isSignUp ? <LoginForm toggle={setisSignUp} setheader={setheader}/> : <SignupForm setheader={setheader} toggle={setisSignUp}/>) : <Items header={header}/>
                }
            </div>
        </>
    )
}

export default HomeScreen

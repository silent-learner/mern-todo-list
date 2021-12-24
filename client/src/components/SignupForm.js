import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignupForm = (props) => {
    const navigate = useNavigate();
    const { setheader , setprogress} = props
    const [input, setinput] = useState({
        username : '',
        email: '',
        password: '',
        cpassword : ''
    })
    useEffect(() => {
        const token = localStorage.getItem('todo-token')
        if (token) {
            navigate('/home')
        }
        // eslint-disable-next-line
    }, [])
    const handleonchange = (e) => {
        setinput({ ...input, [e.target.id]: e.target.value })
    }
    const handleSubmit = async (e) => {
        setprogress(5)
        try{
            e.preventDefault()
            const data = await fetch('http://192.168.43.167:8080/createuser', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(input)
            })
            const json = await data.json()
            setprogress(50)
            // console.log(json.authtoken);

            if (json.success) {
                const set = () => setheader(json.authtoken)
                set();
                localStorage.setItem('todo-token', json.authtoken)
                navigate('/home')
                props.showAlert("Signed in successfully","danger")
                setprogress(100)
            }
            else{
                console.log(json.message);
                props.showAlert(json.message,"danger")
                setprogress(100)
            }
        }
        catch(e){
            console.log(e)
        }
    }
    return (
        <div className='container border p-2 mt-3  bg-white' style={{"maxWidth" : "500px" , "fontFamily" : "'Baloo Bhaijaan 2', cursive"}} >
            <h2 className='text-center mt-3'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">User Name</label>
                    <input type="text" className="form-control" id="username" passwordaria-describedby="username" onChange={handleonchange} value={input.username} required minLength={3}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" passwordaria-describedby="emailHelp" onChange={handleonchange} value={input.email} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={handleonchange} value={input.password}  required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" onChange={handleonchange} value={input.cpassword}  required minLength={5}/>
                </div>
                <div className="d-flex justify-content-center">
                <div className='my-1 mx-3'><small>Account Already ? <span onClick={() => { navigate('/')}} className='text-primary' style={{"cursor" : "pointer"}}>Log In</span></small></div>
                <button type="submit" className="btn btn-primary mx-3">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default SignupForm

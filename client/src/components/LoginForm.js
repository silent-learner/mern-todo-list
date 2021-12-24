import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = (props) => {
    const { setheader , setprogress} = props
    const navigate = useNavigate();
    const [input, setinput] = useState({
        email: '',
        password: ''
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
        setprogress(5);
        try{
            e.preventDefault()
            const data = await fetch('http://192.168.43.167:8080/login', {
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
                props.showAlert("Login Successful","success")
                setprogress(100)
            }
            else{
                console.log(json.message);
                props.showAlert(json.message,"danger")
                setprogress(100)
            }
        }catch(e){
            console.log(e)
        }
    }
    return ( 
        <div className='container border p-2 mt-4  bg-white' style={{"maxWidth" : "500px" , "fontFamily" : "'Baloo Bhaijaan 2', cursive"}}>
            <h2 className='text-center mt-3'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" passwordaria-describedby="emailHelp"  required onChange={handleonchange} value={input.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" required  onChange={handleonchange} value={input.password} minLength={5} />
                </div>
                <div className="d-flex justify-content-center">
                <div className='my-1 mx-3'><small>No account ? <span onClick={() =>{ navigate('/signup')}} className='text-primary' style={{"cursor" : "pointer"}}>SignUp</span></small></div>
                <button type="submit" className="btn btn-primary mx-3">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm

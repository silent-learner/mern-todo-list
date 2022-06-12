import React, { useEffect, useState } from 'react'
import todoicon from './todoicon.png'
import {Link , useNavigate} from "react-router-dom"
import { FaSignOutAlt } from 'react-icons/fa'

export default function Navbar(props) {
    const header = localStorage.getItem('todo-token')
    const [user, setuser] = useState('')
    const navigate = useNavigate();
    const fetchuser = async () => {
        const data = await fetch(`/fetchuser`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "auth-token": header
            }
        })
        const json = await data.json()
        const username = json.user.username
        setuser(username)
    }
    useEffect(() => {
        if(header){
            fetchuser()
        }
        // eslint-disable-next-line
    }, [header])
    const handleclick = () => {
        props.setprogress(20)
        localStorage.removeItem('todo-token')
        navigate('/')
        props.showAlert("Signed Out!","warning")
        props.setprogress(100)
    }
    return (
        <>
        {<nav className="navbar navbar-secondary bg-dark sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand text-center" to="/">
                    <img src={todoicon} height="40px" width="40px" alt='icon' />
                    <span> TODO List </span>
                </Link>
                {header ? <button className="btn btn-outline-light btn-sm" onClick={handleclick}>{user} <FaSignOutAlt/></button> : ''}
            </div>
        </nav>}
        </>
    )
}

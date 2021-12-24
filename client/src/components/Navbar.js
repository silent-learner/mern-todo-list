import React from 'react'
import todoicon from './todoicon.png'
import {Link , useNavigate} from "react-router-dom"
import { FaSignOutAlt } from 'react-icons/fa'

export default function Navbar(props) {
    const header = localStorage.getItem('todo-token')
    const navigate = useNavigate();
    const handleclick = () => {
        props.setprogress(20)
        localStorage.removeItem('todo-token')
        navigate('/')
        props.setprogress(100)
    }
    return (
        <nav className="navbar navbar-secondary bg-dark sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand text-center" to="/">
                    <img src={todoicon} height="40px" width="40px" alt='icon' />
                    <span> TODO List </span>
                </Link>
                {header ? <button className="btn btn-outline-light btn-sm" onClick={handleclick}><FaSignOutAlt/></button> : ''}
            </div>
        </nav>
    )
}

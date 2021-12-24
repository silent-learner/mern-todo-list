import React, { useState } from 'react'
import { FaTrashAlt, FaRecycle, FaCheck, FaBan } from "react-icons/fa";
import Moment from 'react-moment';

export default function Item(props) {
    const [isEditing, setisEditing] = useState(false)
    const [input, setinput] = useState(props.name)
    const [title, settitle] = useState(props.name)
    const handleOnsubmit = (e) => {
        e.preventDefault()
        update(props.id)
    }
    const update = async (id) => {
        let item = input
        if (item.trim() === '') {
            setisEditing(false)
            return
        }
        try {
            let item1 = item.charAt(0).toUpperCase() + item.slice(1)
            const postdata = async () => {
                const data = await fetch(`http://192.168.43.167:8080/post/${id}`, {
                    method: "POST",
                    body: JSON.stringify({
                        name: item1.trim()
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "auth-token" : props.header                    
                    }
                })
                const datajson = await data.json()
                if (datajson.success) {
                    props.showAlert("Item Updated!!","success")
                    console.log(datajson);
                    settitle(item1.trim())
                }else{
                        props.showAlert(datajson.message,"danger")
                }
                setisEditing(false)
            }
            postdata()
        } catch (error) {
            console.log(error);
        }

    }
    const handleOnchange = (e) => {
        setinput(e.target.value)
    }
    return (
        <div className="card m-1 shadow-sm">
            {!isEditing ?
                <div className="card-body">
                    <h5 className="card-title" style={{"fontFamily" : "'Baloo Bhaijaan 2', cursive"}}>{title}</h5>
                    <div className="d-flex justify-content-between align-items-end">
                        <p className="text-dark mb-0" style={{"fontSize" : "0.7rem" }}>
                        <div className="text-muted">Created : <Moment fromNow>{new Date(props.date)}</Moment></div>
                            <div className="text-muted">Last Updated : <Moment fromNow>{new Date(props.updatedAt)}</Moment></div>
                        </p>
                        <div className='d-flex align-items-end'>
                            <button className="btn btn-outline-danger btn-sm float-end mx-1" onClick={() => props.handeler(props.id)}><FaTrashAlt /></button>
                            <button className="btn btn-outline-info btn-sm float-end mx-1" onClick={() => { setisEditing(true) }}><FaRecycle /></button>
                        </div>
                    </div>
                </div>
                :
                <div className="card-body">
                    <form onSubmit={handleOnsubmit} autoComplete='off'>
                        <h5><input type="text" className="form-control" id="input" value={input} onChange={handleOnchange} aria-describedby="input" autoFocus /></h5>
                        <p className="card-text d-flex align-items-stretch justify-content-end">
                            <button className="btn btn-outline-danger btn-sm float-end mx-1" style={{ "display": "flex", "alignItems": "center", "justifyContent": "center" }} onClick={() => { setisEditing(false); setinput(title) }}><FaBan /></button>
                            <button type="submit" className="btn btn-outline-success btn-sm float-end mx-1"><FaCheck /></button>
                        </p>
                    </form>
                </div>
            }
        </div>
    )
}

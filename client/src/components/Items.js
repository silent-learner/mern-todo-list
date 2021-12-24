import React, { useState, useEffect } from 'react'
import Item from "./Item.js"
import {useNavigate} from 'react-router-dom'
import '../App.css'

export default function Items(props) {
    const navigate = useNavigate()
    const header = localStorage.getItem('todo-token')
    const [toggle, settoggle] = useState(false)
    const [item, setitem] = useState("")
    const [items, setitems] = useState([])
    const onchangehandle = (e) => {
        setitem(e.target.value)
    }
    useEffect(() => {
        if (!props.header) {
            navigate('/')
        }
        else{
            const fetchdata = async () => {
                const data = await fetch("http://192.168.43.167:8080/get", {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "auth-token" : header
    
                    }
                })
                const json = await data.json()
                // console.log(json);
                setitems(json.list)
            }
            fetchdata()
        }

        // eslint-disable-next-line
    }, [])

    const onclickhandle = async (e) => {
        e.preventDefault();
        let listitem = item.trim()
        if (listitem === '') {
            settoggle(true)
            setTimeout(() => {
                settoggle(false);
            }, 1500)
        }
        else {
            try {
                settoggle(false);
                setitem('');
                listitem = listitem.charAt(0).toUpperCase() + listitem.slice(1);
                const postdata = async () => {
                    const data = await fetch("http://192.168.43.167:8080/post", {
                        method: "POST",
                        body: JSON.stringify({
                            name: listitem.trim()
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            "auth-token" : header                        }
                    })
                    const datajson = await data.json()
                    console.log(datajson);
                    const fetchdata = async () => {
                        const data = await fetch(`http://192.168.43.167:8080/get`, {
                            method: "GET",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                                "auth-token" : header                            }
                        })
                        const json = await data.json()
                        setitems(json.list)
                    }
                    fetchdata()
                }
                postdata();
            } catch (error) {
                console.log(error.message);
            }
        }
    }
    
    const deleteEle = (id) => {
        const sure = window.confirm("Are you sure to delete this item ? ");
        if (sure) {
            try {
                setitem('');
                const postdata = async () => {
                    const data = await fetch(`http://192.168.43.167:8080/delete/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            "auth-token" : header                        }
                    })
                    const datajson = await data.json()
                    console.log(datajson);
                    const fetchdata = async () => {
                        const data = await fetch(`http://192.168.43.167:8080/get`, {
                            method: "GET",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                                "auth-token" : header                            }
                        })
                        const json = await data.json()
                        setitems(json.list)
                    }
                    fetchdata()
                }
                postdata();
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <div className='item-bg container border p-2 mt-3 shadow-lg' style={{"maxWidth" : "500px"}}>
            {
                toggle && <div id='alert' className="alert alert-danger fade show" role="alert">
                    <strong>Heyy!! </strong>Enter Something.
                </div>
            }
            <div className='container-fluid p-0 my-3'>
                <form className="row p-2" onSubmit={onclickhandle} autoComplete='off'>
                    <div className="col-sm-8 p-1 my-1">
                        <input type="text" className="form-control" id="item" placeholder="Item" onChange={onchangehandle} value={item} />
                    </div>
                    <div className="d-grid gap-2 col-sm-4 p-1 my-1">
                        <button type="submit" className="btn btn-outline-success ">Add Item</button>
                    </div>
                </form>
            </div>
            <div className="container-fluid p-0 mb-2">
                    {
                        items.map((item) => {
                            return <Item key={item._id} header={header} name={item.name} date={item.createdAt} id={item._id} updatedAt={item.updatedAt} handeler={deleteEle} />
                        })
                    }
            </div>
        </div>
    )
}

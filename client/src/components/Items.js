import React, { useState, useEffect } from 'react'
import Item from "./Item.js"
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function Items(props) {
    const navigate = useNavigate()
    const header = localStorage.getItem('todo-token')
    const [item, setitem] = useState("")
    const [items, setitems] = useState([])
    const onchangehandle = (e) => {
        setitem(e.target.value)
    }
    useEffect(() => {
        if (!props.header) {
            navigate('/')
        }
        else {
            const fetchdata = async () => {
                const data = await fetch(`/get`, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "auth-token": header

                    }
                })
                const json = await data.json()
                if (json.success) {
                    setitems(json.list)
                }
                else {
                    props.showAlert(json.message, "danger")
                }
            }
            fetchdata()
        }

        // eslint-disable-next-line
    }, [])

    const onclickhandle = async (e) => {
        e.preventDefault();
        let listitem = item.trim()
        if (listitem === '') {
            props.showAlert('Enter Something', 'danger')
        }
        else {
            try {
                setitem('');
                listitem = listitem.charAt(0).toUpperCase() + listitem.slice(1);
                const postdata = async () => {
                    const data = await fetch(`/post`, {
                        method: "POST",
                        body: JSON.stringify({
                            name: listitem.trim()
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            "auth-token": header
                        }
                    })
                    const datajson = await data.json()
                    if (datajson.success) {
                        props.showAlert("Item added !!", "success")
                        const fetchdata = async () => {
                            const data = await fetch(`/get`, {
                                method: "GET",
                                headers: {
                                    "Content-type": "application/json; charset=UTF-8",
                                    "auth-token": header
                                }
                            })
                            const json = await data.json()
                            if (json.success) {
                                setitems(json.list)
                            } else {
                                props.showAlert(json.message, "danger")
                            }
                        }
                        fetchdata()
                    } else {
                        props.showAlert(datajson.message, "danger")
                    }
                }
                postdata();
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    const deleteEle = (id) => {
        if (1) {
            try {
                setitem('');
                const postdata = async () => {
                    const data = await fetch(`/delete/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            "auth-token": header
                        }
                    })
                    const datajson = await data.json()
                    if (datajson.success) {
                        props.showAlert("Item deleted!!", "success")
                        const fetchdata = async () => {
                            const data = await fetch(`/get`, {
                                method: "GET",
                                headers: {
                                    "Content-type": "application/json; charset=UTF-8",
                                    "auth-token": header
                                }
                            })
                            const json = await data.json()
                            setitems(json.list)
                        }
                        fetchdata()
                    } else {
                        props.showAlert(datajson.message, "danger")
                    }
                }
                postdata();
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <div className='container border p-2 mt-4 mb-3  bg-white d-flex flex-column' style={{ "maxWidth": "500px", "fontFamily": "'Baloo Bhaijaan 2', cursive" }}>
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
            {!items.length ? <p className='text-center text-secondary'>No items in list.</p> : ''}
            <TransitionGroup className="container-fluid p-0 mb-2">
                    {
                        items.map((item) => {
                            return (<CSSTransition
                                    in={true}
                                    key={item._id}
                                    timeout={500}
                                    classNames='fade'
                                    unmountOnExit
                                >
                                <Item key={item._id} header={header} name={item.name} date={item.createdAt} id={item._id} updatedAt={item.updatedAt} handeler={deleteEle} showAlert={props.showAlert} />
                            </CSSTransition>)
                        })
                    }
            </TransitionGroup>
        </div>
    )
}

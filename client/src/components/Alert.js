import React from 'react'

const Alert = (props) => {

    return (
        <div>
            {
                props.alert && <div style={{"position" : "absolute", zIndex : 3 , width : "100%"}} id='alert' className={`alert alert-${props.alert.type} fade show`} role="alert">
                    <strong>{props.alert.message}</strong>
                </div>
            }
        </div>
    )
}

export default Alert

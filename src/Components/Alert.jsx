import React from 'react'

function Alert(props) {
    const capatilize = (word) => {
        if (word === "error"){
            word = "error"
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  return (
    <div style={{height: "50px"}} >
   { props.alert && <div>
       <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
             <strong>{capatilize(props.alert.type)} </strong>: {props.alert.msg}
        </div>
    </div>}
    </div>
  )
}

export default Alert
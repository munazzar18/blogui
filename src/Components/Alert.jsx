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
    <div >
   { props.alert && <div>
      <div className={`alert alert-${props.alert.type} alert-dismissible fade show`}>
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{capatilize(props.alert.type)} {props.alert.msg}</span>
      </div>
      </div>
      </div>}
    </div>
  )
}

export default Alert



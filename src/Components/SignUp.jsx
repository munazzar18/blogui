import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";



const SignUp = (props) => {
const [token, setToken] = useLocalStorage('token', null);
const host = "https://blogui-server.vercel.app"

const [credential , setCredential] = useState({
    name:"",
    email:"",
    password:""

})
 
let navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    const responce = await fetch(`${host}/api/auth/createUser`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name: credential.name,
            email: credential.email,
            password: credential.password
        })
    }) 
    const json = await responce.json();
    if (responce.status === 200 ){
        //save the auth token and redirect
        const authToken = json.authToken;
        setToken(authToken)
        // localStorage.setItem('auth-token', json.authToken);
        navigate("/");
        props.showAlert("Account Created Successfully" , "success");
        
    } else {
        props.showAlert(json.message , "error");
    }
   }

const onChange = (e) => {
    setCredential({...credential,[e.target.name] : e.target.value})
}



  return (
    <div>
        <form onSubmit={handleSubmit}>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up Now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-4xl bg-base-100">
            <div className="card-body">
            <div className="form-control">
                <label className="label">
                  <span className="label-name">Name</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                  onChange={onChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-email">Email</span>
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  onChange={onChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-password">Password</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  onChange={onChange}
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
}


export default SignUp;

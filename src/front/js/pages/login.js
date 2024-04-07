import React, {useState} from "react";


export const Login = () => {


    const [user, setUser] = useState()
    return <>

       
        <div className="container">
        <h1>Login Form</h1>
        <form>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input 
                type="email" className="form-control"
                
                onChange={(evt) => setUser({... user, email: evt.target.value})}
                
                />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input 
                type="password" className="form-control"
                
                onChange={(evt) => setUser({... user, password: evt.target.value})}
                />
            </div>
           
            <button onClick={()=> console.log(user)} className="btn btn-primary">Submit</button>
        </form>
     </div>
    </>


}
import { useState } from "react";
import authService from '../services/auth.service.js';
import { useNavigate } from "react-router-dom";

export function SignUpPage(){

    const [body, setBody] = useState({username: "", password: "", campus: "", course: ""});
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate();
    

    const handleInputChange = (e) => {
        const {value, name} = e.target;
        setBody((prevBody) => ({...prevBody, [name] : value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authService.signup(body)
        .then((response) => {
            navigate("/login");
        })
        .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        })
    }

    return(
        <div className="HomePage">
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit}  className="form-card p-5 d-flex justify-content-between">
            <div>
                <h1 className="text-green fs-1 fw-bold">Sign Up</h1>
                <div className="d-flex flex-column form-container gap-3">
                <label  htmlFor="">Username</label>
                <input onChange={handleInputChange} name="username" className="form-control" type="text" />
                <label htmlFor="">Password</label>
                <input onChange={handleInputChange} name="password" className="form-control" type="text" />
                <label htmlFor="">Campus</label>
                <input onChange={handleInputChange} name="campus" className="form-control" type="text" />
                <label htmlFor="">Course</label>
                <input onChange={handleInputChange} name="course" className="form-control"  type="text" />
                </div>
                </div>
                <div className="d-flex flex-column justify-content-between">
                <div>
                    <h3 className="fw-bold">Hello!!</h3>
                    <h4 className="text-muted">Welcome to IronProfile!</h4>
                </div>
                <div>
                    <p className="text-muted" style={{width: "250px"}}>If you signup, you agreem with all our terms and conditions where we can do whatever we want with the data!</p>
                    <button className="btn-white" type="submit">Create the Account</button>
                </div>
                </div>
            </form>
        </div>
   </div>
    );
}
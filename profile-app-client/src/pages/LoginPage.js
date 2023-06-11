import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { AuthContext } from "../context/auth.context";

export function LoginPage(){

    const [body, setBody] = useState({username: "", password: ""});
    const {storeToken, authenticateUser} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {value, name} = e.target;
        setBody((prevBody) => ({...prevBody, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authService.login(body)
        .then((response) => {
            storeToken(response.data.authToken)
            authenticateUser();
            navigate("/")
        })
        .catch((error) => {
            const errorDescription = error.response.data.errorMessage;
            setErrorMessage(errorDescription);
        })
    }

    return(
<div className="HomePage">
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit}  className="form-card p-5 d-flex justify-content-between">
            <div>
                <h1 className="text-green fs-1 fw-bold">Log In</h1>
                <div className="d-flex flex-column form-container gap-3 py-5">
                <label  htmlFor="">Username</label>
                <input onChange={handleInputChange} name="username" className="form-control" type="text" />
                <label htmlFor="">Password</label>
                <input onChange={handleInputChange} name="password" className="form-control" type="password" />
                <div>
                    <p className="text-muted">You can sign up <Link to="/signup" className="text-muted">here</Link>  </p>
                </div>
                </div>
                </div>
                <div className="d-flex flex-column justify-content-between">
                <div>
                    <h3 className="fw-bold">Hello!!</h3>
                    <h4 className="text-muted" style={{width: "250px"}}>Awesome to have at IronProfile again!</h4>
                </div>
                <div>
                    <p className="text-muted" style={{width: "250px"}}>If you signup, you agreem with all our terms and conditions where we can do whatever we want with the data!</p>
                    <button className="btn-white" type="submit">Log In</button>
                </div>
                </div>
            </form>
        </div>
   </div>
    );
}
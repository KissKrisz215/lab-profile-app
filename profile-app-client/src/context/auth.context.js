import axios from "axios";
import React, { useState, useContext, useEffect, Children} from "react";
import authService from "../services/auth.service";
const API_URL = "http://localhost:5005";

const AuthContext = React.createContext();

function AuthProviderWrapper(props){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        authenticateUser();
    }, []);

    const storeToken = (token) =>{
        localStorage.setItem('authToken', token);
    }

    const authenticateUser = () => {
        const token = localStorage.getItem("authToken");
        if(token){
            authService.verify()
            .then((response) => {
                const data = response.data;
                setUser(data);
                setIsLoading(false);
                setIsLoggedIn(true);
            })
            .catch((error) => {
                setIsLoading(false);
                setIsLoggedIn(false);
                setUser(null)
            })
        }else{
            setIsLoading(false);
            setIsLoggedIn(false);
            setUser(null)
        }
    }

    const removeToken = () => {
        localStorage.removeItem("authToken");
    }

    const logOutUser = () => {
        removeToken();
        authenticateUser();
    }

    return(
        <AuthContext.Provider value={{storeToken, authenticateUser, removeToken, logOutUser, isLoggedIn, user}}>
            {props.children}
        </AuthContext.Provider>
    )

}

export { AuthProviderWrapper, AuthContext}
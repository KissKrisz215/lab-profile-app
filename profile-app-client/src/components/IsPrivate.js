import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

export function IsPrivate({children}){

    const {isLoggedIn, isLoading, authenticateUser} = useContext(AuthContext);


    if(isLoading){
        return <p>Loading...</p>
    }


    if(!isLoggedIn){
        console.log("run1")
        return <Navigate to="/login" />
    }else{
        return children;
    }
}
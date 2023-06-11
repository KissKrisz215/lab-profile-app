import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
import { upload } from "@testing-library/user-event/dist/upload";


export function ProfilePage(){


    const {user, logOutUser} = useContext(AuthContext);
    const [userData, setUserData] = useState(null)
    const [isEdit, setIsEdit] = useState(false);
    console.log("UserData:",userData)

    const handleEditToggle = () => {
        setIsEdit((prevVal) => !prevVal)
    }

    const handleInputChange = (e) => {
        const {value, name} = e.target;
        setUserData((prevBody) => ({...prevBody, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isEdit === false){
            authService.editUser(userData)
            .then((response) => console.log(response.data))
            .catch((err) => console.log(err));
        }
    }

    const handleFileUpload = (e) => {
        
        const uploadData = new FormData();

        uploadData.append("imageUrl", e.target.files[0])
        console.log(uploadData);
        authService.uploadPhoto(uploadData)
        .then((response) => {
        authService.getCurrentUser()
        .then((response) => setUserData(response.data.user))
        })
        .catch((err) => console.log("Error while uploading file", err));

    }


    useEffect(() => {
        authService.getCurrentUser()
        .then((response) => setUserData(response.data.user));
    }, []);

    return(
        <div className="HomePage">
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className="form-card p-5 d-flex justify-content-between">
            <div>
                <h1 className="text-green fs-1 fw-bold">Profile</h1>
                <div>
                <p className="text-muted fs-5 m-0 p-0">Username</p>
                {isEdit ? <input onChange={handleInputChange} className="form-control" name="username" value={userData.username} /> : userData && <p className="fs-5 fw-bold">{userData.username}</p>}
                </div>
                <div>
                <p className="text-muted fs-5 m-0 p-0">Campus</p>

                {isEdit ? <input onChange={handleInputChange} className="form-control" name="campus" value={userData.campus} /> : userData && <p className="fs-5 fw-bold">{userData.campus}</p> }
                </div>
                <div>
                <p className="text-muted fs-5 m-0 p-0">Course</p>
                {isEdit ? <input onChange={handleInputChange} className="form-control" name="course" value={userData.course} /> : userData && <p className="fs-5 fw-bold">{userData.course}</p> }
                </div>
                <div className="py-5 d-flex justify-content-center d-flex flex-column" style={{width: "300px"}}>
                 {isEdit ? <button onClick={handleEditToggle} className="btn btn-transparent text-primary fs-5 fw-bold">Save Changes</button> : <button onClick={handleEditToggle} className="btn btn-transparent text-primary fs-5 fw-bold">Edit</button> }
                <button onClick={logOutUser} className="btn btn-transparent fs-5 fw-bold" style={{color: "#D0021B"}}>Log Out</button>
                </div>
                </div>
                <div className="d-flex flex-column jusify-content-between">
                <div className="h-75 d-flex flex-column gap-5 align-items-center">
                {userData && <img src={userData.image} style={{width: "200px",height:"200px", borderRadius: "50%"}} alt="" />}
                <label className="btn-upload" htmlFor="fileUpload">Edit Photo</label>
                <input onChange={handleFileUpload} className="d-none" type="file" id="fileUpload" />
                </div>
                <div>
                <p className=" text-muted w-75">The user is able to upload a new profile photo.</p>
                </div>
                </div>
            </form>
        </div>
   </div>
    );
}
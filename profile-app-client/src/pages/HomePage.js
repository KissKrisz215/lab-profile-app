import { Link } from "react-router-dom";

export function HomePage(){
    return(
       <div className="HomePage">
            <div className="container min-vh-100 d-flex justify-content-center align-items-center">
                <div className="form-card p-5">
                    <h1 className="text-green fs-1 fw-bold">IronProfile</h1>
                    <p className="fs-3 text-muted w-50">Today we will create an app with authoritation, adding some cool styles!</p>
                    <div className="d-flex flex-column gap-3 mt-5">
                         <div>
                        <Link to="/signup"><button className="btn-green">Sign Up</button></Link>
                        </div>
                        <div>
                        <Link to="/login"><button className="btn-green">Log In</button></Link>
                        </div>
                        </div>
                </div>
            </div>
       </div>
    );
}
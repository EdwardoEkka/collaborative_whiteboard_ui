import React,{useState} from "react";
import SignUpPage from "./sign_up";
import "./styles/main_log.css";
import SignInPage from "./sign_in";

const MainLog = () => {
    const [show,setShow]=useState<boolean>(false);

    const Show=()=>{
        setShow(!show)
    }

  return (
    <div>
      <div className="row"> 
        <div className="col-lg-6 col-md-6 d-lg-block d-md-block d-none bg-primary d-flex align-items-center justify-content-center" style={{height:"100vh"}}> 
          1st div
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12 bg-secondary d-flex align-items-center justify-content-center"> 
        {show?<SignUpPage Show={Show} />:<SignInPage Show={Show} />}
        </div>
      </div>
    </div>
  );
};

export default MainLog;

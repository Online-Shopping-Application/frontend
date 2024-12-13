import React from "react"
import RegisterForm from "../../components/RegisterForm/RegisterForm"
import imageGirl from "../../assets/images/image-girl.png"
import "../LoginPage/Layout.css"


function RegisterPage() {
    return (
        <div className="app-container">
    
          <div className="image-section">
          <img src={ imageGirl } alt="image-girl" className="image" />
          </div>
    
          <div className="form-section">
            <RegisterForm />
          </div>
        </div>
      );
    }

export default RegisterPage
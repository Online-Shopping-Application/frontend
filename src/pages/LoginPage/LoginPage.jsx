import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import fashionGirlPreview from "../../assets/images/fashion-girl-preview.png"
import './Layout.css'

function LoginPage() {
  return (
    <div className="app-container">

      <div className="image-section">
        <img src={fashionGirlPreview} alt="fashion girl" className="image" />
      </div>
   
      <div className="form-section">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
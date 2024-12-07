import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import fashionGirlPreview from "../../assets/images/fashion-girl-preview.png"
import './Layout.css'
import useAuth from "../../hook/useAuth.hook";

function LoginPage() {
  const { login } = useAuth();

  const handleFormSubmit = async(formData) => {
    console.log("Captured Data in LoginPage:", formData);
    // Send the data to an API or perform further actions

    try{
      await login(formData.email,formData.password);

    }catch(error){
      const err = error;
      const { status, data } = err;
      console.log(status);
      console.log(data);

    }

  };
  
  return (
    <div className="app-container">

      <div className="image-section">
        <img src={fashionGirlPreview} alt="fashion girl" className="image" />
      </div>
   
      <div className="form-section">
        <LoginForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}

export default LoginPage;
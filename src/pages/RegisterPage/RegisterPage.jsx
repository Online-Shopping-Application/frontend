import React from "react"
import RegisterForm from "../../components/RegisterForm/RegisterForm"
import imageGirl from "../../assets/images/image-girl.png"
import "../LoginPage/Layout.css"
import useAuth from "../../hook/useAuth.hook"


function RegisterPage() {
    const { register } = useAuth();

    const handleFormSubmit = async(formData) => {
      console.log("Captured Data in RegisterPage:", formData);
      // Send the data to an API or perform further actions

      try{
        await register(formData.firstName,formData.secondName,formData.address,formData.email,formData.password,formData.role);

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
          <img src={ imageGirl } alt="image-girl" className="image" />
          </div>
    
          <div className="form-section">
            <RegisterForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      );
    }

export default RegisterPage
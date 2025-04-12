import React, { useState } from "react";
import Logo from "../../assets/icons/Logo.svg";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthForm from "./Forms/AuthForms";

const AuthRight = () => {
  const [Login, isloggingIn] = useState(false)
  const switchPage = () => {
    isloggingIn(!Login);
  }
  return (
    <div className="flex flex-col snap-x justify-center h-screen scroll-p-0 scrollbar overflow-y-scroll p-6 gap-6 flex-1">
      <div className="flex snap-start gap-3 items-center">
        <img src={Logo} alt="" className="w-9 h-9" />
        <h1 className="text-white text-[32px]">Socialoa</h1>
      </div>
      {/* <AuthForm/> */}
      <AuthForm isLogin={Login} isLoggingIn={()=>switchPage()}/>
    </div>
  );
};

export default AuthRight;
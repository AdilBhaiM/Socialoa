import { useEffect, useState } from "react";
import AuthPage from "./pages/AuthPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import { CheckAuth } from "./redux/actions/AuthActions";
import VerifyEmail from "./components/Auth/Forms/VerifyEmail";
import ResetPassword from "./components/Auth/Forms/ResetPassword";
import AuthForm from "./components/Auth/Forms/AuthForms";
import ScheduledPosts from "./components/Dashboard/ScheduledPosts";
import HomePage from "./components/Dashboard/HomePage";
import Analytics from "./components/Dashboard/Analytics";
import Error from "./pages/404Error";
import Settings from "./components/Dashboard/Api_Key";

function App() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(CheckAuth());
    console.log(authUser);
  }, [CheckAuth]);

  return (
    <>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={authUser ? <Navigate to="/dashboard" /> : <Navigate to="/authentication" />} />


        {/* Authentication Routes */}
        <Route path="/authentication" element={!authUser ? <AuthPage /> : <Navigate to="/dashboard" />}>
          <Route index element={<AuthForm />} />
          <Route path="verification" element={<VerifyEmail />} />
          <Route path="reset-pwd" element={<ResetPassword />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/" element={authUser ? <Dashboard /> : <Navigate to="/authentication" />}>
          <Route path="dashboard" element={authUser ? <HomePage /> : <Navigate to="/authentication"/>} />
          <Route path="schedule_post" element={authUser ? <ScheduledPosts /> : <Navigate to="/authentication" />} />
          <Route path="analytics" element={authUser ? <Analytics /> : <Navigate to="/authentication" />} />
          <Route path="Api_Key" element={authUser ? <Settings /> : <Navigate to="/authentication" />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<Error/>} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

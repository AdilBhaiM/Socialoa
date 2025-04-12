import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login, Signup } from "../../../redux/actions/AuthActions";
import toast from "react-hot-toast";

const AuthForm = ({ isLogin, isLoggingIn }) => {
  const dispatch = useDispatch();
  const hideInput = useRef();
  const fname = useRef();
  const lname = useRef();

  // const {authUser} = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // console.log(authUser);

  const validateInputs = () => {
    if (isLogin) {
      if (formData.email && formData.password) {
        return true;
      } else {
        toast.error("Please fill out all fields");
        return false;
      }
    } else {
      if (
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.password &&
        formData.confirmPassword
      ) {
        if (formData.password == formData.confirmPassword) {
          if (formData.password.length > 5) {
            return true;
          } else {
            toast.error("Password must be at least 6 digits long");
            return false;
          }
        } else {
          toast.error("Password doesn't match");
          return false;
        }
      } else {
        toast.error("Please fill out all fields");
        return false;
      }
    }
  };

  const submitHandle = (e) => {
    // debugger;
    e.preventDefault();
    const isValid = validateInputs();
    if (!isValid) return;
    AuthenticateUser();
  };

  const AuthenticateUser = () => {
    if (isLogin) {
      dispatch(
        Login({
          email: formData.email,
          password: formData.password,
        })
      );
    } else {
      dispatch(
        Signup({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        })
      );
    }
  };

  useEffect(() => {
    if (isLogin) {
      hideInput.current.style.display = "none";
      fname.current.style.display = "none";
      lname.current.style.display = "none";
    } else {
      hideInput.current.style.display = "flex";
      fname.current.style.display = "flex";
      lname.current.style.display = "flex";
    }
  }, [isLogin]);

  return (
    <div className="flex flex-col flex-1 gap-5 w-[100%]">
      <div className="flex gap-4 flex-col">
        <h1 className="text-4xl text-white">
          {isLogin ? "Welcome back," : "Welcome to Socialoa!"}
        </h1>
        <h1 className="text-2xl font-thin text-white">
          {isLogin
            ? "Lets get back to it."
            : "Begin Your Transformative Social Media Adeventure with Socialoa!"}
        </h1>
      </div>

      {/* Form ---------------------------------------------------------- */}

      <form onSubmit={submitHandle} className="flex flex-1 flex-col gap-7">
        {/* First Name ---------------------------------------------------------- */}
        <div ref={fname} className="flex flex-col max-w-full gap-3">
          <div className="h-12 relative flex rounded-xl">
            <input
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              name="firstName"
              className="peer w-full text-white text-[14px] outline-none px-4 rounded-xl bg-black valid:bg-transparent valid:ring-1 valid:ring-[#5ef882] focus:bg-transparent focus:ring-2 focus:ring-[#ffffff]"
              id="first"
              type="text"
            />
            <label
              className="absolute top-1/2 translate-y-[-50%] text-[#a9a9a9] left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#fff] peer-valid:top-[-4px] peer-focus:bg-gray-900 peer-valid:bg-gray-900 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#5ef882] duration-150"
              htmlFor="first"
            >
              First Name
            </label>
          </div>
        </div>

        {/* Last Name ---------------------------------------------------------- */}
        <div ref={lname} className="flex flex-col max-w-full gap-3">
          <div className="h-12 relative flex rounded-xl">
            <input
              value={formData.lastName}
              name="lastName"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="peer w-full text-white text-[14px] outline-none px-4 rounded-xl bg-black valid:bg-transparent valid:ring-1 valid:ring-[#5ef882] focus:bg-transparent focus:ring-2 focus:ring-[#ffffff]"
              id="last"
              type="text"
            />
            <label
              className="absolute top-1/2 translate-y-[-50%] text-[#a9a9a9] left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#fff] peer-valid:top-[-4px] peer-focus:bg-gray-900 peer-valid:bg-gray-900 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#5ef882] duration-150"
              htmlFor="last"
            >
              Last Name
            </label>
          </div>
        </div>

        {/* Email ---------------------------------------------------------- */}
        <div className="flex flex-col w-full gap-3">
          <div className="h-12 relative flex rounded-xl">
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              name="email"
              className="peer w-full text-white text-[14px] outline-none px-4 rounded-xl bg-black valid:bg-transparent valid:ring-1 valid:ring-[#5ef882] invalid:bg-transparent invalid:ring-1 invalid:ring-red-600 focus:bg-transparent focus:ring-2 focus:ring-[#ffffff]"
              id="email"
              type="email"
            />
            <label
              className="absolute top-1/2 translate-y-[-50%] text-[#a9a9a9] left-4 px-2 peer-focus:top-[-2px] peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#fff] peer-valid:top-[-2px] peer-focus:bg-gray-900 peer-valid:bg-gray-900 peer-valid:left-3 peer-valid:text-sm peer-invalid:top-[-2px] peer-valid:text-[#5ef882] duration-150 peer-invalid:bg-gray-900 peer-invalid:left-3 peer-invalid:text-sm peer-invalid:text-red-600 invalid:border-red-600"
              htmlFor="email"
            >
              Email
            </label>
          </div>
        </div>

        {/* Password ---------------------------------------------------------- */}
        <div className="flex flex-col w-full gap-3">
          <div className="h-12 relative flex rounded-xl">
            <input
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              name="password"
              className="peer w-full text-white text-[14px] outline-none px-4 rounded-xl bg-black valid:bg-transparent valid:ring-1 valid:ring-[#5ef882] focus:bg-transparent focus:ring-2 focus:ring-[#ffffff]"
              id="new"
              type="password"
            />
            <label
              className="absolute top-1/2 translate-y-[-50%] text-[#a9a9a9] left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#fff] peer-valid:top-[-4px] peer-focus:bg-gray-900 peer-valid:bg-gray-900 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#5ef882] duration-150"
              htmlFor="new"
            >
              Password
            </label>
          </div>
        </div>

        {/* Confirm Password ---------------------------------------------------------- */}
        <div
          ref={hideInput}
          className="flex duration-200 flex-col w-full gap-3"
        >
          <div className="h-12 relative flex rounded-xl">
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="peer w-full text-white text-[14px] outline-none px-4 rounded-xl bg-black valid:bg-transparent valid:ring-1 valid:ring-[#5ef882] focus:bg-transparent invalid:border-red-600 focus:ring-2 focus:ring-[#ffffff]"
              id="confirm"
              type="Password"
            />

            <label
              className="absolute top-1/2 translate-y-[-50%] text-[#a9a9a9] left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#fff] peer-valid:top-[-4px] peer-focus:bg-gray-900 peer-valid:bg-gray-900 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#5ef882] invalid:text-red-500 duration-150"
              htmlFor="confirm"
            >
              Confirm Password
            </label>
          </div>
        </div>

        {/* Submit Button ---------------------------------------------------------- */}
        <button
          type="submit"
          className="w-full h-12 bg-[#ffffff] rounded-xl text-gray-900 text-[16px] font-light"
        >
          {isLogin ? "Log In" : "Sign Up"}
        </button>
        {/* Already have an account? ---------------------------------------------------------- */}
        <div className="text-white flex items-end justify-center gap-2 flex-1 text-center text-[14px]">
          {isLogin ? "Don't have an Account," : "Already have an Account!"}?
          <h1 onClick={isLoggingIn} className="cursor-pointer text-[#2b55ff]">
            {isLogin ? "Sign Up" : "Log In"}
          </h1>
        </div>
        
      </form>
    </div>
  );
};

export default AuthForm;

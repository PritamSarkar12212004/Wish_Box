import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axios/AxiosConfig";
function Login() {
  const navigate = useNavigate();
  document.title = "Login";
  const { register, handleSubmit, reset } = useForm();
  const LoginFormController = (data) => {
    axiosInstance
      .post("/register/user/login", data)
      .then((res) => resController(res))
      .catch((err) => console.log(err));
  };
  const resController = (res) => {
    if (
      res.data === "Password is incorrect" ||
      res.data === "Phone number is incorrect"
    ) {
      alert(res.data);
    } else {
      localStorage.setItem("AuthUSerData", JSON.stringify(res.data));
      reset();
      navigate("/");
    }
  };
  return (
    <div className="w-full h-[91.8vh] flex  ">
      <div className="w-1/2  h-full flex justify-center items-center">
        <form
          action=""
          className="w-[70%] h-[80%] bg-zinc-200 rounded-xl flex flex-col justify-center items-center gap-5"
          onSubmit={handleSubmit(LoginFormController)}
        >
          <h1 className="text-4xl font-bold text-blue-600 mb-10">Login</h1>
          <span className="w-1/2 flex flex-col justify-center items-start">
            <label htmlFor="phoneNumber" className="text-sm opacity-80">
              Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              placeholder="Number"
              className="w-full px-2 py-2 rounded-md border-[1px] outline-none border-blue-500"
              {...register("phoneNumber")}
            />
          </span>
          <span className="w-1/2 flex flex-col justify-center items-start">
            <label htmlFor="Password" className="text-sm opacity-80">
              Password
            </label>
            <input
              type="text"
              id="Password"
              placeholder="Password"
              className="w-full px-2 py-2 rounded-md border-[1px] outline-none border-blue-500"
              {...register("password")}
            />
          </span>
          <span className="w-1/2 text-sm opacity-75">
            If you not register then go{" "}
            <Link className="text-blue-600    underline" to={"/auth/register"}>
              Register
            </Link>
          </span>
          <button className="px-10 text-white rounded-xl hover:bg-blue-600 duration-300 hover:scale-105 py-2 bg-blue-500">
            Login
          </button>
        </form>
      </div>
      <div className="w-1/2 h-full">
        <img className="h-full w-full" src="/assets/Auth/login.jpg" alt="" />
      </div>
    </div>
  );
}

export default Login;

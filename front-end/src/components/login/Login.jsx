import google from "../../assets/google.png";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className="relative h-full grid grid-cols-1 content-center w-[100%]">
      <div className="absolute right-0 text-sm font-thin flex gap-4 mt-2 items-center">
        <p>Dont have an account</p>
        <NavLink
          className="border px-4 py-1 rounded-full hover:bg-blue-400 hover:text-white"
          to="/auth/sign-up"
        >
          Sign up
        </NavLink>
      </div>
      <form className="w-[100%] mx-auto mt-[-50px]">
        <div className="my-4">
          <h2 className="font-bold text-xl">Welcome to Group Dynamic</h2>
          <p className="text-sm font-thin">Connect Your Account</p>
        </div>
       
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        

        <button
          type="submit"
          className="text-white bg-blue-600 px-8 py-2 rounded-2xl shadow-lg hover:bg-blue-500"
        >
          Submit
        </button>
      </form>
      <div className="absolute bottom-24 font-thin text-sm flex items-center gap-4">
        Connect account with :
        <span className="w-7 border shadow-md p-1 rounded-md">
          <img className="w-5" src={google} alt="" />
        </span>
      </div>
    </div>
  );
};

export default Login;

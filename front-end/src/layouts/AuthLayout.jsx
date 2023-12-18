import { Outlet } from "react-router-dom";
import Auth from '../assets/authentication.jpg';
const AuthLayout = () => {
  return (
    <div className="bg-[#F3F8FF] h-screen flex items-center">
      <div className="m-auto w-[70%] h-[500px] bg-white shadow-lg flex">
        <div className="shadow-md h-full flex justify-center items-center w-1/2 ">
          <img src={Auth} alt=""/>
        </div>
        <div className="w-1/2 h-full p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout
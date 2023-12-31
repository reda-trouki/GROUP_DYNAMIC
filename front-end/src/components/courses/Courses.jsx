import { faAngleDown, faAngleUp, faGroupArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import {useState} from 'react';
import profile from '../../assets/profile.png';
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Courses.css";
import { useDispatch } from "react-redux";

const Courses = ({setAccessToken}) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout =() =>{
    dispatch(setAccessToken(null));
    navigate('/auth/login');
  }
  return (
    <div className="relative w-full">
      <nav className="flex justify-evenly items-center h-14 shadow-md w-full gap-[50%]">
        <div className="flex justify-center gap-2 items-center">
          <FontAwesomeIcon className="text-xl" icon={faGroupArrowsRotate} />
          <span className="font-bold">Group Dynamic</span>
        </div>
        <div
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100"
        >
          <div className="flex items-center gap-3">
            <img className="w-10" src={profile} alt="user" />
            <p className="font-medium">Reda Trouki</p>
          </div>
          <div>
            {!showMenu ? (
              <FontAwesomeIcon icon={faAngleDown} />
            ) : (
              <FontAwesomeIcon icon={faAngleUp} />
            )}
          </div>
        </div>
      </nav>
      <div
        className={`absolute bg-white right-24 w-48 border shadow-md z-999 transform  transition-all duration-300 delay-75 ${
          showMenu
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[-10px] "
        }`}
      >
        <ul className="flex flex-col w-full">
          <li className="border py-1 px-2 w-full hover:bg-gray-100 cursor-pointer transition duration-300">
            Profile
          </li>
          <li
            onClick={handleLogout}
            className="border py-1 px-2 w-full hover:bg-gray-100 cursor-pointer transition duration-300"
          >
            Log out
          </li>
        </ul>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Courses
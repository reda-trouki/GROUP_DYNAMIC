import { faAngleDown, faGroupArrowsRotate } from "@fortawesome/free-solid-svg-icons";

import profile from '../../assets/profile.png';
import { Outlet, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Courses.css";

const Courses = () => {
  return (
    <div>
      <nav className="flex justify-evenly items-center h-14 shadow-md w-full gap-[50%]">
        <div className="flex justify-center gap-2 items-center">
          <FontAwesomeIcon className="text-xl" icon={faGroupArrowsRotate} />
          <span className="font-bold">Group Dynamic</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100">
          <img className="w-10" src={profile} alt="user" />
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </nav>
        <Outlet/>
      </div>
  );
}

export default Courses
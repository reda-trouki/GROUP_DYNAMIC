import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGroupArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import { useState } from "react";

const NavBar = () =>{
  const [active, setActive] = useState("/");
    return (
      <div className="flex items-center h-14 justify-between w-full gap-[30%]">
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon className="text-xl" icon={faGroupArrowsRotate} />
          <span className="font-bold">Group Dynamic</span>
        </div>
        <div>
          <ul className="flex gap-5">
            <li>
              <a
                className={active == "/" ? "clicked" : ""}
                href="#"
                onClick={() => setActive("/")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                className={active == "course" ? "clicked" : ""}
                href="#Course"
                onClick={() => setActive("course")}
              >
                Our Course
              </a>
            </li>
            <li>
              <a
                className={active == "contact" ? "clicked" : ""}
                href="#contact"
                onClick={() => setActive("contact")}
              >
                Contact Us
              </a>
            </li>
            <li className="auth-button">Sign Up</li>
            <li className="auth-button">Log In</li>
          </ul>
        </div>
      </div>
    );
}

export default NavBar;
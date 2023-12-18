import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGroupArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () =>{
  const [active, setActive] = useState("hero");
  const headRef = useRef(null);
  useEffect(() => {
    let prevScrollPos = window.scrollY;
    // Handle scroll events
    const handleScroll = () => {
      const currScrollPos = window.scrollY;
      const currHeaderElement = headRef.current;

      if (!currHeaderElement) return;

      if (prevScrollPos > currScrollPos)
        currHeaderElement.style.transform = "translateY(0)";
      else currHeaderElement.style.transform = "translateY(-200px)";

      prevScrollPos = currScrollPos;
    };

    // Set up listeners for the scroll event
    window.addEventListener("scroll", handleScroll);

    // Remove listeners for the scroll event
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleClick = (str) =>{
    setActive(str);
    const id = str;
    console.log(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
    return (
      <div
        className="flex items-center justify-center top-0 w-full gap-[50%] p-2 fixed z-999 bg-white shadow-md transition transform duration-520"
        ref={headRef}
      >
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon className="text-xl" icon={faGroupArrowsRotate} />
          <span className="font-bold">Group Dynamic</span>
        </div>
        <div>
          <ul className="flex gap-5">
            <li>
              <a
                className={active == "hero" ? "clicked" : ""}
                href="#hr"
                onClick={() => handleClick("hero")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                className={active == "course" ? "clicked" : ""}
                href="#crs"
                onClick={() => handleClick("course")}
              >
                Our Course
              </a>
            </li>
            <li>
              <a
                className={active == "contact" ? "clicked" : ""}
                href="#cnt"
                onClick={() => handleClick("contact")}
              >
                Contact Us
              </a>
            </li>
            <li className="auth-button">
              <Link to="/auth/sign-up" smooth>
                Sign Up
              </Link>
            </li>
            <li className="auth-button">
              <Link to="/auth/login">
                Log In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
}

export default NavBar;
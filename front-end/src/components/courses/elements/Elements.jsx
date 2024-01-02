import { Outlet, NavLink, useLocation } from "react-router-dom";
import Message from "../../Message/Message";
import { useState } from "react";

const Sections = () => {
  const location = useLocation();

  // Access the data passed from the previous component
  const [message, setMessage] = useState(location.state?.message)
  return (
    <div className="m-auto w-[80%] mt-4 mb-10">
      {message && (
        <Message
          content={message}
          setUpdater={setMessage}
        />
      )}
      <div>
        <p className="font-semibold text-xl">My Learning : </p>
        <div className="my-2">
          <NavLink to="." end className="sections-btn">
            In Progress
          </NavLink>
          <NavLink to="completed" className="sections-btn">
            Completed
          </NavLink>
        </div>
        <div className="w-full mt-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Sections
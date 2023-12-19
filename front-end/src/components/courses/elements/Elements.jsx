import { Outlet, NavLink } from "react-router-dom";

const Sections = () => {
  return (
    <div className="m-auto w-[80%] mt-4 mb-10">
      <div>
        <p className="font-semibold text-xl">My Learning : </p>
        <div className="my-2">
          <NavLink to="." end className="sections-btn">
            In Progress h
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
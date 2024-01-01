import { useEffect, useState } from "react";
import Course from "../../course/Course";
import { useSelector } from "react-redux";
import IncompleteMessage from "./IncompletMessage";

const Completed = () => {
  const [courses, setCourses] = useState([]);
  const accessToken = useSelector((state) => state.accessToken);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/elements/completed", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Corrected the syntax here
      },
    })
      .then((resp) => resp.json())
      .then((data) => setCourses(data.elementsWithProgress))
      .catch((error) => {
        console.error("Error fetching completed elements:", error);
      });
  }, [accessToken]); // Added accessToken as a dependency to useEffect

  return (
    <div className="flex flex-col gap-6">
      {courses.length > 0 ? (
        courses.map((course) => (
          <div key={course._id}>
            <Course key={course._id} course={course} />
          </div>
        ))
      ) : (
        <IncompleteMessage />
      )}
    </div>
  );
};

export default Completed;
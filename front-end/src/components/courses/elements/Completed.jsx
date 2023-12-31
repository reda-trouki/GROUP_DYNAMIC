import { useEffect, useState } from "react";
import Course from "../../course/Course";
import { useSelector } from "react-redux";
const Completed = () => {
  const [courses, setCourses] = useState([]);
   const accessToken = useSelector((state) => state.accessToken);
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/elements/completed", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => setCourses(data))
      .catch((error) => {
        console.error("Error fetching completed elements:", error);
      });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {courses.map((course) => (
        <div key={course._id}><Course key={course.id} course={course} /></div>
      ))}
    </div>
  );
};

export default Completed;

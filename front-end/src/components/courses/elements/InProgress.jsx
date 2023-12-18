import { useEffect, useState } from "react";
import Course from "../../course/Course";

const InProgress = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/elements/inProgress")
      .then((resp) => resp.json())
      .then((data) => setCourses(data));
    console.log(courses);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default InProgress;

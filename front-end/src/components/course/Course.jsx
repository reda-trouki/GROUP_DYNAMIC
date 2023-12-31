import { Progress } from "@material-tailwind/react";
import Leadership from "../../assets/Leadership.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
const Course = ({course}) => {
    const image = `../../assets/${course.title}.png`;
    const [pointer, setPointer] = useState(course.topics.find((topic) => !topic.completed));
    const [completed, isCompleted] = useState(course.topics.filter(topic=> topic.completed));
    
  return (
    <NavLink to={`/courses/${course._id}`} >
      <div className="flex flex-col">
        <div className="text-xs font-semibold text-blue-800 text-right">
          <p>
            {completed.length} of {course.topics.length} completed
          </p>
        </div>
        <div className="w-full flex items-center p-4 border border-gray-200 shadow-md gap-4 cursor-pointer hover:shadow-xl hover:bg-[#F3F8FF] hover:scale-105 hover:transition hover:duration-500 ">
          <div className="w-20 rounded-md border p-1 shadow-md">
            <img src={`/src/assets/${course.title}.png`} alt="" />
          </div>
          <div className="w-[90%] flex items-center h-20 gap-3">
            <div className="w-[60%]">
              <h3>{course.title}</h3>
              <div className="w-[90%] flex items-center gap-2">
                <Progress value={course.progress} size="sm" />
                {course.progress}%
              </div>
            </div>
            <hr className="bg-gray-500 w-[1px] h-full" />
            {pointer != null ? (
              <div>
                <h3>Next Up</h3>
                <div className="flex gap-2">
                  <FontAwesomeIcon icon={faCirclePlay} />
                  <div>
                    <p className="font-medium text-sm underline text-blue-500">
                      {pointer.title}
                    </p>
                    <p className=" text-xs">section {pointer.number}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className=" m-auto w-[30%] text center">
                <p className="bordre bg-blue-500 text-white text-center py-2 font-semibold shadow-md">
                  Completed
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default Course
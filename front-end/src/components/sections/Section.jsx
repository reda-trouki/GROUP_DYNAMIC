import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./Section.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const Section = () => {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [show, setShow] = useState(false)
const topicsRef = useRef();
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/elements/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setCourse(data[0]);
      });
  }, [id]);
  const toggleTopics = (isOpen) => {
    topicsRef.current.classList.toggle("opened", isOpen);
    topicsRef.current.classList.toggle("closed", !isOpen);
    setShow(!isOpen);
  };

  const handleClose = () => {
    toggleTopics(false);
  };

  const handleOpen = () => {
    toggleTopics(true);
  };



  return (
    <div className="mt-0.5 flex h-full">
      <div>
        {show && (
          <FontAwesomeIcon
            className="cursor-pointer bg-gray-800 text-white font-bold text-xl px-4 py-2 rounded-sm mt-4"
            onClick={handleOpen}
            icon={faAngleRight}
          />
        )}
      </div>
      {course ? (
        <div
          ref={topicsRef}
          className="custom-scrollbar bg-white w-full md:w-1/2 lg:w-1/3 rounded-md p-4 shadow-lg h-full overflow-y-auto max-h-[500px]"
        >
          <h1 className="text-2xl font-semibold mb-4 flex items-center justify-between">
            {course.title}
            <FontAwesomeIcon
              className="cursor-pointer bg-gray-800 text-white font-bold text-xl px-4 py-2 rounded-sm"
              onClick={handleClose}
              icon={faAngleLeft}
            />
          </h1>
          <div className="flex-grow flex flex-col gap-4">
            {course.topics?.map((topic) => (
              <div
                className="w-full p-4 bg-gray-100 rounded-md shadow-md flex items-center gap-4"
                key={topic._id}
              >
                { topic.completed && <FontAwesomeIcon className="text-green-700 text-2xl" icon={faCircleCheck} />}
                {topic.title}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default Section;

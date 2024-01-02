import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./Section.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Content from "../Content/Content";
import Loading from "../Loading/Loading";

const Section = () => {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [show, setShow] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState()
  const accessToken = useSelector((state) => state.accessToken);
  const topicsRef = useRef();
  const getCourse = () => {
    useEffect(() => {
    fetch(`http://localhost:5000/api/v1/elements/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCourse(data);
        setSelectedTopic(data.topics[0])
      });
  }, [id]);
}
  getCourse();
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
        <div className="flex flex-grow w-full gap-4">
          <div
            ref={topicsRef}
            className="custom-scrollbar bg-white w-[36%]  rounded-md py-0.5 px-3 shadow-lg h-full overflow-y-auto max-h-[89vh]"
          >
            <h1 className="text-2xl font-semibold mb-4 flex items-center justify-between">
              {course.title}
              <FontAwesomeIcon
                className="cursor-pointer bg-gray-800 text-white font-bold text-xl px-4 py-2 rounded-sm"
                onClick={handleClose}
                icon={faAngleLeft}
              />
            </h1>
            <div className="flex-grow flex flex-col gap-4 ">
              {course.topics?.map((topic) => (
                <div
                  className={`${
                    selectedTopic.title == topic.title
                      ? `bg-blue-300 text-white`
                      : `bg-gray-100 `
                  } cursor-pointer w-full p-4 rounded-md shadow-md flex items-center gap-4 hover:shadow-lg `}
                  key={topic._id}
                  onClick={() => setSelectedTopic(topic)}
                >
                  {topic.completed && (
                    <FontAwesomeIcon
                      className="text-green-700 text-2xl"
                      icon={faCircleCheck}
                    />
                  )}
                  {topic.title}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <Content getCourse element={course} topic={selectedTopic} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Section;

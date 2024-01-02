
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { NavLink } from "react-router-dom";
import rehypeRaw from "rehype-raw";

import "./content.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faCheck, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";



const Content = ({ getCourse, element, topic }) => {
  const [fileContent, setFileContent] = useState("");
  const accessToken = useSelector((state) => state.accessToken);
  const handleCompleted = async () => {
    if (!accessToken) {
      // Handle the case where accessToken is not defined
      console.error("Access token is missing.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1//topics/completed",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            elementId: element.elementId,
            topicIndex: topic.num - 1,
          }),
        }
      );

      if (response.ok) {
        // Handle success
        console.log("Topic marked as completed successfully");
        getCourse();
      } else {
        // Handle error
        console.error("Error marking topic as completed:", response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    const loadMarkdownFile = async () => {
      try {
        // Dynamically import the file based on a variable
        const filePath = `../../lessons/${element.title}/${topic.title}.md`;
        const { default: content } = await import(filePath);

        // Set the content to the state
        setFileContent(content);
      } catch (error) {
        console.error("Error loading Markdown file:", error);
      }
    };

    // Call the dynamic import function
    loadMarkdownFile();
  }, [topic]);
  return (
    <div className="overflow-y-auto max-h-[500px] custom-scrollbar p-4">
      <div className="flex items-center gap-1">
        <NavLink
          to="/courses/elements"
          className="underline flex gap-2 items-center"
        >
          <FontAwesomeIcon icon={faHouse} />
          Home
        </NavLink>
        <FontAwesomeIcon icon={faAngleRight} />
        <p className="underline">{element.title}</p>
        <FontAwesomeIcon icon={faAngleRight} />

        <p className="underline">
          {topic.title.length > 20
            ? `${topic.title.slice(0, 35)}...`
            : topic.title}
        </p>
      </div>
      <ReactMarkdown
        className="markdown"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {fileContent}
      </ReactMarkdown>
      {!topic.completed ? (
        <div>
          <button
            onClick={handleCompleted}
            className="bg-blue-500 hover:bg-blue-400 p-2 rounded-md text-white my-4 flex gap-2 items-center"
          >
            <FontAwesomeIcon icon={faCheck} />
            Mark as Completed
          </button>
        </div>
      ) : (
        <div>
          <button className="bg-green-300 p-2 rounded-md text-white my-4 flex gap-2 items-center">
            <FontAwesomeIcon icon={faCheck} />
            Completed
          </button>
        </div>
      )}
    </div>
  );
};

export default Content;

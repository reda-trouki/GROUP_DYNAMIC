
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { NavLink } from "react-router-dom";
import rehypeRaw from "rehype-raw";

import "./content.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faCheck, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Content = ({ element,topic }) => {
    const [fileContent, setFileContent] = useState("");

    useEffect(() => {
      const loadMarkdownFile = async () => {
        try {
          // Dynamically import the file based on a variable
          const filePath = `../../lessons/${element}/${topic.title}.md`;
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
        <p className="underline">{element}</p>
        <FontAwesomeIcon icon={faAngleRight} />

        <p className="underline">
          {topic.title.length > 20
            ? `${topic.title.slice(0, 35)}...`
            : topic.title}
        </p>
      </div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {fileContent}
      </ReactMarkdown>
      <div>
        <button className="bg-blue-500 hover:bg-blue-400 p-2 rounded-md text-white my-4 flex gap-2 items-center">
          <FontAwesomeIcon icon={faCheck} />
          Mark as Completed
        </button>
      </div>
    </div>
  );
};

export default Content;

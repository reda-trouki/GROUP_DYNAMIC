import { useEffect } from "react";
import "./Message.css";

const Message = ({ content, type="success", setUpdater }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      //this updater contain the message content and
      //responsible for showing the message component
      //it comes from the parent
      if (setUpdater) setUpdater(null);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`alert ${
        content != "failed" ? "alert-success" : "alert-failed"
      } MessageContent`}
      role="alert"
    >
      {content !== "failed"
        ? "Congratulations! You have passed the quiz of " +
          content +
          " Module ✅"
        : "Oooooops! You didn't pass 🛑"}
    </div>
  );

};

export default Message;
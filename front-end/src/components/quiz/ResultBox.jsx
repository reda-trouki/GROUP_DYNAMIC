import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const ResultBox = ({ userScore, totalQuestions,element }) => {
  const nav = useNavigate()
  const percentage = (userScore / totalQuestions) * 100;
  const hanldeFinish = ()=>{
    if (percentage < 50) {
      nav("/courses/elements/", { state: { message: "failed" } });
    } else {
      nav("/courses/elements/", { state: { message: element } });
    }
      
  }
  return (
    <div className="result_box">
      <div className="icon">
        <FontAwesomeIcon icon={faCrown}/>
      </div>
      <div className="complete_text">You've completed the Quiz!</div>
      <div className="score_text">
        Your Score: {userScore} / {totalQuestions}
      </div>
      <div className="percentage">
        You got {percentage}% correct answers!
      </div>
      <div className="buttons">
        <button onClick={hanldeFinish} className="finish_btn">
          Finish
        </button>
      </div>
    </div>
  );
};

export default ResultBox;

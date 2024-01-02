import React from 'react';

const InfoBox = ({ showInfo, onExitClick, onContinueClick }) => {
  return (
    <div className={`info_box ${showInfo ? "activeInfo" : ""}`}>
      <div className="info-title">
        <span>Some Rules of this Quiz</span>
      </div>
      <div className="info-list">
        <div className="info">
          1. Once you select your answer, it can't be undone.✅
        </div>
        <div className="info">
          2. You can't exit from the Quiz while you're playing. ❌
        </div>
        <div className="info">
          3. You'll get points based on your correct answers. 😊
        </div>
        <div className="info">
          4. You Should obtain at least 50% to pass the QuiZ 🥇
        </div>
      </div>
      <div className="buttons">
        <button className="quit" onClick={onExitClick}>
          Exit Quiz
        </button>
        <button className="restart" onClick={onContinueClick}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default InfoBox;

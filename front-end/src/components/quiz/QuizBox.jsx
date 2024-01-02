import React, { useEffect } from 'react';

const QuizBox = ({
  showQuiz,
  queCount,
  queNumb,
  onRestartClick,
  onQuitClick,
  showNextButton,
  onNextClick,
  bottomQuesCounterRef,
  queTextRef, // Use queTextRef prop
  optionListRef, // Use optionListRef prop
  timeValue,
}) => {
  return (
    <div className={`quiz_box ${showQuiz ? 'activeQuiz' : ''}`}>
      <header>
        <div className="title">Awesome Quiz Application</div>
        <div className="time_line"></div>
      </header>
      <section>
        <div className="que_text" ref={queTextRef}></div> {/* Use queTextRef as a ref */}
        <div className="option_list" ref={optionListRef}></div> {/* Use optionListRef as a ref */}
      </section>
      <footer>
        <div ref={bottomQuesCounterRef} className="total_que">
        </div>
        {showNextButton && <button className="next_btn" onClick={onNextClick}>Next Que</button>}
      </footer>
    </div>
  );
};

export default QuizBox;

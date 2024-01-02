import React, { useState, useEffect, useRef } from "react";
import StartButton from "./StartButton";
import InfoBox from "./InfoBox";
import QuizBox from "./QuizBox";
import ResultBox from "./ResultBox";
import "./quiz.css";
import { useParams } from "react-router-dom";

const QuizApp = () => {
  const { name } = useParams();
  const [questions, setQuestions] = useState([]);
  const [quizState, setQuizState] = useState({
    showInfo: false,
    showQuiz: false,
    showResult: false,
    queCount: 0,
    queNumb: 1,
    userScore: 0,
    timeValue: 15,
    widthValue: 0,
  });

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const questionsModule = await import(
          `./Questions/${name.split(" ").join("")}`
        );
        const { default: elementQuestions } = questionsModule;
        setQuestions(elementQuestions);
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    };

    loadQuestions();
  }, [name]);

  const [time, setTime] = useState(15);
  const queTextRef = useRef(null);
  const optionListRef = useRef(null);
  const bottomQuesCounterRef = useRef(null);
  let intervalId;
  const [questionId, setQuestionId] = useState(quizState.queCount);

  useEffect(() => {
    // Ensure refs are available before calling showQuestions
    if (queTextRef.current && optionListRef.current) {
      showQuestions(quizState.queCount);
    }
  }, [queTextRef.current, optionListRef.current, quizState.queCount]);

  const handleStartClick = () => {
    setQuizState({ ...quizState, showInfo: true });
  };

  const handleExitClick = () => {
    setQuizState({ ...quizState, showInfo: false });
  };

  const handleContinueClick = () => {
    setQuizState({
      ...quizState,
      showInfo: false,
      showQuiz: true,
      queCount: 0,
      queNumb: 1,
    });
    queCounter(quizState.queNumb);
    showQuestions(quizState.queCount);

    // Save the intervalId to the component state
    setQuizState((prevState) => ({ ...prevState, intervalId }));
  };

  const handleRestartClick = () => {
    setQuizState({
      ...quizState,
      showQuiz: true,
      showResult: false,
      queCount: 0,
      queNumb: 1,
      userScore: 0,
      timeValue: 15,
      widthValue: 0,
    });
    showQuestions(quizState.queCount);
    queCounter(quizState.queNumb);

    // Save the intervalId to the component state
    setQuizState((prevState) => ({ ...prevState, intervalId }));
  };

  const handleQuitClick = () => {
    window.location.reload();
  };
  const handleNextClick = () => {
    let countQ = quizState.queCount + 1;
    if (quizState.queCount < questions.length - 1) {
      setQuizState((prevState) => ({
        ...prevState,
        queCount: countQ,
        queNumb: prevState.queNumb + 1,
        showNextBtn: false,
      }));

      clearInterval(quizState.intervalId);

      // Save the intervalId to the component state
      setQuizState((prevState) => ({ ...prevState, intervalId }));
    } else {
      showResult();
    }
  };

  const handleOptionClick = (answer) => {
    clearInterval(intervalId);
    const crossIconTag = '<i class="fas fa-times"></i>';
    const tickIconTag = '<i class="fas fa-check"></i>';
    const correctAns = questions[quizState.queCount].answer;
    const allOptions = optionListRef.current.children.length;

    for (let i = 0; i < allOptions; i++) {
      optionListRef.current.children[i].classList.add("disabled");
    }

    setQuizState((prevState) => ({ ...prevState, showNextBtn: true }));

    if (answer !== -1) {
      const userAns = answer.textContent;

      if (userAns === correctAns) {
        setQuizState((prevState) => ({
          ...prevState,
          userScore: prevState.userScore + 1,
        }));
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
      } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);

        for (let i = 0; i < allOptions; i++) {
          if (optionListRef.current.children[i].textContent === correctAns) {
            optionListRef.current.children[i].setAttribute(
              "class",
              "option correct"
            );
            optionListRef.current.children[i].insertAdjacentHTML(
              "beforeend",
              tickIconTag
            );
          }
        }
      }
    } else {
      for (let i = 0; i < allOptions; i++) {
        if (optionListRef.current.children[i].textContent === correctAns) {
          optionListRef.current.children[i].setAttribute(
            "class",
            "option correct"
          );
          optionListRef.current.children[i].insertAdjacentHTML(
            "beforeend",
            tickIconTag
          );
        }
      }
    }
  };

  const showQuestions = (index) => {
    let queTag =
      "<span>" +
      questions[index].numb +
      ". " +
      questions[index].question +
      "</span>";
    let optionTag =
      '<div class="option"><span>' +
      questions[index].options[0] +
      "</span></div>" +
      '<div class="option"><span>' +
      questions[index].options[1] +
      "</span></div>" +
      '<div class="option"><span>' +
      questions[index].options[2] +
      "</span></div>" +
      '<div class="option"><span>' +
      questions[index].options[3] +
      "</span></div>";

    queTextRef.current.innerHTML = queTag;
    optionListRef.current.innerHTML = optionTag;

    const optionRefs = optionListRef.current.children;

    for (let i = 0; i < optionRefs.length; i++) {
      optionRefs[i].addEventListener("click", () =>
        handleOptionClick(optionRefs[i])
      );
    }
  };

  const showResult = () => {
    setQuizState({ ...quizState, showResult: true });
  };

  const queCounter = (index) => {
    if (bottomQuesCounterRef.current) {
      let totalQueCountTag =
        "<span><p>" +
        index +
        "</p> of <p>" +
        questions.length +
        "</p> Questions</span>";
      bottomQuesCounterRef.current.innerHTML = totalQueCountTag;
    }
  };
  useEffect(() => {
    queCounter(quizState.queNumb);
    return () => {
      clearInterval(quizState.intervalId);
    };
  }, [quizState.queNumb, quizState.intervalId]);

  return (
    <div>
      {questions && questions.length > 0 && (
        <>
          <StartButton onClick={handleStartClick} />
          <InfoBox
            showInfo={quizState.showInfo}
            onExitClick={handleExitClick}
            onContinueClick={handleContinueClick}
          />
          {quizState.showResult ? (
            <ResultBox
              userScore={quizState.userScore}
              totalQuestions={questions.length}
              onRestartClick={handleRestartClick}
              element={name}
            />
          ) : (
            <QuizBox
              showQuiz={quizState.showQuiz}
              queCount={quizState.queCount}
              queNumb={quizState.queNumb}
              onRestartClick={handleRestartClick}
              onQuitClick={handleQuitClick}
              onNextClick={handleNextClick}
              bottomQuesCounterRef={bottomQuesCounterRef}
              queTextRef={queTextRef} // Pass queTextRef as a prop
              optionListRef={optionListRef} // Pass optionListRef as a prop
              showNextButton={quizState.showNextBtn}
              timeValue={time}
              setQuestionId={setQuestionId}
            />
          )}
        </>
      )}
    </div>
  );
};

export default QuizApp;

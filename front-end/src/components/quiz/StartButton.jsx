import React from "react";

const StartButton = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-[60%] m-auto">
      <p className="text-center text-2xl font-extrabold mb-8 text-gray-800">
        Welcome to the Quiz Challenge! Are you ready to test your knowledge and
        learn something new?
      </p>
      <div className="bg-blue-600 text-white rounded-md p-6 shadow-lg">
        <button
          onClick={onClick}
          className="px-8 py-4 bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-300 text-lg"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StartButton;

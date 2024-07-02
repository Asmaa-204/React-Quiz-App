import React from "react";

export default function Options({ question, dispatch, answer }) {
  const answered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          key={index}
          disabled={answered}
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            answered
              ? question.correctOption === index
                ? "correct"
                : "wrong"
              : ""
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

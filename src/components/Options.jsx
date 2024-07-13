import React from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function Options() {
  const { questions, dispatch, answer, index } = useQuiz();
  const question = questions[index];
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

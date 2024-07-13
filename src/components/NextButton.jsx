import React from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function NextButton() {
  const { dispatch, answer, numQuestions, index, status } = useQuiz();

  if (answer === null && status !== "finished") return;
  const lastQuestion = index === numQuestions - 1;
  return (
    <button
      onClick={() =>
        dispatch({
          type:
            status === "finished"
              ? "restart"
              : lastQuestion
              ? "finish"
              : "next",
        })
      }
      className="btn btn-ui"
    >
      {status === "finished"
        ? "Restart Quiz"
        : lastQuestion
        ? "Finish"
        : "Next"}
    </button>
  );
}

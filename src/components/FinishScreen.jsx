import React from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function FinishScreen() {
  const { points, maxPoints, highScore } = useQuiz();
  const percentage = (points / maxPoints) * 100;
  
  return (
    <>
      <p className="result">
        You scored {points} out of {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(HighScore: {highScore} points)</p>
    </>
  );
}

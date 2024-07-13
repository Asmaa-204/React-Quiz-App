import { useEffect } from "react";
import Header from "./Header.jsx";
import MainContent from "./MainContent.jsx";
import Error from "./Error.jsx";
import Loader from "./Loader.jsx";
import StartScreen from "./StartScreen.jsx";
import Question from "./Question.jsx";
import Progress from "./Progress.jsx";
import NextButton from "./NextButton.jsx";
import FinishScreen from "./FinishScreen.jsx";
import Timer from "./Timer.jsx";
import { useQuiz } from "../contexts/QuizContext.jsx";

function App() {
  const { status, fetchQuestions } = useQuiz();

  useEffect(() => {
    fetchQuestions();
    return () => {};
  }, []);

  return (
    <div className="app">
      <Header />
      <MainContent>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <NextButton />
            <Timer />
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen />
            <NextButton />
          </>
        )}
      </MainContent>
    </div>
  );
}

export default App;

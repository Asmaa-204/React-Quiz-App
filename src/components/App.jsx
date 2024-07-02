import { useEffect, useReducer } from "react";
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

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  remainingSeconds: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        remainingSeconds: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "next":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        index: 0,
        answer: null,
        highScore: Math.max(state.points, state.highScore),
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highScore: state.highScore,
      };
    case "tick":
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        status: state.remainingSeconds === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highScore, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => curr.points + prev, 0);
  console.log(questions);
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestions();
    return () => {};
  }, []);

  return (
    <div className="app">
      <Header />
      <MainContent>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
            />
            <NextButton
              numQuestions={numQuestions}
              index={index}
              answer={answer}
              dispatch={dispatch}
              status={status}
            />
            <Timer dispatch={dispatch} remainingSeconds={remainingSeconds} />
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen
              points={points}
              maxPoints={maxPoints}
              highScore={highScore}
            />
            <NextButton
              numQuestions={numQuestions}
              index={index}
              answer={answer}
              dispatch={dispatch}
              status={status}
            />
          </>
        )}
      </MainContent>
    </div>
  );
}

export default App;

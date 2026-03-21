import useTimer from "../hooks/useTimer";

function WorkoutTracker() {
  const { seconds, startTimer, stopTimer, resetTimer } = useTimer();

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

  return (
    <div className="card shadow p-4 text-center workout-container">
      <h2>Workout Tracker</h2>

      <h1 className="timer">{formattedTime}</h1>

      <div className="buttons">
        <button className="btn btn-success m-2" onClick={startTimer}>
          Start
        </button>
        <button className="btn btn-warning m-2" onClick={stopTimer}>
          Stop
        </button>
        <button className="btn btn-danger m-2" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default WorkoutTracker;

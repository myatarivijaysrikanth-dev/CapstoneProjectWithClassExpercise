import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function ThemeToggle() {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (

    <div className="card shadow p-4 text-center">

      <h4>Theme Switcher</h4>

      <p>Current Theme: {theme}</p>

      <button className="btn btn-primary" onClick={toggleTheme}>
        Toggle Theme
      </button>

    </div>

  );

}

export default ThemeToggle;
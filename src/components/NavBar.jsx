import { useState } from "react";
import { useThemeStore } from "../store/useThemeStore";
import { themes } from "../assets/themes";

export default function NavBar() {
    const { setTheme, theme } = useThemeStore();
    const [selectedTheme, setSelectedTheme] = useState(theme);
  const changeTheme = (theme) => {
    setTheme(theme);
    setSelectedTheme(theme);
  };
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl text-primary"><img src="/vite.svg" alt="icon" className="w-9 h-9"/>WPM Warrior</a>
      </div>
        
        <button className="btn btn-outline gap-2 btn-sm md:btn-md">Leaderboard</button>
        <button className="btn btn-outline gap-2 btn-sm md:btn-md mx-5">Login</button>

      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-outline gap-2 btn-sm md:btn-md">
          <img src="/theme.svg" alt="Theme icon" className="w-5 h-5" />
          <span className="hidden md:inline">Theme</span>
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content menu shadow bg-base-100 rounded-box w-[500px] max-h-64 overflow-y-auto z-[1] p-2"
        >
          {themes.map((theme) => (
            <li key={theme}>
              <button
                onClick={() => changeTheme(theme)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md capitalize transition-all duration-150 hover:bg-primary hover:text-primary-content ${
                  selectedTheme === theme
                    ? "bg-primary text-primary-content font-semibold"
                    : ""
                }`}
              >
                <span>{theme}</span>
                {selectedTheme === theme && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

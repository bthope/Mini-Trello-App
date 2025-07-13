import { FaTrello } from "react-icons/fa";
import { LuGithub } from "react-icons/lu";
import { DarkModeToggle } from "../shared/DarkModeToggle";
import { DropDownMenu } from "./";
import { useAuth, useBoardContext, useTheme } from "../../contexts";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"; // Assuming logo.png is in the assets folder

export const Navbar = () => {
  const { isLoggedIn, handleLogout } = useAuth();
  const { activeBoardId } = useBoardContext();
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={`flex justify-between items-center max-h-12 px-3 py-2 backdrop-blur-sm opacity-100 border-b border-border z-30 shadow-sm
        ${theme === "dark" ? "text-white" : activeBoardId ? "text-white" : "text-text-primary border-gray-300"} `}
      style={{
        backgroundColor:
          activeBoardId !== null
            ? theme === "dark"
              ? "hsla(0, 0%, 0%, 0.8)"
              : "hsla(0, 0%, 0%, 0.6)"
            : "",
      }}
    >
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Mini-Trello Logo" className="w-8 h-8" />
        <h1 className="text-lg font-bold text-center">Mini-Trello</h1>
      </div>
      <section className="flex justify-evenly items-center gap-3">
        <DarkModeToggle />
        <button
          className="rounded-full trasnsition-colors duration-200 p-1
             hover:shadow-lg hover:bg-bg-hover transition-all"
        >
          <a
            href="https://github.com/bthope/Mini-Trello-App.git"
            target="_blank"
          >
            <LuGithub size={26} />
          </a>
        </button>
        {isLoggedIn ? (
          <DropDownMenu
            onLogout={() => {
              handleLogout();
              navigate("/");
            }}
          />
        ) : (
          <button
            className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-base font-medium rounded-md text-primary bg-text-primary hover:bg-text-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => navigate("/auth")}
          >
            Log in
          </button>
        )}
      </section>
    </div>
  );
};

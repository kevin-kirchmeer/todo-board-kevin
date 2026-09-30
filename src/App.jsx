import "./App.css";
import LogInPage from "./components/LogInPage";
import RegisterPage from "./components/RegisterPage";
import { useUser } from "./hooks/useUser";
import { Routes, Route } from "react-router-dom";
import { logout } from "./services/auth";

export default function App() {
  const user = useUser();

  if (!user) {
    return (
      <div>
        <Routes>
          <Route path="/RegisterPage" element={<RegisterPage user={user} />} />
          <Route path="/" element={<LogInPage user={user} />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex flex-col items-center">

      <div className="w-full max-w-4xl flex justify-between items-center bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-6 rounded-2xl shadow-xl mb-8">
        <div>
          <h1 className="text-xl font-bold bg-linear-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Todo-Board
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Herzlich Willkommen <span className="text-cyan-400">{user.user_metadata?.display_name || user.email}</span>!
          </p>
        </div>
        <button
          onClick={logout}
          className="py-2 px-4 rounded-xl font-medium bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-sm cursor-pointer"
        >
          Abmelden
        </button>
      </div>

      <div className="w-full max-w-4xl text-center text-slate-500 border border-dashed border-slate-800 p-12 rounded-2xl">
        Dein Todo-Board entsteht hier in den nächsten Schritten...
      </div>
    </div>
  );
}


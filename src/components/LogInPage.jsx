import { useState } from "react";
import { login } from "../services/auth";
import { Link } from "react-router-dom";
import { loginWithGitHub } from "../services/auth";

export default function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-4">
      <div className="absolute w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-md p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-cyan-950/20">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight bg-linear-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Willkommen zurück
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Logge dich in dein Todo-Board ein
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-xs font-medium uppercase tracking-wider text-slate-300"
            >
              E-Mail
            </label>
            <input
              type="email"
              value={email}
              id="email"
              required
              className="px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-xs font-medium uppercase tracking-wider text-slate-300"
            >
              Passwort
            </label>
            <input
              type="password"
              value={password}
              id="password"
              required
              className="px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className="mt-2 py-3 px-4 rounded-xl font-medium bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-500 transition-all active:scale-[0.98]"
          >
            Anmelden
          </button>

          <div className="mt-4 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={async () => {
                try {
                  await loginWithGitHub();
                } catch (error) {
                  setError(error.message);
                }
              }}
              className="w-full py-3 px-4 rounded-xl font-medium bg-slate-950 border border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-3 text-sm cursor-pointer shadow-md"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              Mit GitHub anmelden
            </button>
          </div>

          <div className="flex justify-center items-center gap-2 mt-4 text-sm text-slate-400">
            <p>Noch keinen Account?</p>
            <Link
              to="/RegisterPage"
              className="text-cyan-400 hover:underline font-medium"
            >
              Registrieren
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

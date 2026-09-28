import { useState } from "react";
import { register } from "../services/auth";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }

    try {
      await register(email, password, displayName);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-4">
      <div className="absolute w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-md p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-cyan-950/20">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight bg-linear-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Konto erstellen
          </h1>
          <p className="text-sm text-slate-400 mt-1">Starte mit deinem modernen Todo-Board</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-slate-300">
              Benutzername:
            </label>
            <input
              type="name"
              id="name"
              required
              value={displayName}
              className="px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
              placeholder="Benutzername"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-slate-300">
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              className="px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-slate-300">
              Passwort
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              className="px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-xs font-medium uppercase tracking-wider text-slate-300">
              Passwort wiederholen
            </label>
            <input
              type="password"
              id="confirmPassword"
              required
              value={confirmPassword}
              className="px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
              placeholder="••••••••"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="mt-2 py-3 px-4 rounded-xl font-medium bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-blue-500 transition-all active:scale-[0.98]"
          >
            Registrieren
          </button>

          <div className="flex justify-center items-center gap-2 mt-4 text-sm text-slate-400">
            <p>Schon einen Account?</p>
            <Link to="/" className="text-cyan-400 hover:underline font-medium">
              Anmelden
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
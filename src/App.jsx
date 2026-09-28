import "./App.css";
import LogInPage from "./components/LogInPage";
import RegisterPage from "./components/RegisterPage";
import { useUser } from "./hooks/useUser";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const user = useUser();

  return (
    <div>
      <Routes>
        <Route path="/RegisterPage" element={<RegisterPage user={user} />} />
        <Route path="/" element={<LogInPage user={user} />} />
      </Routes>
    </div>
  );
}

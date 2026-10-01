import { useState } from "react";
import { createTask } from "../services/tasks";
import { useTasks } from "../hooks/useTasks";
import { TaskCard } from "./TaskCard";

export function BoardDetail({ boardId }) {
  const { tasks, loading, error, removeTaskLocal, updateTaskStatusLocal } = useTasks(boardId);
  const [newTitle, setNewTitle] = useState("");

  if (loading) return <p className="text-slate-400">Lade Aufgaben...</p>;
  if (error) return <p className="text-red-400">Fehler: {error}</p>;

  async function handleCreateTask(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      await createTask(boardId, newTitle);
      setNewTitle("");
    } catch (err) {
      console.error("Fehler beim Erstellen:", err.message);
    }
  }

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const doingTasks = tasks.filter((task) => task.status === "doing");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <div className="w-full flex flex-col gap-6">
      <form onSubmit={handleCreateTask} className="flex gap-2">
        <input
          type="text"
          placeholder="Neue Aufgabe eingeben..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-sm"
        />
        <button
          type="submit"
          className="py-3 px-5 rounded-xl font-medium bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all text-sm cursor-pointer"
        >
          Hinzufügen
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-2xl flex flex-col gap-3">
          <h3 className="font-semibold text-sm text-cyan-400 uppercase tracking-wider">To Do ({todoTasks.length})</h3>
          {todoTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              removeTaskLocal={removeTaskLocal} 
              updateTaskStatusLocal={updateTaskStatusLocal} 
            />
          ))}
        </div>

        <div className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-2xl flex flex-col gap-3">
          <h3 className="font-semibold text-sm text-amber-400 uppercase tracking-wider">In Arbeit ({doingTasks.length})</h3>
          {doingTasks.map((task) => (
             <TaskCard 
              key={task.id} 
              task={task} 
              removeTaskLocal={removeTaskLocal} 
              updateTaskStatusLocal={updateTaskStatusLocal} 
            />
          ))}
        </div>

        <div className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-2xl flex flex-col gap-3">
          <h3 className="font-semibold text-sm text-emerald-400 uppercase tracking-wider">Erledigt ({doneTasks.length})</h3>
          {doneTasks.map((task) => (
             <TaskCard 
              key={task.id} 
              task={task} 
              removeTaskLocal={removeTaskLocal} 
              updateTaskStatusLocal={updateTaskStatusLocal} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
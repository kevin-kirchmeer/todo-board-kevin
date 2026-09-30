import { useState } from "react";
import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";
import { updateTaskStatus, deleteTask, createTask, updateTaskTitle } from "../services/tasks";
import { useTasks } from "../hooks/useTasks";

export function BoardDetail({ boardId }) {
  const { tasks, loading, error, reload } = useTasks(boardId);
  const [newTitle, setNewTitle] = useState("");
  

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  if (loading) return <p className="text-slate-400">Lade Aufgaben...</p>;
  if (error) return <p className="text-red-400">Fehler: {error}</p>;

  async function handleCreateTask(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      await createTask(boardId, newTitle);
      setNewTitle("");
      reload();
    } catch (err) {
      console.error("Fehler beim Erstellen:", err.message);
    }
  }


  function startEditing(task) {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  }


  async function saveEdit(id) {
    if (!editingTitle.trim()) {
      setEditingTaskId(null);
      return;
    }

    try {
      await updateTaskTitle(id, editingTitle);
      setEditingTaskId(null);
      reload();
    } catch (err) {
      console.error("Fehler beim Aktualisieren:", err.message);
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
              editingTaskId={editingTaskId}
              editingTitle={editingTitle}
              setEditingTitle={setEditingTitle}
              startEditing={startEditing}
              saveEdit={saveEdit}
              setEditingTaskId={setEditingTaskId}
            />
          ))}
        </div>

        <div className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-2xl flex flex-col gap-3">
          <h3 className="font-semibold text-sm text-amber-400 uppercase tracking-wider">In Arbeit ({doingTasks.length})</h3>
          {doingTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              editingTaskId={editingTaskId}
              editingTitle={editingTitle}
              setEditingTitle={setEditingTitle}
              startEditing={startEditing}
              saveEdit={saveEdit}
              setEditingTaskId={setEditingTaskId}
            />
          ))}
        </div>

        <div className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-2xl flex flex-col gap-3">
          <h3 className="font-semibold text-sm text-emerald-400 uppercase tracking-wider">Erledigt ({doneTasks.length})</h3>
          {doneTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              editingTaskId={editingTaskId}
              editingTitle={editingTitle}
              setEditingTitle={setEditingTitle}
              startEditing={startEditing}
              saveEdit={saveEdit}
              setEditingTaskId={setEditingTaskId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task, editingTaskId, editingTitle, setEditingTitle, startEditing, saveEdit, setEditingTaskId }) {
  const isEditing = editingTaskId === task.id;

  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-3 shadow-sm">
      {isEditing ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit(task.id);
              if (e.key === "Escape") setEditingTaskId(null);
            }}
            autoFocus
            className="flex-1 px-2 py-1 rounded bg-slate-950 border border-cyan-500 text-slate-100 text-sm focus:outline-none"
          />
          <button
            onClick={() => saveEdit(task.id)}
            className="px-2 py-1 bg-cyan-500 text-slate-950 rounded text-xs font-semibold cursor-pointer"
          >
            OK
          </button>
        </div>
      ) : (
        <p
          onClick={() => startEditing(task)}
          className="text-sm text-slate-200 cursor-pointer hover:text-cyan-300 transition-colors"
          title="Klicken zum Bearbeiten"
        >
          {task.title}
        </p>
      )}

      <div className="flex justify-between items-center pt-2 border-t border-slate-800/60">
        <div className="flex gap-1">
          {task.status !== "todo" && (
            <button
              onClick={() => updateTaskStatus(task.id, task.status === "done" ? "doing" : "todo")}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all cursor-pointer"
              title="Nach links verschieben"
            >
              <ArrowLeft size={14} />
            </button>
          )}
          {task.status !== "done" && (
            <button
              onClick={() => updateTaskStatus(task.id, task.status === "todo" ? "doing" : "done")}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all cursor-pointer"
              title="Nach rechts verschieben"
            >
              <ArrowRight size={14} />
            </button>
          )}
        </div>

        <button
          onClick={() => deleteTask(task.id)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
          title="Löschen"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
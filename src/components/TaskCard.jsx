import { useState } from "react";
import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";
import { updateTaskStatus, deleteTask, updateTaskTitle } from "../services/tasks";

export function TaskCard({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  async function saveEdit() {
    if (!editTitle.trim()) {
      setIsEditing(false);
      return;
    }
    try {
      await updateTaskTitle(task.id, editTitle);
      setIsEditing(false);
    } catch (err) {
      console.error("Fehler beim Aktualisieren:", err.message);
    }
  }

  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-3 shadow-sm">
      {isEditing ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") setIsEditing(false);
            }}
            autoFocus
            className="flex-1 px-2 py-1 rounded bg-slate-950 border border-cyan-500 text-slate-100 text-sm focus:outline-none"
          />
          <button
            onClick={saveEdit}
            className="px-2 py-1 bg-cyan-500 text-slate-950 rounded text-xs font-semibold cursor-pointer"
          >
            OK
          </button>
        </div>
      ) : (
        <p
          onClick={() => setIsEditing(true)}
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
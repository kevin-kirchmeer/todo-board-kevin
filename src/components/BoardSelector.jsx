
import { useState } from "react";
import { useBoards } from "../hooks/useBoards";
import { createBoard, deleteBoard } from "../services/boards";
import { Trash2, Plus, LayoutDashboard } from "lucide-react";

export function BoardSelector({ selectedBoardId, onSelectBoard }) {
  const { boards, loading, error, reload } = useBoards();
  const [newTitle, setNewTitle] = useState("");
  const [creating, setCreating] = useState(false);

  async function handleCreate(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      setCreating(true);
      await createBoard(newTitle);
      setNewTitle("");
      reload();
    } catch (err) {
      console.error(err.message);
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id, e) {
    e.stopPropagation();
    if (!confirm("Hm... Willst du dieses Board wirklich... wirklich... löschen?")) return;

    try {
      await deleteBoard(id);
      reload();
      if (selectedBoardId === id) {
        onSelectBoard(null);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  if (loading) return <p className="text-slate-400">Lade Boards...</p>;
  if (error) return <p className="text-red-400">Fehler: {error}</p>;

  return (
    <div className="w-full flex flex-col gap-6">
      <form onSubmit={handleCreate} className="flex gap-2">
        <input
          type="text"
          placeholder="Neues Board benennen..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-sm"
        />
        <button
          type="submit"
          disabled={creating}
          className="py-3 px-5 rounded-xl font-medium bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center gap-2 text-sm cursor-pointer"
        >
          <Plus size={18} /> Board erstellen
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {boards.map((board) => {
          const isSelected = selectedBoardId === board.id;
          return (
            <div
              key={board.id}
              onClick={() => onSelectBoard(board.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                isSelected
                  ? "bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-lg shadow-cyan-500/10"
                  : "bg-slate-900/60 border-slate-800 text-slate-200 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard size={20} className={isSelected ? "text-cyan-400" : "text-slate-400"} />
                <span className="font-semibold text-sm">{board.title}</span>
              </div>
              <button
                onClick={(e) => handleDelete(board.id, e)}
                className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                title="Board löschen"
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
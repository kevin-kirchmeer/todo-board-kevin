import { ArrowLeft, ArrowRight, Trash2 } from "lucide-react";
import { updateTaskStatus, deleteTask } from "../services/tasks";
import { useTasks } from "../hooks/useTasks";

export function BoardDetail({ boardId }) {
  const { tasks, loading, error } = useTasks(boardId);

  if (loading) return <p>Lade Aufgaben...</p>;
  if (error) return <p>Fehler: {error}</p>;

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const doingTasks = tasks.filter((task) => task.status === "doing");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <div className="kanban-board" style={{ display: "flex", gap: "20px" }}>
      <div className="kanban-column">
        <h2>To Do</h2>
        {todoTasks.map((task) => (
          <div key={task.id} className="task-card">
            <p>{task.title}</p>
            <div className="task-actions">
              <button onClick={() => updateTaskStatus(task.id, "doing")}>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-btn"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="kanban-column">
        <h2>In Arbeit</h2>
        {doingTasks.map((task) => (
          <div key={task.id} className="task-card">
            <p>{task.title}</p>
            <div className="task-actions">
              <button onClick={() => updateTaskStatus(task.id, "todo")}>
                <ArrowLeft size={16} />
              </button>
              <button onClick={() => updateTaskStatus(task.id, "done")}>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-btn"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="kanban-column">
        <h2>Erledigt</h2>
        {doneTasks.map((task) => (
          <div key={task.id} className="task-card">
            <p>{task.title}</p>
            <div className="task-actions">
              <button onClick={() => updateTaskStatus(task.id, "doing")}>
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-btn"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

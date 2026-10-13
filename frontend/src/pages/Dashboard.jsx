import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listTasks } from "../api/tasks";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    listTasks().then(({ data }) => setTasks(data));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.is_done;
    if (filter === "done") return t.is_done;
    return true;
  });

  const stats = {
    total: tasks.length,
    done: tasks.filter((t) => t.is_done).length,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Мои задачи</h1>
          <button onClick={logout} className="text-gray-600 hover:text-gray-900">
            Выйти
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <p>Всего: {stats.total} | Выполнено: {stats.done}</p>
        </div>

        <TaskForm onCreated={(task) => setTasks([task, ...tasks])} />

        <div className="flex gap-2 mb-4">
          {["all", "active", "done"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded ${
                filter === f ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              {f === "all" ? "Все" : f === "active" ? "Активные" : "Выполненные"}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onChange={(updated) =>
                setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)))
              }
              onDelete={(id) => setTasks(tasks.filter((t) => t.id !== id))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

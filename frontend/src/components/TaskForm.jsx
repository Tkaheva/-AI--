import { useState } from "react";
import { createTask, aiSuggest } from "../api/tasks";

export default function TaskForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [subtasks, setSubtasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const { data } = await createTask({ title, description, priority });
    onCreated(data);
    setTitle("");
    setDescription("");
    setPriority("medium");
    setSubtasks([]);
  };

  const askAI = async () => {
    if (!title.trim()) return;
    setLoading(true);
    try {
      const { data } = await aiSuggest(title, description);
      setSubtasks(data.subtasks);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Новая задача</h2>
      <input
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        required
      />
      <textarea
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        rows={2}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      >
        <option value="low">Низкий</option>
        <option value="medium">Средний</option>
        <option value="high">Высокий</option>
      </select>

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Создать
        </button>
        <button
          type="button"
          onClick={askAI}
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "AI думает..." : "AI: разбить на подзадачи"}
        </button>
      </div>

      {subtasks.length > 0 && (
        <div className="mt-4 p-3 bg-purple-50 rounded">
          <p className="font-semibold mb-2">Предложенные подзадачи:</p>
          <ul className="list-disc pl-5">
            {subtasks.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}

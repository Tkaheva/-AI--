import { updateTask, deleteTask } from "../api/tasks";

export default function TaskItem({ task, onChange, onDelete }) {
  const toggle = async () => {
    const { data } = await updateTask(task.id, { is_done: !task.is_done });
    onChange(data);
  };

  const remove = async () => {
    await deleteTask(task.id);
    onDelete(task.id);
  };

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-start gap-3">
      <input
        type="checkbox"
        checked={task.is_done}
        onChange={toggle}
        className="mt-1 w-5 h-5"
      />
      <div className="flex-1">
        <p className={`font-semibold ${task.is_done ? "line-through text-gray-400" : ""}`}>
          {task.title}
        </p>
        {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
        <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      <button onClick={remove} className="text-red-500 hover:text-red-700">
        ✕
      </button>
    </div>
  );
}

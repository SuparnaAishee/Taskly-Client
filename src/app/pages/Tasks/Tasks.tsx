import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/layout/layout";
import { FiPlus } from "react-icons/fi";
import AddTaskModal from "../../components/Modal/tasksModal";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/task", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  const handleAddTask = async (newTask: {
    title: string;
    description: string;
    dueDate: string;
    priority: "low" | "medium" | "high";
    status: "pending" | "in-progress" | "completed";
  }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/task",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token
            "Content-Type": "application/json",
          },
        }
      );
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setShowAddTaskModal(false); // Close modal after adding
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tasks</h1>

        {/* Add Task Button */}
        <button
          onClick={() => setShowAddTaskModal(true)}
          className="flex items-center mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <FiPlus className="mr-2" />
          Add Task
        </button>

        {/* Add Task Modal */}
        {showAddTaskModal && (
          <AddTaskModal
            isOpen={showAddTaskModal}
            onClose={() => setShowAddTaskModal(false)}
            onAddTask={handleAddTask}
          />
        )}

        {/* Tasks List */}
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`p-4 mb-2 border rounded ${
                  task.completed ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p>{task.description}</p>
                <p
                  className={`mt-2 font-semibold ${
                    task.completed ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {task.completed ? "Completed" : "Not Completed"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </Layout>
  );
};

export default Tasks;

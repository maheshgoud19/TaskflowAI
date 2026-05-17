import { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TaskBoard from '../components/TaskBoard';
import { AuthContext } from '../context/AuthContext';

const socket = io('');

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTasks();

    socket.on('task_created', (newTask) => {
      if (newTask.createdBy === user._id) {
        setTasks((prev) => [newTask, ...prev]);
      }
    });

    socket.on('task_updated', (updatedTask) => {
      setTasks((prev) => prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
    });

    socket.on('task_deleted', (deletedTaskId) => {
      setTasks((prev) => prev.filter((t) => t._id !== deletedTaskId));
    });

    return () => {
      socket.off('task_created');
      socket.off('task_updated');
      socket.off('task_deleted');
    };
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 dark:bg-slate-950 p-6">
          <Routes>
            <Route path="/" element={<TaskBoard tasks={tasks} setTasks={setTasks} loading={loading} />} />
            {/* other routes like settings can go here */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

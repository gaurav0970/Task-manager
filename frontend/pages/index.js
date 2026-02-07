import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskService from '../services/taskService';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await TaskService.getAllTasks();
    setTasks(data);
  };

  const handleCreate = async (taskData) => {
    await TaskService.createTask(taskData);
    fetchTasks();
  };

  const handleUpdate = async (id, taskData) => {
    await TaskService.updateTask(id, taskData);
    setEditingTask(null);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await TaskService.deleteTask(id);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      
      <div className="content">
        <div className="form-section">
          <TaskForm 
            task={editingTask}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onCancel={handleCancelEdit}
          />
        </div>
        
        <div className="list-section">
          <TaskList 
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 30px;
        }
        
        .content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 30px;
        }
        
        .form-section {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
        }
        
        .list-section {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
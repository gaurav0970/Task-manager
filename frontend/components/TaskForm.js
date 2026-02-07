import { useState, useEffect } from 'react';

const TaskForm = ({ task, onCreate, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      if (task) {
        await onUpdate(task._id, formData);
      } else {
        await onCreate(formData);
      }
      setFormData({ title: '', description: '', status: 'pending' });
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
      
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="button-group">
        <button type="submit" className="primary">
          {task ? 'Update Task' : 'Create Task'}
        </button>
        
        {task && (
          <button type="button" onClick={onCancel} className="secondary">
            Cancel
          </button>
        )}
      </div>

      <style jsx>{`
        .form-group {
          margin-bottom: 15px;
        }
        
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #555;
        }
        
        input, textarea, select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }
        
        textarea {
          resize: vertical;
        }
        
        .button-group {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        
        button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
        }
        
        .primary {
          background: #0070f3;
          color: white;
        }
        
        .primary:hover {
          background: #0051a8;
        }
        
        .secondary {
          background: #6c757d;
          color: white;
        }
        
        .secondary:hover {
          background: #545b62;
        }
      `}</style>
    </form>
  );
};

export default TaskForm;
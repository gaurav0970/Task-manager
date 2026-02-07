const TaskList = ({ tasks, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#28a745';
      case 'in-progress':
        return '#17a2b8';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    return status.replace('-', ' ').toUpperCase();
  };

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found. Create your first task!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Task List</h2>
      
      <div className="tasks">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-header">
              <h3>{task.title}</h3>
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(task.status) }}
              >
                {getStatusText(task.status)}
              </span>
            </div>
            
            {task.description && (
              <p className="description">{task.description}</p>
            )}
            
            <div className="task-footer">
              <small>
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </small>
              
              <div className="actions">
                <button 
                  onClick={() => onEdit(task)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(task._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .empty-state {
          text-align: center;
          padding: 40px;
          color: #6c757d;
        }
        
        .task-list {
          padding: 10px;
        }
        
        .tasks {
          display: grid;
          gap: 15px;
        }
        
        .task-card {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 15px;
          transition: box-shadow 0.2s;
        }
        
        .task-card:hover {
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .task-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }
        
        .task-header h3 {
          margin: 0;
          color: #333;
          font-size: 16px;
          flex: 1;
        }
        
        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          color: white;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
        }
        
        .description {
          color: #666;
          margin: 10px 0;
          font-size: 14px;
          line-height: 1.4;
        }
        
        .task-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;
          padding-top: 10px;
          border-top: 1px solid #f0f0f0;
        }
        
        .task-footer small {
          color: #888;
        }
        
        .actions {
          display: flex;
          gap: 8px;
        }
        
        .edit-btn, .delete-btn {
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: bold;
        }
        
        .edit-btn {
          background: #17a2b8;
          color: white;
        }
        
        .edit-btn:hover {
          background: #138496;
        }
        
        .delete-btn {
          background: #dc3545;
          color: white;
        }
        
        .delete-btn:hover {
          background: #c82333;
        }
      `}</style>
    </div>
  );
};

export default TaskList;
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

const TaskBoard = ({ tasks, setTasks, loading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const columns = ['Todo', 'In Progress', 'Completed'];

  const getTasksByStatus = (status) => {
    return tasks.filter((t) => t.status === status);
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Optimistically update
    const taskIndex = tasks.findIndex((t) => t._id === draggableId);
    if (taskIndex === -1) return;

    const newTasks = [...tasks];
    const task = { ...newTasks[taskIndex], status: destination.droppableId };
    newTasks[taskIndex] = task;
    setTasks(newTasks);

    try {
      await axios.put(`http://localhost:5000/api/tasks/${draggableId}`, { status: destination.droppableId });
    } catch (err) {
      console.error('Failed to update task status', err);
      // rollback could be added here
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Board</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and track your tasks</p>
        </div>
        <button
          onClick={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
          {columns.map((status) => (
            <div key={status} className="flex-shrink-0 w-80 flex flex-col bg-gray-100/50 dark:bg-slate-900/50 rounded-xl">
              <div className="p-4 flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  {status === 'Todo' && <div className="w-2 h-2 rounded-full bg-slate-400" />}
                  {status === 'In Progress' && <div className="w-2 h-2 rounded-full bg-amber-400" />}
                  {status === 'Completed' && <div className="w-2 h-2 rounded-full bg-green-400" />}
                  {status}
                </h3>
                <span className="text-xs font-medium bg-gray-200 dark:bg-slate-800 px-2 py-1 rounded-full text-gray-600 dark:text-gray-400">
                  {getTasksByStatus(status).length}
                </span>
              </div>

              <Droppable droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 p-3 min-h-[150px] transition-colors ${
                      snapshot.isDraggingOver ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''
                    }`}
                  >
                    {getTasksByStatus(status).map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-3 ${snapshot.isDragging ? 'opacity-80' : ''}`}
                            onClick={() => {
                              setEditingTask(task);
                              setIsModalOpen(true);
                            }}
                          >
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
      />
    </div>
  );
};

export default TaskBoard;

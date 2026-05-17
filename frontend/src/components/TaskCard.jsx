import { Calendar, AlignLeft } from 'lucide-react';
import { format } from 'date-fns';

const TaskCard = ({ task }) => {
  const priorityColors = {
    High: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    Low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  };

  return (
    <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-2">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      
      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {task.title}
      </h4>
      
      {task.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex items-start gap-1.5">
          <AlignLeft className="w-4 h-4 shrink-0 mt-0.5" />
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-4">
        {task.dueDate ? (
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-900 px-2 py-1 rounded-md border border-gray-100 dark:border-slate-800">
            <Calendar className="w-3.5 h-3.5" />
            {format(new Date(task.dueDate), 'MMM d, yyyy')}
          </div>
        ) : <div />}
        
        {/* Placeholder for assignee avatar */}
        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-[10px] font-bold text-indigo-700 dark:text-indigo-300">
          UI
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

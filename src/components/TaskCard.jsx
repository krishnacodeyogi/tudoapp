import { Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import {
  Trash2,
  CheckCircle2,
  Circle,
  Clock,
  Edit3,
  Calendar,
  AlertCircle,
  Briefcase,
  User,
  Coffee,
  Code
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const priorityColors = {
  high: 'text-red-500 bg-red-500/10',
  medium: 'text-amber-500 bg-amber-500/10',
  low: 'text-emerald-500 bg-emerald-500/10'
};

const categoryIcons = {
  Work: <Briefcase size={14} />,
  Personal: <User size={14} />,
  Health: <Coffee size={14} />,
  Project: <Code size={14} />,
  Default: <Circle size={14} />
};

const TaskCard = ({ task, index, onToggle, onDelete }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            'group relative mb-4 overflow-hidden rounded-[24px] border border-slate-200/50 bg-white/50 p-5 transition-all dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md shadow-sm',
            snapshot.isDragging && 'shadow-2xl ring-2 ring-blue-500/50 bg-white dark:bg-slate-800',
            task.completed && 'opacity-60 grayscale-[0.4] bg-slate-50/50 dark:bg-slate-950/50'
          )}
        >
          <div className="flex items-start gap-4">
            <button
              onClick={() => onToggle(task.id)}
              className={cn(
                'mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all',
                task.completed
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-slate-300 dark:border-slate-700 hover:border-blue-500'
              )}
            >
              {task.completed && <CheckCircle2 size={16} strokeWidth={3} />}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={cn(
                  'inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-widest transition-colors',
                  priorityColors[task.priority] || priorityColors.medium
                )}>
                  <AlertCircle size={10} strokeWidth={3} /> {task.priority}
                </span>

                <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {categoryIcons[task.category] || categoryIcons.Default}
                  {task.category || 'General'}
                </span>
              </div>

              <h3 className={cn(
                'text-base font-black text-slate-900 dark:text-white uppercase tracking-tight truncate',
                task.completed && 'line-through decoration-blue-500/50'
              )}>
                {task.title}
              </h3>

              {task.description && (
                <p className="mt-1 line-clamp-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {task.description}
                </p>
              )}

              <div className="mt-4 flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  <span>{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No Deadline'}</span>
                </div>
                {task.completed && (
                  <div className="flex items-center gap-1.5 text-emerald-500">
                    <CheckCircle2 size={12} />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link to={`/task/${task.id}`}>
                <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all hover:bg-blue-500 hover:text-white dark:bg-slate-800 dark:text-slate-400">
                  <Edit3 size={16} />
                </button>
              </Link>
              <button
                onClick={() => onDelete(task.id)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all hover:bg-red-500 hover:text-white dark:bg-slate-800 dark:text-slate-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="absolute top-0 right-0 p-3">
             {task.completed ? (
               <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
             ) : (
               <div className="h-1.5 w-1.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] animate-pulse" />
             )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;

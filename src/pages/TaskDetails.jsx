import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Trash2,
  Calendar,
  AlertTriangle,
  Layers,
  FileText,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTasks } from '../hooks/useTasks';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask } = useTasks();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const foundTask = tasks.find(t => t.id === id);
    if (foundTask) {
      setTask({ ...foundTask });
    }
  }, [id, tasks]);

  if (!task) return (
    <div className="flex min-h-screen items-center justify-center pt-20">
      <div className="text-center">
        <ShieldAlert size={64} className="mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Protocol Data Missing</h2>
        <Button onClick={() => navigate('/dashboard')} className="mt-6">Return to Command Center</Button>
      </div>
    </div>
  );

  const handleSave = (e) => {
    e.preventDefault();
    updateTask(id, task);
    toast.success('Protocol synchronization complete');
    navigate('/dashboard');
  };

  const handleDelete = () => {
    if (window.confirm('Decommission this protocol permanently?')) {
      deleteTask(id);
      navigate('/dashboard');
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-500 mb-8 transition-colors"
        >
          <ArrowLeft size={16} strokeWidth={3} /> Return to Sector Seven
        </button>

        <div className="overflow-hidden rounded-[48px] border border-slate-200/50 bg-white/50 p-12 dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between mb-12">
            <div>
               <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Edit <span className="text-blue-500 text-gradient">Mission</span></h1>
               <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-400">UID: {id.substring(0, 8)}</p>
            </div>
            <button
              onClick={handleDelete}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10"
            >
              <Trash2 size={24} />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-8">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">
                <FileText size={14} /> Mission Objective
              </label>
              <input
                type="text"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className="w-full rounded-2xl border-2 border-slate-100 bg-slate-100/50 px-6 py-5 font-bold text-slate-900 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-white dark:focus:border-blue-500 text-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">
                <FileText size={14} /> Strategic Details
              </label>
              <textarea
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                className="w-full h-40 rounded-2xl border-2 border-slate-100 bg-slate-100/50 px-6 py-5 font-bold text-slate-900 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-white dark:focus:border-blue-500 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">
                  <AlertTriangle size={14} /> Threat Level (Priority)
                </label>
                <select
                  value={task.priority}
                  onChange={(e) => setTask({ ...task, priority: e.target.value })}
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-100/50 px-6 py-4 font-bold text-slate-900 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-white dark:focus:border-blue-500"
                >
                  <option value="low">LOW PRIORITY</option>
                  <option value="medium">MEDIUM PRIORITY</option>
                  <option value="high">HIGH PRIORITY</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">
                  <Layers size={14} /> Operational Sector
                </label>
                <select
                  value={task.category}
                  onChange={(e) => setTask({ ...task, category: e.target.value })}
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-100/50 px-6 py-4 font-bold text-slate-900 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-white dark:focus:border-blue-500"
                >
                  <option value="Personal">PERSONAL</option>
                  <option value="Work">WORK</option>
                  <option value="Health">HEALTH</option>
                  <option value="Project">PROJECT</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">
                <Calendar size={14} /> Execution Deadline
              </label>
              <input
                type="date"
                value={task.deadline}
                onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                className="w-full rounded-2xl border-2 border-slate-100 bg-slate-100/50 px-6 py-4 font-bold text-slate-900 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-white dark:focus:border-blue-500"
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button type="button" variant="secondary" onClick={() => navigate('/dashboard')} className="flex-1 h-14">
                Discard Changes
              </Button>
              <Button type="submit" className="flex-1 h-14 gap-2">
                <Save size={20} /> Update Protocol
              </Button>
            </div>
          </form>

          <div className="mt-12 flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <div className="flex items-center gap-2">
              <Clock size={12} /> Created: {new Date(task.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskDetails;

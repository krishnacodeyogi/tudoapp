import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, AlertTriangle, Calendar, Tag, Layers, FileText } from 'lucide-react';
import { useState } from 'react';
import Button from './Button';

const TaskModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'Personal',
    deadline: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onAdd(formData);
      setFormData({ title: '', description: '', priority: 'medium', category: 'Personal', deadline: '' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg overflow-hidden rounded-[40px] border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-950"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              New <span className="text-blue-500">Task</span>
            </h2>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition-all hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <FileText size={14} /> Mission Title
              </label>
              <input
                autoFocus
                type="text"
                placeholder="E.g. Design System Implementation"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-5 py-4 font-bold text-slate-900 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <FileText size={14} /> Description
              </label>
              <textarea
                placeholder="Strategic details..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full h-24 rounded-2xl border-2 border-slate-100 bg-slate-50 px-5 py-4 font-bold text-slate-900 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <AlertTriangle size={14} /> Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3 font-bold text-slate-900 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-blue-500"
                >
                  <option value="low">LOW</option>
                  <option value="medium">MEDIUM</option>
                  <option value="high">HIGH</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <Layers size={14} /> Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 py-3 font-bold text-slate-900 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-blue-500"
                >
                  <option value="Personal">PERSONAL</option>
                  <option value="Work">WORK</option>
                  <option value="Health">HEALTH</option>
                  <option value="Project">PROJECT</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <Calendar size={14} /> Mission Deadline
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-5 py-3 font-bold text-slate-900 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-blue-500"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 gap-2">
                <Plus size={18} /> Initialize Task
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskModal;

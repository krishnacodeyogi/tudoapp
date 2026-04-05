import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      const savedTasks = localStorage.getItem(`tasks_${user.email}`);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } else {
      setTasks([]);
    }
  }, [user]);

  const saveTasks = useCallback((newTasks) => {
    if (user) {
      setTasks(newTasks);
      localStorage.setItem(`tasks_${user.email}`, JSON.stringify(newTasks));
    }
  }, [user]);

  // Alert system for upcoming deadlines
  useEffect(() => {
    if (!tasks.length) return;

    const now = new Date();
    tasks.forEach(task => {
      if (task.deadline && !task.completed && !task.alertShown) {
        const deadlineDate = new Date(task.deadline);
        const diffTime = deadlineDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= 0 && diffDays <= 2) {
          toast(`Mission Critical: ${task.title} is due in ${diffDays} day(s)`, {
            icon: '⚠️',
            style: { border: '1px solid #f59e0b' }
          });
          // Mark alert as shown locally to prevent double toast
          updateTask(task.id, { alertShown: true });
        }
      }
    });
  }, [tasks.length]); // Simple trigger on count change

  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false,
      priority: 'medium',
      category: 'Personal',
      alertShown: false,
      ...task
    };
    saveTasks([newTask, ...tasks]);
    toast.success('Task operational');
  };

  const updateTask = (id, updates) => {
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, ...updates } : t);
    saveTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(t => t.id !== id);
    saveTasks(updatedTasks);
    toast.success('Task decommissioned');
  };

  const toggleTask = (id) => {
    const task = tasks.find(t => t.id === id);
    updateTask(id, { completed: !task.completed });
    if (!task.completed) toast.success('Mission accomplished');
  };

  const reorderTasks = (startIndex, endIndex) => {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    saveTasks(result);
  };

  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tasks_${user.email}_backup.json`;
    link.click();
  };

  const importTasks = (jsonStr) => {
    try {
      const imported = JSON.parse(jsonStr);
      if (Array.isArray(imported)) {
        saveTasks(imported);
        toast.success('Protocol data synchronized');
      }
    } catch (err) {
      toast.error('Data integrity failure');
    }
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    reorderTasks,
    exportTasks,
    importTasks
  };
};

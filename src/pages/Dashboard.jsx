import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import {
  Plus,
  Search,
  Filter,
  LayoutGrid,
  CheckCircle2,
  Clock,
  TrendingUp,
  BarChart3,
  Calendar,
  AlertTriangle,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import StatCard from '../components/StatCard';
import Button from '../components/Button';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const { tasks, addTask, toggleTask, deleteTask, reorderTasks } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filter === 'all'
          ? true
          : filter === 'completed' ? t.completed : !t.completed;
        const matchesCategory = categoryFilter === 'all' ? true : t.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
      });
  }, [tasks, search, filter, categoryFilter]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, completionRate };
  }, [tasks]);

  const chartData = useMemo(() => {
    // Simulated productivity data based on existing tasks
    return [
      { name: 'Mon', value: 2 },
      { name: 'Tue', value: 5 },
      { name: 'Wed', value: 3 },
      { name: 'Thu', value: 8 },
      { name: 'Fri', value: stats.completed },
      { name: 'Sat', value: 0 },
      { name: 'Sun', value: 0 },
    ];
  }, [stats.completed]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    reorderTasks(result.source.index, result.destination.index);
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Operational <span className="text-blue-500 text-gradient">Dashboard</span>
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            Sector Seven Control / Mission Readiness: {stats.completionRate}%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Button onClick={() => setIsModalOpen(true)} className="gap-2 h-12 px-6">
            <Plus size={18} strokeWidth={3} /> New Mission
          </Button>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <StatCard title="Total Protocols" value={stats.total} icon={<Layers size={24} />} color="blue" trend={12} />
        <StatCard title="Active Missions" value={stats.pending} icon={<Clock size={24} />} color="amber" trend={-5} />
        <StatCard title="Completed" value={stats.completed} icon={<CheckCircle2 size={24} />} color="emerald" trend={24} />
        <StatCard title="Efficiency Rate" value={`${stats.completionRate}%`} icon={<TrendingUp size={24} />} color="purple" trend={8} />
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 p-4 rounded-[32px] glass-card border border-slate-200/50 dark:border-slate-800/50">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search protocols..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl outline-none focus:ring-2 ring-blue-500/50 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-slate-100/50 dark:bg-slate-800/50 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest outline-none border-none dark:text-white"
              >
                <option value="all">ALL STATUS</option>
                <option value="pending">PENDING</option>
                <option value="completed">COMPLETED</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-100/50 dark:bg-slate-800/50 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest outline-none border-none dark:text-white"
              >
                <option value="all">ALL CATEGORIES</option>
                <option value="Work">WORK</option>
                <option value="Personal">PERSONAL</option>
                <option value="Health">HEALTH</option>
                <option value="Project">PROJECT</option>
              </select>
            </div>
          </div>

          {/* Task List */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[400px]"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((task, index) => (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                        >
                          <TaskCard
                            task={task}
                            index={index}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                          />
                        </motion.div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="h-20 w-20 rounded-[30px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 text-slate-400">
                          <Search size={40} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">No Protocols Found</h3>
                        <p className="text-slate-500 font-medium">Try adjusting your filters or initialize a new mission.</p>
                      </div>
                    )}
                  </AnimatePresence>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="p-8 rounded-[40px] border border-slate-200/50 bg-white/50 dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md shadow-sm">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Productivity</h3>
               <BarChart3 className="text-blue-500" size={20} />
             </div>

             <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: 'none',
                        borderRadius: '16px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        color: '#fff'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
             </div>

             <div className="mt-8 space-y-4">
               <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                 <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-blue-500">Peak Performance</p>
                   <p className="text-sm font-bold text-slate-900 dark:text-white">Thursday Sessions</p>
                 </div>
                 <ArrowUpRight className="text-blue-500" size={18} />
               </div>
             </div>
          </div>

          <div className="p-8 rounded-[40px] border border-slate-200/50 bg-linear-to-br from-blue-600 to-purple-700 text-white shadow-xl shadow-blue-500/20">
             <h3 className="text-xl font-black uppercase tracking-tight">Mission Update</h3>
             <p className="mt-2 text-blue-100 font-medium">Keep pushing your limits. Productivity is an operational imperative.</p>
             <Button variant="secondary" className="mt-6 w-full text-blue-600">Upgrade Protocol</Button>
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTask}
      />
    </div>
  );
};

export default Dashboard;

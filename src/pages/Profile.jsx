import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  ShieldCheck,
  LogOut,
  Download,
  Upload,
  Lock,
  UserCircle2,
  Database,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, logout, changePassword } = useAuth();
  const { tasks, exportTasks, importTasks } = useTasks();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        importTasks(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Session Terminated. Agent Disconnected.');
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Side - User Info */}
        <div className="lg:w-1/3 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-[48px] border border-slate-200/50 bg-white/50 p-10 text-center dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-2xl"
          >
            <div className="relative mx-auto h-24 w-24">
              <div className="flex h-24 w-24 items-center justify-center rounded-[32px] bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-xl shadow-blue-500/20">
                <UserCircle2 size={48} strokeWidth={2.5} />
              </div>
              <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                <ShieldCheck size={16} />
              </div>
            </div>

            <h2 className="mt-8 text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter line-clamp-1">{user?.name || 'Agent Zero'}</h2>
            <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{user?.email}</p>

            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">
                <span>Active Protocols</span>
                <span className="text-blue-500">{tasks.length}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">
                <span>Clearance Level</span>
                <span className="text-purple-500">Tier 1 Agent</span>
              </div>
            </div>
          </motion.div>

          <Button
            variant="danger"
            onClick={() => setShowLogoutModal(true)}
            className="w-full h-16 rounded-[32px] gap-3 text-white bg-red-500 hover:bg-red-600 shadow-xl shadow-red-500/20"
          >
            <LogOut size={20} /> Terminate Session
          </Button>
        </div>

        {/* Right Side - Settings */}
        <div className="lg:w-2/3 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="overflow-hidden rounded-[48px] border border-slate-200/50 bg-white/50 p-12 dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-2xl"
          >
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-10 flex items-center gap-3">
              <Database size={24} className="text-blue-500" /> Data Management
            </h3>

            <div className="grid gap-6">
              <div className="group flex items-center justify-between p-6 rounded-3xl border-2 border-slate-100 bg-slate-50/50 hover:border-blue-500 transition-all dark:border-slate-800 dark:bg-slate-800/50">
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">Export Protocols</h4>
                  <p className="text-xs font-medium text-slate-500">Save your mission data for offline storage.</p>
                </div>
                <Button onClick={exportTasks} variant="secondary" className="gap-2 h-12 shadow-sm">
                  <Download size={18} /> Export JSON
                </Button>
              </div>

              <div className="group relative flex items-center justify-between p-6 rounded-3xl border-2 border-slate-100 bg-slate-50/50 hover:border-purple-500 transition-all dark:border-slate-800 dark:bg-slate-800/50">
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">Import Protocols</h4>
                  <p className="text-xs font-medium text-slate-500">Synchronize data from a backup source.</p>
                </div>
                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Button variant="secondary" className="gap-2 h-12 shadow-sm pointer-events-none">
                    <Upload size={18} /> Import JSON
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="overflow-hidden rounded-[48px] border border-slate-200/50 bg-white/50 p-12 dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-2xl"
          >
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-10 flex items-center gap-3">
              <Lock size={24} className="text-purple-500" /> Security Override
            </h3>

            <div className="space-y-6">
               <div className="flex items-center justify-between p-4 px-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-amber-600">
                 <div className="flex items-center gap-3">
                    <ShieldAlert size={20} />
                    <p className="text-xs font-black uppercase tracking-widest">Protocol Reset Available</p>
                 </div>
                 <Button variant="ghost" className="text-amber-600 hover:bg-amber-500/10 text-[10px] h-8 px-3">
                   Configure
                 </Button>
               </div>

               <Button
                onClick={() => toast('Security module under development')}
                className="w-full h-14 gap-2"
               >
                 <ArrowRight size={20} /> Advanced Security Settings
               </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setShowLogoutModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-sm overflow-hidden rounded-[40px] border border-slate-200 bg-white p-10 text-center shadow-2xl dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
              <ShieldAlert size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Terminate Protocol?</h3>
            <p className="mt-4 text-sm font-medium text-slate-500 leading-relaxed">
              Are you sure you want to decommission the current session? Unsaved data protocols may be lost.
            </p>
            <div className="mt-10 flex gap-4">
              <Button variant="secondary" onClick={() => setShowLogoutModal(false)} className="flex-1">Cancel</Button>
              <Button variant="danger" onClick={handleLogout} className="flex-1">Terminate</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile;

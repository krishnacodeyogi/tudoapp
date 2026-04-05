import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ShieldCheck, ArrowRight, UserPlus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email);
      toast.success('Access Granted. Welcome back.');
      navigate('/dashboard');
    } else {
      toast.error('Authentication failure. Field required.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md space-y-12 overflow-hidden rounded-[48px] border border-slate-200/50 bg-white/50 p-12 dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-2xl"
      >
        <div className="text-center">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-[24px] bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-xl shadow-blue-500/30"
          >
            <ShieldCheck size={32} strokeWidth={2.5} />
          </motion.div>
          <h2 className="mt-8 text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Access <span className="text-blue-500">TaskMaster</span>
          </h2>
          <p className="mt-3 text-sm font-black uppercase tracking-widest text-slate-500">
            Secure Mission Control Interface
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">
              <Mail size={14} strokeWidth={2.5} /> Operational Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border-2 border-slate-100 bg-slate-100/50 px-5 py-4 font-bold text-slate-900 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-white dark:focus:border-blue-500"
              placeholder="agent@taskmaster.io"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">
              <Lock size={14} strokeWidth={2.5} /> Security Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border-2 border-slate-100 bg-slate-100/50 px-5 py-4 font-bold text-slate-900 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-white dark:focus:border-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="h-4 w-4 rounded border-slate-300 bg-slate-100 text-blue-500 transition-all dark:border-slate-700 dark:bg-slate-800" />
              <label htmlFor="remember" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Persistent Session</label>
            </div>
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-600">Recovery Protocol</a>
          </div>

          <Button type="submit" className="w-full h-16 text-base gap-3">
            Initialize Access <LogIn size={20} />
          </Button>
        </form>

        <div className="text-center pt-6">
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            No operational ID?{' '}
            <Link to="/signup" className="text-blue-500 hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px] font-black ml-2 inline-flex items-center gap-1">
              Create Protocol <UserPlus size={12} strokeWidth={3} />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

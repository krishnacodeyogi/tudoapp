import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, ShieldCheck, ArrowRight, LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password && formData.password === formData.confirmPassword) {
      signup(formData.email);
      toast.success('Protocol Initialized. Welcome agent.');
      navigate('/dashboard');
    } else if (formData.password !== formData.confirmPassword) {
      toast.error('Data integrity failure. Passwords must match.');
    } else {
      toast.error('Initialization failure. Field required.');
    }
  };

  const inputClass = "w-full rounded-2xl border-2 border-slate-100 bg-slate-100/50 px-5 py-4 font-bold text-slate-900 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-white dark:focus:border-blue-500";
  const labelClass = "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 px-2";

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md space-y-12 overflow-hidden rounded-[48px] border border-slate-200/50 bg-white/50 p-12 dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-2xl"
      >
        <div className="text-center">
          <motion.div
            initial={{ rotate: 10 }}
            animate={{ rotate: 0 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-[24px] bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-xl shadow-blue-500/30"
          >
            <UserPlus size={32} strokeWidth={2.5} />
          </motion.div>
          <h2 className="mt-8 text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Initialize <span className="text-blue-500">Protocol</span>
          </h2>
          <p className="mt-3 text-sm font-black uppercase tracking-widest text-slate-500">
            Create Operational TaskMaster ID
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className={labelClass}>
              <User size={14} strokeWidth={2.5} /> Agent Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
              placeholder="Agent Zero"
              required
            />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>
              <Mail size={14} strokeWidth={2.5} /> Operational Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
              placeholder="agent@taskmaster.io"
              required
            />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>
              <Lock size={14} strokeWidth={2.5} /> Security Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={inputClass}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>
              <ShieldCheck size={14} strokeWidth={2.5} /> Confirm Protocol
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={inputClass}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full h-16 text-base gap-3">
            Initialize Protocol <ArrowRight size={20} />
          </Button>
        </form>

        <div className="text-center pt-6">
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            Already registered?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px] font-black ml-2 inline-flex items-center gap-1">
              Access Interface <LogIn size={12} strokeWidth={3} />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;

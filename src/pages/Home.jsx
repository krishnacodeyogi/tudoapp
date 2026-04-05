import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, Layout, Rocket, Shield, Cpu, Target } from 'lucide-react';
import Button from '../components/Button';

const Home = () => {
  return (
    <div className="relative overflow-hidden pt-20">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/10 bg-blue-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-blue-500 backdrop-blur-sm"
          >
            <Sparkles size={12} strokeWidth={3} />
            <span>Productivity Redefined</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-5xl font-black tracking-tight text-slate-900 sm:text-8xl dark:text-white uppercase leading-[0.9] text-balance"
          >
            Organize Your Life with{' '}
            <span className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">TaskMaster</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-10 max-w-2xl text-lg font-bold text-slate-600 dark:text-slate-400 text-balance"
          >
            The simple and powerful todo app designed to help you stay focused,
            be more productive, and achieve your goals faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/dashboard">
              <Button size="lg" className="h-16 gap-3 px-10 text-base shadow-2xl shadow-blue-500/30">
                Get Started Now <ArrowRight size={20} strokeWidth={3} />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="mt-32 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <Shield className="text-blue-500" size={32} strokeWidth={2.5} />,
              title: 'Secure & Private',
              description: 'Your task protocols are encrypted and synchronized locally within your operational ecosystem.'
            },
            {
              icon: <Cpu className="text-purple-500" size={32} strokeWidth={2.5} />,
              title: 'Elite Interface',
              description: 'Focus on what matters most with our glassmorphic, high-performance command center.'
            },
            {
              icon: <Target className="text-emerald-500" size={32} strokeWidth={2.5} />,
              title: 'Goal Oriented',
              description: 'Track your efficiency and completion trends with advanced mission data visualization.'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-[40px] border border-slate-200/50 bg-white/50 p-10 transition-all hover:-translate-y-2 dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md shadow-sm"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-[30px] bg-white dark:bg-slate-950 shadow-xl group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="mt-8 text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{feature.title}</h3>
              <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Orbs */}
      <div className="absolute top-0 -left-64 -z-10 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-600/5" />
      <div className="absolute bottom-0 -right-64 -z-10 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[120px] dark:bg-purple-600/5" />
    </div>
  );
};

export default Home;

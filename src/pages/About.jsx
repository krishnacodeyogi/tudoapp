import { motion } from 'framer-motion';
import { Mail, Heart, Shield, Code, Cpu, Target, Layers } from 'lucide-react';

const About = () => {
  return (
    <div className="relative pt-20">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/10 bg-blue-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-blue-500 mb-8 backdrop-blur-sm"
          >
            <Shield size={12} strokeWidth={3} />
            <span>Operational Intelligence Protocol</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-slate-900 dark:text-white sm:text-7xl uppercase tracking-tighter leading-[0.9]"
          >
            About <span className="text-blue-500 text-gradient">TaskMaster</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-10 text-xl text-slate-600 dark:text-slate-400 font-bold leading-relaxed text-balance"
          >
            TaskMaster is an elite mission management protocol engineered for high-performance
            individuals and tactical project coordination.
          </motion.p>
        </div>

        <div className="mt-32 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[48px] glass border border-white/20 dark:border-slate-800/20 p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-blue-500/10 text-blue-500 shadow-xl shadow-blue-500/5">
              <Target size={32} strokeWidth={2.5} />
            </div>
            <h3 className="mt-10 text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Our Protocol</h3>
            <p className="mt-6 text-slate-600 dark:text-slate-400 font-bold leading-relaxed">
              We provide the most streamlined, high-performance task management ecosystem
              available. Our interface is meticulously designed to eliminate cognitive
              friction and maximize mission success through visualization and reordering.
            </p>
            <div className="absolute top-0 right-0 p-8 opacity-[0.05]">
               <Layers size={120} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[48px] glass border border-white/20 dark:border-slate-800/20 p-12 shadow-2xl relative overflow-hidden"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-purple-500/10 text-purple-500 shadow-xl shadow-purple-500/5">
              <Cpu size={32} strokeWidth={2.5} />
            </div>
            <h3 className="mt-10 text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Advanced Stack</h3>
            <p className="mt-6 text-slate-600 dark:text-slate-400 font-bold leading-relaxed">
              Leveraging React 19, Tailwind CSS v4, and Realtime persistence.
              TaskMaster is a cloud-ready, lightning-fast application designed for
              next-generation operational workflows.
            </p>
            <div className="absolute top-0 right-0 p-8 opacity-[0.05]">
               <Code size={120} />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 overflow-hidden rounded-[64px] border border-slate-200 bg-white/50 p-16 text-center dark:border-slate-800 dark:bg-slate-900/50 backdrop-blur-xl shadow-2xl relative"
        >
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[36px] bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-2xl shadow-blue-500/40 animate-pulse">
            <Code size={48} strokeWidth={2.5} />
          </div>
          <h3 className="mt-10 text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Engineered by Himanshu</h3>
          <p className="mt-4 text-slate-600 dark:text-slate-400 font-black uppercase tracking-[0.3em] text-xs">
            Lead Software Architect / Interface Specialist
          </p>

          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-10">
            <a href="mailto:himanshu@example.com" className="group flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-all">
              <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Mail size={24} />
              </div>
              <span className="font-black uppercase tracking-widest text-[10px]">Secure Channel</span>
            </a>
            <div className="flex items-center gap-3 text-slate-400">
               <div className="flex flex-col items-end">
                  <span className="font-black uppercase tracking-widest text-[10px]">Built with</span>
                  <span className="font-bold text-[8px] text-red-500/60">INTELLIGENCE</span>
               </div>
               <div className="h-12 w-12 rounded-2xl bg-red-500/5 flex items-center justify-center">
                 <Heart size={24} className="fill-red-500 text-red-500 animate-pulse" />
               </div>
            </div>
          </div>

          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[100px] -z-10" />
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px] -z-10" />
        </motion.div>
      </div>
    </div>
  );
};

export default About;

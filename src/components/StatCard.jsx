import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const StatCard = ({ title, value, icon, trend, color }) => {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-[32px] border border-slate-200/50 bg-white/50 p-6 dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className={cn(
          'flex h-12 w-12 items-center justify-center rounded-2xl border-2 transition-all',
          colors[color] || colors.blue
        )}>
          {icon}
        </div>
        {trend && (
          <span className={cn(
            'text-[10px] font-black uppercase tracking-widest',
            trend > 0 ? 'text-emerald-500' : 'text-slate-400'
          )}>
            {trend > 0 ? `+${trend}%` : trend} Efficiency
          </span>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">
          {title}
        </h3>
        <p className="mt-1 text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
          {value}
        </p>
      </div>

      <div className={cn(
        'absolute -bottom-6 -right-6 h-24 w-24 rounded-full opacity-[0.03] blur-2xl',
        color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
      )} />
    </motion.div>
  );
};

export default StatCard;

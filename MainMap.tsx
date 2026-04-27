import { RegionalPotential } from '@/src/types';
import { motion } from 'motion/react';
import { MapPin, Info } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface MainMapProps {
  data: RegionalPotential[];
}

export default function MainMap({ data }: MainMapProps) {
  return (
    <div className="relative w-full h-full bg-slate-50 rounded border border-slate-100 overflow-hidden">
      {/* Map Grid Background */}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.3 }} />
      
      {/* Stylized Region Shapes Mockup */}
      <svg className="absolute inset-0 w-full h-full p-8 opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M20,30 L60,10 L90,40 L70,85 L30,80 L10,50 Z"
          fill="rgba(59, 130, 246, 0.05)"
          stroke="#3b82f6"
          strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
        <path d="M10,50 L40,40 L60,60" fill="none" stroke="#3b82f6" strokeWidth="0.1" strokeDasharray="1,1" />
      </svg>

      {/* Markers */}
      {data.map((item) => (
        <motion.div
          key={item.id}
          style={{ left: `${item.location.x}%`, top: `${item.location.y}%` }}
          className="absolute group -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
        >
          <div className="relative">
            <div className={cn("w-3 h-3 rounded-full border-2 border-white shadow-md", 
              item.type === 'agriculture' ? 'bg-emerald-400' : 
              item.type === 'tourism' ? 'bg-amber-400' : 'bg-blue-400')} />
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 p-2 bg-slate-900 text-white rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
             <div className="font-bold flex items-center justify-between">
                {item.name}
                <div className={cn("w-1.5 h-1.5 rounded-full", item.type === 'agriculture' ? 'bg-emerald-400' : 'bg-blue-400')} />
             </div>
             <div className="mt-1 opacity-70 truncate">{item.description}</div>
          </div>
        </motion.div>
      ))}

      {/* Legend Container */}
      <div className="absolute bottom-4 left-4 p-3 bg-white/80 backdrop-blur border border-slate-200 rounded shadow-sm">
        <div className="space-y-2">
          {[
            { label: 'Industri', color: 'bg-blue-400' },
            { label: 'Pertanian', color: 'bg-emerald-400' },
            { label: 'Logistik', color: 'bg-amber-400' }
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full", l.color)} />
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

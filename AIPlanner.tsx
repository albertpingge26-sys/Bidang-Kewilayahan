import { useState } from 'react';
import { BrainCircuit, Sparkles, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { RegionalPotential, InfrastructurePlan } from '@/src/types';
import { generateInfrastructurePlan } from '@/src/services/geminiService';
import { motion, AnimatePresence } from 'motion/react';

interface AIPlannerProps {
  data: RegionalPotential[];
}

export default function AIPlanner({ data }: AIPlannerProps) {
  const [plans, setPlans] = useState<InfrastructurePlan[]>([]);
  const [loading, setLoading] = useState(false);

  const startAnalysis = async () => {
    setLoading(true);
    const result = await generateInfrastructurePlan(data);
    setPlans(result);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="p-10 bg-slate-900 rounded-lg text-white relative overflow-hidden border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 bg-gradient-to-l from-blue-500 to-transparent" />
        <div className="relative z-10 max-w-2xl px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 border border-blue-500/20">
            <Sparkles className="w-3 h-3" />
            Strategic Intelligence Engine
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-4 italic font-serif">Analisis Strategis & Rekomendasi Wilayah</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10 opacity-90">
            Algoritma AI WilayahKita memproses data primer potensi ekonomi regional untuk menghasilkan peta jalan pembangunan infrastruktur yang berkelanjutan.
          </p>
          <button 
            onClick={startAnalysis}
            disabled={loading}
            className="flex items-center gap-3 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-blue-900/40 uppercase text-xs tracking-widest"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <BrainCircuit className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            )}
            {loading ? 'Processing Data...' : 'Generate Strategic Recommendations'}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-slate-200/50 border border-slate-200 rounded animate-pulse" />
            ))}
          </motion.div>
        ) : plans.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {plans.map((plan, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-xl transition-all group flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-slate-50 rounded-full opacity-50 group-hover:bg-blue-50 transition-colors" />
                
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border ${
                    plan.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 
                    plan.priority === 'Medium' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                    'bg-slate-50 text-slate-500 border-slate-100'
                  }`}>
                    {plan.priority} Priority
                  </span>
                  <div className="text-[10px] font-bold text-slate-300 italic">#{i + 1}</div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10">{plan.projectName}</h3>
                <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mb-6 relative z-10">{plan.type}</p>
                
                <p className="text-sm text-slate-600 leading-relaxed mb-10 flex-1 relative z-10 font-medium">
                  "{plan.rationale}"
                </p>
                
                <div className="pt-6 border-t border-slate-50 mt-auto relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Target Impact</p>
                      <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{plan.estimatedImpact}</p>
                    </div>
                    <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs italic">
                        {plan.projectName.charAt(0)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-24 text-center bg-white rounded-lg border-2 border-dashed border-slate-200">
            <div className="inline-flex items-center justify-center p-6 bg-slate-50 rounded-full mb-6">
              <BrainCircuit className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight italic">Engine Standby</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mt-3 font-medium">
              Sistem siap menganalisis. Tekan tombol generate untuk memulai pemrosesan algoritma perencanaan wilayah.
            </p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

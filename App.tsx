import { useState } from 'react';
import Sidebar from './Sidebar';
import StatsGrid from './StatsGrid';
import MainMap from './MainMap';
import RegionalDataLedger from './RegionalDataLedger';
import AIPlanner from './components/AIPlanner';
import { INITIAL_DATA, RegionalPotential } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState<RegionalPotential[]>(INITIAL_DATA);

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-800 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between flex-shrink-0">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            {activeTab === 'dashboard' && 'Optimalisasi Pengelolaan Data Potensi Wilayah'}
            {activeTab === 'map' && 'Visualisasi Geospasial Geometris'}
            {activeTab === 'data' && 'Database Potensi Wilayah Terpusat'}
            {activeTab === 'ai' && 'Strategic Planning Engine'}
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-500 font-medium hidden md:block tracking-tight">Tahun Anggaran: 2024/2025</span>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-slate-500 text-xs shadow-inner">
              AD
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <StatsGrid />
                  
                  <div className="grid grid-cols-12 gap-6">
                    {/* Main Visual */}
                    <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col min-h-[500px]">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-slate-900">Visualisasi Klaster Potensi</h2>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-slate-100 text-[10px] font-bold uppercase tracking-wider rounded border border-slate-200 hover:bg-slate-200 transition-colors">Klaster</button>
                          <button className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider rounded border border-blue-700 shadow-sm">Zonasi</button>
                        </div>
                      </div>
                      <div className="flex-1 min-h-0">
                        <MainMap data={data} />
                      </div>
                    </div>

                    {/* Right Side Detail */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                      <div className="flex-1 bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                        <h2 className="font-bold mb-6 text-sm flex items-center gap-2 italic">
                          <span className="w-1 h-4 bg-blue-600"></span>
                          Prioritas Infrastruktur
                        </h2>
                        <div className="space-y-4">
                          {[
                            { id: '01', title: 'Jalan Arteri Lingkar Timur', status: 'LELANG', color: 'text-slate-400' },
                            { id: '02', title: 'Waduk Serbaguna Hulu', status: 'PRA-FS', color: 'text-slate-400' },
                            { id: '03', title: 'Jaringan Serat Optik Pedesaan', status: 'KONSTRUKSI', color: 'text-emerald-500' },
                            { id: '04', title: 'Pasar Induk Terintegrasi', status: 'MAPPING', color: 'text-slate-400' }
                          ].map((item) => (
                            <div key={item.id} className="flex items-center gap-4 border-b border-slate-50 pb-4 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer group">
                              <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center font-bold text-slate-500 text-sm group-hover:bg-slate-200 transition-colors italic">
                                {item.id}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-slate-800">{item.title}</div>
                                <div className={cn("text-[10px] uppercase font-bold tracking-widest mt-0.5", item.color)}>
                                  Status: {item.status}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="h-40 bg-slate-900 rounded-lg p-5 text-white flex flex-col justify-between shadow-lg shadow-slate-900/10">
                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Ringkasan Rekomendasi</h3>
                        <p className="text-xs leading-relaxed opacity-80 font-medium">
                          Berdasarkan data potensi terbaru, fokus pembangunan diarahkan pada peningkatan konektivitas wilayah Barat untuk menunjang distribusi sektor agrikultur.
                        </p>
                        <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 rounded text-[10px] font-bold tracking-wider uppercase transition-all">UNDUH LAPORAN (PDF)</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'map' && (
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm min-h-[600px] flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-bold text-lg italic">Distribusi Geospasial Agregat</h2>
                    <div className="flex gap-4">
                      {['Agriculture', 'Tourism', 'Industry'].map(t => (
                        <div key={t} className="flex items-center gap-2">
                          <div className={cn("w-2 h-2 rounded-full", t === 'Agriculture' ? 'bg-emerald-400' : t === 'Tourism' ? 'bg-amber-400' : 'bg-blue-400')} />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <MainMap data={data} />
                  </div>
                </div>
              )}

              {activeTab === 'data' && (
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                   <RegionalDataLedger data={data} />
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="bg-slate-100">
                  <AIPlanner data={data} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

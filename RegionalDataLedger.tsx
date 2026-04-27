import { RegionalPotential } from '@/src/types';
import { Plus, Search, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface DataLedgerProps {
  data: RegionalPotential[];
}

export default function RegionalDataLedger({ data }: DataLedgerProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white sticky top-0 z-10">
        <div>
          <h2 className="text-lg font-bold text-slate-800 italic flex items-center gap-2">
            <span className="w-1 h-4 bg-blue-600"></span>
            Ledger Potensi & Aset Wilayah
          </h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Sistem Inventarisasi Terpusat v1.2</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Filter data..." 
              className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500/50 w-48 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-all shadow-sm shadow-blue-900/20">
            <Plus className="w-3.5 h-3.5" />
            Add Entry
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100 italic">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identitas Aset</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sektor</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kapasitas Produksi</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Analisis Deskriptif</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono font-bold tracking-tighter uppercase mt-0.5">REG-{item.id}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border", 
                    item.type === 'agriculture' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                    item.type === 'tourism' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                    'bg-blue-50 text-blue-700 border-blue-100'
                  )}>
                    {item.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-600 font-bold italic">{item.capacity}</td>
                <td className="px-6 py-4">
                  <p className="text-xs text-slate-500 line-clamp-1 max-w-xs font-medium">{item.description}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-white border hover:border-blue-100 rounded transition-all">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-white border hover:border-red-100 rounded transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

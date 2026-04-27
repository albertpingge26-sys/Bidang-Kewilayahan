import { TrendingUp, Users, Factory, MapPin } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function StatsGrid() {
  const stats = [
    { label: 'Luas Area Terpetakan', value: '1.240,5', icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-50', unit: 'km²' },
    { label: 'Proyek Infrastruktur', value: '42', icon: Factory, color: 'text-slate-600', bg: 'bg-slate-100', detail: '+5 Aktif' },
    { label: 'Indeks Konektivitas', value: '0.84', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', detail: 'High' },
    { label: 'Skor Potensi Ekonomi', value: '78.2', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50', detail: '/ 100' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
            <div className={cn("p-1.5 rounded", stat.bg)}>
              <stat.icon className={cn("w-4 h-4", stat.color)} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">{stat.value}</h3>
            {stat.unit && <span className="text-xs text-slate-500 font-medium">{stat.unit}</span>}
            {stat.detail && <span className={cn("text-xs font-bold", stat.color.includes('emerald') ? 'text-emerald-600' : 'text-slate-500')}>{stat.detail}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

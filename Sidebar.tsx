import { LayoutDashboard, Map as MapIcon, Database, BrainCircuit, Settings, LogOut } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const items = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'map', icon: MapIcon, label: 'Pemetaan Wilayah' },
    { id: 'data', icon: Database, label: 'Potensi & Aset' },
    { id: 'ai', icon: BrainCircuit, label: 'Analisis AI' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-400 flex flex-col h-screen sticky top-0 border-r border-slate-800">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">W</div>
        <span className="text-white font-semibold tracking-tight uppercase">WilayahKita</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
              activeTab === item.id
                ? "bg-slate-800 text-white shadow-sm"
                : "hover:bg-slate-800 hover:text-slate-200"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-blue-500" : "text-slate-500")} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-6 mt-auto border-t border-slate-800 text-[10px] font-bold uppercase tracking-widest flex justify-between items-center">
        <span>v1.2.0 Stable</span>
        <span className="text-emerald-500">● Online</span>
      </div>
    </aside>
  );
}

export type PotentialType = 'agriculture' | 'tourism' | 'industry' | 'resource' | 'social';

export interface RegionalPotential {
  id: string;
  name: string;
  type: PotentialType;
  capacity: string;
  location: { x: number; y: number };
  description: string;
}

export interface InfrastructurePlan {
  projectName: string;
  type: string;
  priority: 'High' | 'Medium' | 'Low';
  rationale: string;
  estimatedImpact: string;
}

export const INITIAL_DATA: RegionalPotential[] = [
  {
    id: '1',
    name: 'Perkebunan Kopi Lereng Barat',
    type: 'agriculture',
    capacity: '500 Ton/Tahun',
    location: { x: 25, y: 30 },
    description: 'Kawasan perkebunan kopi robusta premium dengan potensi ekspor tinggi namun akses logistik masih terbatas.'
  },
  {
    id: '2',
    name: 'Wisata Bahari Pantai Kristal',
    type: 'tourism',
    capacity: '10k Turis/Bulan',
    location: { x: 70, y: 80 },
    description: 'Destinasi wisata baru dengan terumbu karang terjaga. Membutuhkan penguatan fasilitas sanitasi dan listrik.'
  },
  {
    id: '3',
    name: 'Kawasan Industri Terpadu Utara',
    type: 'industry',
    capacity: 'Medium Scale',
    location: { x: 50, y: 15 },
    description: 'Lokasi strategis untuk pengolahan pasca panen. Membutuhkan pasokan air bersih yang stabil.'
  }
];

export interface Hotspot {
  id: string;
  name: string;
  hotspot_id: string;
  corridor: string;
  zone: string;
  basinElevation: string;
  altRoute: string;
  normalRoute: string;
  delayMin: number;
  lat: number;
  lon: number;
  description: string;
}

export const HOTSPOTS: Record<string, Hotspot> = {
  andheri: {
    id: 'andheri',
    name: 'Andheri Subway',
    hotspot_id: 'MUM_ANDHERI_04',
    corridor: 'S.V. Road Western Railway Underpass',
    zone: 'K/West Ward, Andheri West',
    basinElevation: '2.4m AMSL (Saucer Basin)',
    altRoute: 'Gokhale Bridge Flyover Bypass (ALT_FLYOVER_NAV_02)',
    normalRoute: 'S.V. Road Subway Direct Lane',
    delayMin: 3.5,
    lat: 19.1197,
    lon: 72.8468,
    description: 'Chronic rapid submergence zone connecting Andheri East & West below railway tracks.'
  },
  milan: {
    id: 'milan',
    name: 'Milan Subway',
    hotspot_id: 'MUM_MILAN_02',
    corridor: 'Santacruz Western Express Link',
    zone: 'H/West Ward, Santacruz West',
    basinElevation: '1.9m AMSL (Depression Cut)',
    altRoute: 'Milan Flyover Elevated Link (ALT_MILAN_FLY_01)',
    normalRoute: 'Milan Subway Low-Level Tunnel',
    delayMin: 4.2,
    lat: 19.0838,
    lon: 72.8395,
    description: 'Key arterial link between S.V. Road and Western Express Highway prone to monsoon pooling.'
  },
  kurla: {
    id: 'kurla',
    name: 'Kurla West',
    hotspot_id: 'MUM_KURLA_07',
    corridor: 'LBS Marg & Mithi River Basin',
    zone: 'L Ward, Kurla West',
    basinElevation: '1.2m AMSL (Tidal Overflow)',
    altRoute: 'BKC Elevated Link Connector (ALT_BKC_CONN_04)',
    normalRoute: 'LBS Marg Ground Corridor',
    delayMin: 6.0,
    lat: 19.0726,
    lon: 72.8798,
    description: 'High-risk low basin adjacent to Mithi River drainage outfall affected by high tide surges.'
  }
};

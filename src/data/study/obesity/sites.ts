import { SiteData } from '@/api/types';

export const obesitySites: SiteData[] = [
  // Spain sites - target: 2,000
  {
    id: 'ob-barcelona',
    name: 'Hospital Clínic de Barcelona',
    city: 'Barcelona',
    subdivision: 'Catalonia',
    country: 'Spain',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 387,
    dataQuality: 95,
    lastDataReceived: '2024-08-27T09:30:00Z',
    contactInfo: {
      email: 'obesidad@clinic.cat',
      phone: '+34-93-227-5400',
      principalInvestigator: 'Dr. Carmen Martinez'
    }
  },
  {
    id: 'ob-madrid',
    name: 'Hospital Universitario La Paz',
    city: 'Madrid',
    subdivision: 'Madrid',
    country: 'Spain',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 245,
    dataQuality: 92,
    lastDataReceived: '2024-08-27T11:15:00Z',
    contactInfo: {
      email: 'obesidad@salud.madrid.org',
      phone: '+34-91-727-7000',
      principalInvestigator: 'Dr. Roberto Sanchez'
    }
  },
  {
    id: 'ob-valencia',
    name: 'Hospital Universitario y Politécnico La Fe',
    city: 'Valencia',
    subdivision: 'Valencia',
    country: 'Spain',
    region: 'eu',
    status: 'active',
    healthStatus: 'warning',
    enrolledPatients: 128,
    dataQuality: 87,
    lastDataReceived: '2024-08-26T16:45:00Z',
    contactInfo: {
      email: 'obesidad@hospital-lafe.com',
      phone: '+34-96-124-4000',
      principalInvestigator: 'Dr. Ana Garcia'
    }
  },
  
  // Germany sites - target: 3,000
  {
    id: 'ob-berlin',
    name: 'Charité - Universitätsmedizin Berlin',
    city: 'Berlin',
    subdivision: 'Berlin',
    country: 'Germany',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 523,
    dataQuality: 91,
    lastDataReceived: '2024-08-27T08:15:00Z',
    contactInfo: {
      email: 'adipositas@charite.de',
      phone: '+49-30-450-50',
      principalInvestigator: 'Dr. Hans Weber'
    }
  },
  {
    id: 'ob-munich',
    name: 'Klinikum der Universität München',
    city: 'Munich',
    subdivision: 'Bavaria',
    country: 'Germany',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 467,
    dataQuality: 94,
    lastDataReceived: '2024-08-27T10:30:00Z',
    contactInfo: {
      email: 'adipositas@med.uni-muenchen.de',
      phone: '+49-89-4400-0',
      principalInvestigator: 'Dr. Klaus Schmidt'
    }
  },
  {
    id: 'ob-hamburg',
    name: 'Universitätsklinikum Hamburg-Eppendorf',
    city: 'Hamburg',
    subdivision: 'Hamburg',
    country: 'Germany',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 312,
    dataQuality: 89,
    lastDataReceived: '2024-08-27T09:00:00Z',
    contactInfo: {
      email: 'adipositas@uke.de',
      phone: '+49-40-7410-0',
      principalInvestigator: 'Dr. Petra Mueller'
    }
  },
  {
    id: 'ob-cologne',
    name: 'Universitätsklinikum Köln',
    city: 'Cologne',
    subdivision: 'North Rhine-Westphalia',
    country: 'Germany',
    region: 'eu',
    status: 'onboarding',
    healthStatus: 'warning',
    enrolledPatients: 89,
    dataQuality: 82,
    lastDataReceived: '2024-08-25T14:20:00Z',
    contactInfo: {
      email: 'adipositas@uk-koeln.de',
      phone: '+49-221-478-0',
      principalInvestigator: 'Dr. Michael Fischer'
    }
  },
  
  // France sites - target: 2,500
  {
    id: 'ob-paris',
    name: 'Hôpital de la Pitié-Salpêtrière',
    city: 'Paris',
    subdivision: 'Île-de-France',
    country: 'France',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 445,
    dataQuality: 93,
    lastDataReceived: '2024-08-27T10:45:00Z',
    contactInfo: {
      email: 'obesite@psl.aphp.fr',
      phone: '+33-1-42-16-00-00',
      principalInvestigator: 'Dr. Marie Dubois'
    }
  },
  {
    id: 'ob-lyon',
    name: 'Hospices Civils de Lyon',
    city: 'Lyon',
    subdivision: 'Auvergne-Rhône-Alpes',
    country: 'France',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 356,
    dataQuality: 91,
    lastDataReceived: '2024-08-27T09:20:00Z',
    contactInfo: {
      email: 'obesite@chu-lyon.fr',
      phone: '+33-4-72-11-73-11',
      principalInvestigator: 'Dr. Pierre Leclerc'
    }
  },
  {
    id: 'ob-marseille',
    name: 'Assistance Publique - Hôpitaux de Marseille',
    city: 'Marseille',
    subdivision: 'Provence-Alpes-Côte d\'Azur',
    country: 'France',
    region: 'eu',
    status: 'active',
    healthStatus: 'warning',
    enrolledPatients: 234,
    dataQuality: 85,
    lastDataReceived: '2024-08-26T15:30:00Z',
    contactInfo: {
      email: 'obesite@ap-hm.fr',
      phone: '+33-4-91-38-60-00',
      principalInvestigator: 'Dr. Sophie Martin'
    }
  },
  
  // Switzerland sites - target: 1,000
  {
    id: 'ob-zurich',
    name: 'University Hospital Zurich',
    city: 'Zurich',
    subdivision: 'Zurich',
    country: 'Switzerland',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 398,
    dataQuality: 96,
    lastDataReceived: '2024-08-27T11:20:00Z',
    contactInfo: {
      email: 'obesity@usz.ch',
      phone: '+41-44-255-11-11',
      principalInvestigator: 'Dr. Anna Müller'
    }
  },
  {
    id: 'ob-geneva',
    name: 'Hôpitaux Universitaires de Genève',
    city: 'Geneva',
    subdivision: 'Geneva',
    country: 'Switzerland',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 312,
    dataQuality: 94,
    lastDataReceived: '2024-08-27T08:45:00Z',
    contactInfo: {
      email: 'obesite@hug.ch',
      phone: '+41-22-372-33-11',
      principalInvestigator: 'Dr. Claude Dubois'
    }
  },
  
  // Italy sites - target: 1,500
  {
    id: 'ob-milan',
    name: 'IRCCS San Raffaele',
    city: 'Milan',
    subdivision: 'Lombardy',
    country: 'Italy',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 289,
    dataQuality: 91,
    lastDataReceived: '2024-08-27T07:30:00Z',
    contactInfo: {
      email: 'obesity@hsr.it',
      phone: '+39-02-2643-1',
      principalInvestigator: 'Dr. Giuseppe Rossi'
    }
  },
  {
    id: 'ob-rome',
    name: 'Policlinico Universitario Agostino Gemelli',
    city: 'Rome',
    subdivision: 'Lazio',
    country: 'Italy',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 267,
    dataQuality: 90,
    lastDataReceived: '2024-08-27T12:15:00Z',
    contactInfo: {
      email: 'obesita@policlinicogemelli.it',
      phone: '+39-06-30154-1',
      principalInvestigator: 'Dr. Lucia Ferrari'
    }
  },
  {
    id: 'ob-naples',
    name: 'Azienda Ospedaliera Universitaria Federico II',
    city: 'Naples',
    subdivision: 'Campania',
    country: 'Italy',
    region: 'eu',
    status: 'onboarding',
    healthStatus: 'warning',
    enrolledPatients: 78,
    dataQuality: 83,
    lastDataReceived: '2024-08-25T16:00:00Z',
    contactInfo: {
      email: 'obesita@unina.it',
      phone: '+39-081-746-1111',
      principalInvestigator: 'Dr. Marco Romano'
    }
  }
];
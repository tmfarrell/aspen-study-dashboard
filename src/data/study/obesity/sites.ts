import { SiteData } from '@/api/types';

export const obesitySites: SiteData[] = [
  {
    id: 'ob-barcelona',
    name: 'Hospital Clínic de Barcelona',
    city: 'Barcelona',
    subdivision: 'Catalonia',
    country: 'Spain',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 456,
    dataQuality: 95,
    lastDataReceived: '2024-08-27T09:30:00Z',
    contactInfo: {
      email: 'obesidad@clinic.cat',
      phone: '+34-93-227-5400',
      principalInvestigator: 'Dr. Carmen Martinez'
    }
  },
  {
    id: 'ob-berlin',
    name: 'Charité - Universitätsmedizin Berlin',
    city: 'Berlin',
    subdivision: 'Berlin',
    country: 'Germany',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 389,
    dataQuality: 91,
    lastDataReceived: '2024-08-27T08:15:00Z',
    contactInfo: {
      email: 'adipositas@charite.de',
      phone: '+49-30-450-50',
      principalInvestigator: 'Dr. Hans Weber'
    }
  },
  {
    id: 'ob-zurich',
    name: 'University Hospital Zurich',
    city: 'Zurich',
    subdivision: 'Zurich',
    country: 'Switzerland',
    region: 'eu',
    status: 'active',
    healthStatus: 'warning',
    enrolledPatients: 267,
    dataQuality: 87,
    lastDataReceived: '2024-08-26T14:20:00Z',
    contactInfo: {
      email: 'obesity@usz.ch',
      phone: '+41-44-255-11-11',
      principalInvestigator: 'Dr. Anna Müller'
    }
  },
  {
    id: 'ob-paris',
    name: 'Hôpital de la Pitié-Salpêtrière',
    city: 'Paris',
    subdivision: 'Île-de-France',
    country: 'France',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 334,
    dataQuality: 93,
    lastDataReceived: '2024-08-27T10:45:00Z',
    contactInfo: {
      email: 'obesite@psl.aphp.fr',
      phone: '+33-1-42-16-00-00',
      principalInvestigator: 'Dr. Marie Dubois'
    }
  },
  {
    id: 'ob-milan',
    name: 'IRCCS San Raffaele',
    city: 'Milan',
    subdivision: 'Lombardy',
    country: 'Italy',
    region: 'eu',
    status: 'onboarding',
    healthStatus: 'warning',
    enrolledPatients: 145,
    dataQuality: 84,
    lastDataReceived: '2024-08-25T16:00:00Z',
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
    enrolledPatients: 298,
    dataQuality: 90,
    lastDataReceived: '2024-08-27T07:30:00Z',
    contactInfo: {
      email: 'obesita@policlinicogemelli.it',
      phone: '+39-06-30154-1',
      principalInvestigator: 'Dr. Lucia Ferrari'
    }
  }
];
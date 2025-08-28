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
    targetEnrollment: 600,
    dataQuality: 95,
    lastDataReceived: '2024-08-27T09:30:00Z',
    contactInfo: {
      email: 'obesidad@clinic.cat',
      phone: '+34-93-227-5400',
      principalInvestigator: 'Dr. Carmen Martinez'
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
    enrolledPatients: 389,
    targetEnrollment: 500,
    dataQuality: 91,
    lastDataReceived: '2024-08-27T08:15:00Z',
    contactInfo: {
      email: 'adipositas@med.uni-muenchen.de',
      phone: '+49-89-4400-0',
      principalInvestigator: 'Dr. Klaus Weber'
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
    healthStatus: 'warning',
    enrolledPatients: 267,
    targetEnrollment: 450,
    dataQuality: 87,
    lastDataReceived: '2024-08-26T14:20:00Z',
    contactInfo: {
      email: 'obesite@chu-lyon.fr',
      phone: '+33-4-72-11-69-11',
      principalInvestigator: 'Dr. Sophie Laurent'
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
    enrolledPatients: 334,
    targetEnrollment: 450,
    dataQuality: 93,
    lastDataReceived: '2024-08-27T10:45:00Z',
    contactInfo: {
      email: 'obesita@policlinicogemelli.it',
      phone: '+39-06-3015-1',
      principalInvestigator: 'Dr. Marco Bianchi'
    }
  },
  {
    id: 'ob-london',
    name: "King's College Hospital",
    city: 'London',
    subdivision: 'Greater London',
    country: 'United Kingdom',
    region: 'eu',
    status: 'onboarding',
    healthStatus: 'warning',
    enrolledPatients: 145,
    targetEnrollment: 400,
    dataQuality: 84,
    lastDataReceived: '2024-08-25T16:00:00Z',
    contactInfo: {
      email: 'obesity.research@nhs.net',
      phone: '+44-20-3299-9000',
      principalInvestigator: 'Dr. Catherine Brown'
    }
  },
  {
    id: 'ob-madrid',
    name: 'Hospital Universitario 12 de Octubre',
    city: 'Madrid',
    subdivision: 'Community of Madrid',
    country: 'Spain',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 298,
    targetEnrollment: 400,
    dataQuality: 90,
    lastDataReceived: '2024-08-27T07:30:00Z',
    contactInfo: {
      email: 'obesidad@h12o.es',
      phone: '+34-91-390-8000',
      principalInvestigator: 'Dr. Fernando Garcia'
    }
  }
];
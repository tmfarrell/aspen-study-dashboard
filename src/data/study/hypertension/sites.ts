import { SiteData } from '@/api/types';

export const hypertensionSites: SiteData[] = [
  {
    id: 'ht-emory',
    name: 'Emory University Hospital',
    city: 'Atlanta',
    subdivision: 'Georgia',
    country: 'United States',
    region: 'us',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 378,
    dataQuality: 94,
    lastDataReceived: '2024-08-27T09:00:00Z',
    contactInfo: {
      email: 'hypertension@emory.edu',
      phone: '+1-404-712-2000',
      principalInvestigator: 'Dr. Patricia Johnson'
    }
  },
  {
    id: 'ht-duke',
    name: 'Duke University Medical Center',
    city: 'Durham',
    subdivision: 'North Carolina',
    country: 'United States',
    region: 'us',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 423,
    dataQuality: 92,
    lastDataReceived: '2024-08-27T08:45:00Z',
    contactInfo: {
      email: 'cardiology@duke.edu',
      phone: '+1-919-684-8111',
      principalInvestigator: 'Dr. Robert Martinez'
    }
  },
  {
    id: 'ht-stanford',
    name: 'Stanford Health Care',
    city: 'Stanford',
    subdivision: 'California',
    country: 'United States',
    region: 'us',
    status: 'active',
    healthStatus: 'warning',
    enrolledPatients: 234,
    dataQuality: 86,
    lastDataReceived: '2024-08-26T13:15:00Z',
    contactInfo: {
      email: 'hypertension@stanford.edu',
      phone: '+1-650-723-4000',
      principalInvestigator: 'Dr. Sarah Kim'
    }
  },
  {
    id: 'ht-northwestern',
    name: 'Northwestern Memorial Hospital',
    city: 'Chicago',
    subdivision: 'Illinois',
    country: 'United States',
    region: 'us',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 312,
    dataQuality: 96,
    lastDataReceived: '2024-08-27T10:20:00Z',
    contactInfo: {
      email: 'hypertension@nm.org',
      phone: '+1-312-926-2000',
      principalInvestigator: 'Dr. Michael Brown'
    }
  },
  {
    id: 'ht-upenn',
    name: 'Hospital of the University of Pennsylvania',
    city: 'Philadelphia',
    subdivision: 'Pennsylvania',
    country: 'United States',
    region: 'us',
    status: 'onboarding',
    healthStatus: 'warning',
    enrolledPatients: 89,
    dataQuality: 83,
    lastDataReceived: '2024-08-25T17:00:00Z',
    contactInfo: {
      email: 'hypertension@pennmedicine.upenn.edu',
      phone: '+1-215-662-4000',
      principalInvestigator: 'Dr. Jennifer Davis'
    }
  }
];
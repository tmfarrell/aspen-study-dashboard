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
    targetEnrollment: 500,
    dataQuality: 94,
    lastDataReceived: '2024-08-27T09:00:00Z',
    contactInfo: {
      email: 'hypertension@emory.edu',
      phone: '+1-404-712-2000',
      principalInvestigator: 'Dr. Patricia Johnson'
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
    enrolledPatients: 423,
    targetEnrollment: 550,
    dataQuality: 92,
    lastDataReceived: '2024-08-27T08:45:00Z',
    contactInfo: {
      email: 'cardio@nm.org',
      phone: '+1-312-926-2000',
      principalInvestigator: 'Dr. Kevin Lee'
    }
  },
  {
    id: 'ht-houston',
    name: 'Houston Methodist Hospital',
    city: 'Houston',
    subdivision: 'Texas',
    country: 'United States',
    region: 'us',
    status: 'active',
    healthStatus: 'warning',
    enrolledPatients: 234,
    targetEnrollment: 400,
    dataQuality: 86,
    lastDataReceived: '2024-08-26T13:15:00Z',
    contactInfo: {
      email: 'hypertension@houstonmethodist.org',
      phone: '+1-713-790-3311',
      principalInvestigator: 'Dr. Carlos Ramirez'
    }
  },
  {
    id: 'ht-ucsf',
    name: 'UCSF Medical Center',
    city: 'San Francisco',
    subdivision: 'California',
    country: 'United States',
    region: 'us',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 312,
    targetEnrollment: 450,
    dataQuality: 96,
    lastDataReceived: '2024-08-27T10:20:00Z',
    contactInfo: {
      email: 'cardiology@ucsf.edu',
      phone: '+1-415-476-1000',
      principalInvestigator: 'Dr. Rachel Chang'
    }
  },
  {
    id: 'ht-vanderbilt',
    name: 'Vanderbilt University Medical Center',
    city: 'Nashville',
    subdivision: 'Tennessee',
    country: 'United States',
    region: 'us',
    status: 'onboarding',
    healthStatus: 'warning',
    enrolledPatients: 89,
    targetEnrollment: 350,
    dataQuality: 83,
    lastDataReceived: '2024-08-25T17:00:00Z',
    contactInfo: {
      email: 'cardio.research@vumc.org',
      phone: '+1-615-322-5000',
      principalInvestigator: 'Dr. Thomas Mitchell'
    }
  }
];
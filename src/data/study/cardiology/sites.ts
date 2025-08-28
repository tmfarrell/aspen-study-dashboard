import { SiteData } from '@/api/types';

export const cardiologySites: SiteData[] = [
  {
    id: 'hr-ucla',
    name: 'UCLA Medical Center',
    city: 'Los Angeles',
    subdivision: 'California',
    country: 'United States',
    region: 'us',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 342,
    targetEnrollment: 500,
    dataQuality: 94,
    lastDataReceived: '2024-08-27T10:30:00Z',
    contactInfo: {
      email: 'cardiology@ucla.edu',
      phone: '+1-310-825-9011',
      principalInvestigator: 'Dr. Sarah Chen'
    }
  },
  {
    id: 'hr-stanford',
    name: 'Stanford Health Care',
    city: 'Palo Alto',
    subdivision: 'California',
    country: 'United States',
    region: 'us',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 289,
    targetEnrollment: 400,
    dataQuality: 92,
    lastDataReceived: '2024-08-27T09:15:00Z',
    contactInfo: {
      email: 'cardio.research@stanford.edu',
      phone: '+1-650-723-4000',
      principalInvestigator: 'Dr. Michael Rodriguez'
    }
  },
  {
    id: 'hr-mayo',
    name: 'Mayo Clinic',
    city: 'Rochester',
    subdivision: 'Minnesota',
    country: 'United States',
    region: 'us',
    status: 'active',
    healthStatus: 'warning',
    enrolledPatients: 156,
    targetEnrollment: 300,
    dataQuality: 87,
    lastDataReceived: '2024-08-26T14:20:00Z',
    contactInfo: {
      email: 'heart.rhythm@mayo.edu',
      phone: '+1-507-284-2511',
      principalInvestigator: 'Dr. Jennifer Liu'
    }
  },
  {
    id: 'hr-jhh',
    name: 'Johns Hopkins Hospital',
    city: 'Baltimore',
    subdivision: 'Maryland',
    country: 'United States',
    region: 'us',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 401,
    targetEnrollment: 450,
    dataQuality: 96,
    lastDataReceived: '2024-08-27T11:45:00Z',
    contactInfo: {
      email: 'cardiology@jhmi.edu',
      phone: '+1-410-955-5000',
      principalInvestigator: 'Dr. Robert Kim'
    }
  },
  {
    id: 'hr-mgh',
    name: 'Massachusetts General Hospital',
    city: 'Boston',
    subdivision: 'Massachusetts',
    country: 'United States',
    region: 'us',
    status: 'onboarding',
    healthStatus: 'warning',
    enrolledPatients: 78,
    targetEnrollment: 350,
    dataQuality: 82,
    lastDataReceived: '2024-08-25T16:30:00Z',
    contactInfo: {
      email: 'cardio@mgh.harvard.edu',
      phone: '+1-617-726-2000',
      principalInvestigator: 'Dr. Amanda Foster'
    }
  }
];
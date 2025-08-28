import { SiteData } from '@/api/types';

export const diabetesSites: SiteData[] = [
  // US Sites
  {
    id: 'db-cleveland',
    name: 'Cleveland Clinic',
    city: 'Cleveland',
    subdivision: 'Ohio',
    country: 'United States',
    region: 'us',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 567,
    targetEnrollment: 700,
    dataQuality: 93,
    lastDataReceived: '2024-08-27T08:30:00Z',
    contactInfo: {
      email: 'diabetes.research@ccf.org',
      phone: '+1-216-444-2200',
      principalInvestigator: 'Dr. Maria Gonzalez'
    }
  },
  {
    id: 'db-cedars',
    name: 'Cedars-Sinai Medical Center',
    city: 'Los Angeles',
    subdivision: 'California',
    country: 'United States',
    region: 'us',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 445,
    targetEnrollment: 600,
    dataQuality: 91,
    lastDataReceived: '2024-08-27T07:15:00Z',
    contactInfo: {
      email: 'endocrine@cshs.org',
      phone: '+1-310-423-3277',
      principalInvestigator: 'Dr. David Park'
    }
  },
  {
    id: 'db-nyu',
    name: 'NYU Langone Health',
    city: 'New York',
    subdivision: 'New York',
    country: 'United States',
    region: 'us',
    status: 'active',
    healthStatus: 'warning',
    enrolledPatients: 298,
    targetEnrollment: 500,
    dataQuality: 85,
    lastDataReceived: '2024-08-26T12:45:00Z',
    contactInfo: {
      email: 'diabetes.center@nyulangone.org',
      phone: '+1-212-263-7300',
      principalInvestigator: 'Dr. Lisa Thompson'
    }
  },
  // EU Sites
  {
    id: 'db-charite',
    name: 'Charité - Universitätsmedizin Berlin',
    city: 'Berlin',
    subdivision: 'Berlin',
    country: 'Germany',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 389,
    targetEnrollment: 500,
    dataQuality: 94,
    lastDataReceived: '2024-08-27T09:20:00Z',
    contactInfo: {
      email: 'diabetes@charite.de',
      phone: '+49-30-450-50',
      principalInvestigator: 'Dr. Hans Mueller'
    }
  },
  {
    id: 'db-sorbonne',
    name: 'Hôpital de la Pitié-Salpêtrière',
    city: 'Paris',
    subdivision: 'Île-de-France',
    country: 'France',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 312,
    targetEnrollment: 450,
    dataQuality: 89,
    lastDataReceived: '2024-08-27T10:00:00Z',
    contactInfo: {
      email: 'diabetologie@psl.aphp.fr',
      phone: '+33-1-42-16-00-00',
      principalInvestigator: 'Dr. Marie Dubois'
    }
  },
  {
    id: 'db-milan',
    name: 'IRCCS San Raffaele',
    city: 'Milan',
    subdivision: 'Lombardy',
    country: 'Italy',
    region: 'eu',
    status: 'onboarding',
    healthStatus: 'warning',
    enrolledPatients: 156,
    targetEnrollment: 400,
    dataQuality: 82,
    lastDataReceived: '2024-08-25T15:30:00Z',
    contactInfo: {
      email: 'diabetes@hsr.it',
      phone: '+39-02-2643-1',
      principalInvestigator: 'Dr. Giuseppe Rossi'
    }
  },
  {
    id: 'db-oxford',
    name: 'Oxford University Hospitals',
    city: 'Oxford',
    subdivision: 'Oxfordshire',
    country: 'United Kingdom',
    region: 'eu',
    status: 'active',
    healthStatus: 'healthy',
    enrolledPatients: 278,
    targetEnrollment: 400,
    dataQuality: 92,
    lastDataReceived: '2024-08-27T06:45:00Z',
    contactInfo: {
      email: 'diabetes.research@ouh.nhs.uk',
      phone: '+44-1865-741166',
      principalInvestigator: 'Dr. James Wilson'
    }
  }
];
-- Create hospitalization outcomes table
CREATE TABLE public.hospitalization_outcomes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id TEXT NOT NULL,
  study_id TEXT NOT NULL,
  admission_date DATE NOT NULL,
  discharge_date DATE,
  admission_type TEXT NOT NULL CHECK (admission_type IN ('emergency', 'elective', 'urgent', 'observation')),
  primary_diagnosis TEXT NOT NULL,
  secondary_diagnoses TEXT[],
  length_of_stay_days INTEGER,
  department TEXT,
  outcome TEXT CHECK (outcome IN ('discharged', 'transferred', 'deceased', 'still_admitted')),
  readmission_30_days BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.hospitalization_outcomes ENABLE ROW LEVEL SECURITY;

-- Create policy for reading hospitalization outcomes
CREATE POLICY "Allow read access to hospitalization outcomes" 
ON public.hospitalization_outcomes 
FOR SELECT 
USING (true);

-- Create policy for inserting hospitalization outcomes
CREATE POLICY "Allow insert hospitalization outcomes" 
ON public.hospitalization_outcomes 
FOR INSERT 
WITH CHECK (true);

-- Create policy for updating hospitalization outcomes
CREATE POLICY "Allow update hospitalization outcomes" 
ON public.hospitalization_outcomes 
FOR UPDATE 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_hospitalization_outcomes_patient_id ON public.hospitalization_outcomes(patient_id);
CREATE INDEX idx_hospitalization_outcomes_study_id ON public.hospitalization_outcomes(study_id);
CREATE INDEX idx_hospitalization_outcomes_admission_date ON public.hospitalization_outcomes(admission_date);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_hospitalization_outcomes_updated_at
BEFORE UPDATE ON public.hospitalization_outcomes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for testing
INSERT INTO public.hospitalization_outcomes (patient_id, study_id, admission_date, discharge_date, admission_type, primary_diagnosis, secondary_diagnoses, length_of_stay_days, department, outcome, readmission_30_days) VALUES
('CARD-001', 'cardiology', '2024-01-15', '2024-01-18', 'emergency', 'Acute Myocardial Infarction', ARRAY['Hypertension', 'Diabetes'], 3, 'Cardiology', 'discharged', false),
('CARD-002', 'cardiology', '2024-02-20', '2024-02-25', 'elective', 'Cardiac Catheterization', ARRAY['Coronary Artery Disease'], 5, 'Cardiology', 'discharged', false),
('CARD-003', 'cardiology', '2024-03-10', '2024-03-12', 'urgent', 'Heart Failure Exacerbation', ARRAY['Atrial Fibrillation'], 2, 'Cardiology', 'discharged', true),
('DIA-001', 'diabetes', '2024-01-25', '2024-01-27', 'emergency', 'Diabetic Ketoacidosis', ARRAY['Type 1 Diabetes'], 2, 'Endocrinology', 'discharged', false),
('DIA-002', 'diabetes', '2024-02-14', '2024-02-16', 'urgent', 'Hypoglycemic Episode', ARRAY['Type 2 Diabetes'], 2, 'Emergency', 'discharged', false),
('HYP-001', 'hypertension', '2024-01-30', '2024-02-01', 'emergency', 'Hypertensive Crisis', ARRAY['Chronic Kidney Disease'], 2, 'Emergency', 'discharged', false),
('OB-001', 'obesity', '2024-02-05', '2024-02-10', 'elective', 'Bariatric Surgery', ARRAY['Sleep Apnea'], 5, 'Surgery', 'discharged', false);
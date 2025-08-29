import { supabase } from '@/integrations/supabase/client';
import { StudyType } from '@/api/types';

export interface HospitalizationOutcome {
  id: string;
  patient_id: string;
  study_id: string;
  admission_date: string;
  discharge_date: string | null;
  admission_type: 'emergency' | 'elective' | 'urgent' | 'observation';
  primary_diagnosis: string;
  secondary_diagnoses: string[] | null;
  length_of_stay_days: number | null;
  department: string | null;
  outcome: 'discharged' | 'transferred' | 'deceased' | 'still_admitted' | null;
  readmission_30_days: boolean;
  created_at: string;
  updated_at: string;
}

export const hospitalizationApi = {
  async getByStudy(studyId: StudyType): Promise<{ data: HospitalizationOutcome[] }> {
    const { data, error } = await supabase
      .from('hospitalization_outcomes')
      .select('*')
      .eq('study_id', studyId)
      .order('admission_date', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch hospitalization outcomes: ${error.message}`);
    }

    return { data: (data || []) as HospitalizationOutcome[] };
  },

  async create(outcome: Omit<HospitalizationOutcome, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: HospitalizationOutcome }> {
    const { data, error } = await supabase
      .from('hospitalization_outcomes')
      .insert(outcome)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create hospitalization outcome: ${error.message}`);
    }

    return { data: data as HospitalizationOutcome };
  },

  async update(id: string, updates: Partial<HospitalizationOutcome>): Promise<{ data: HospitalizationOutcome }> {
    const { data, error } = await supabase
      .from('hospitalization_outcomes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update hospitalization outcome: ${error.message}`);
    }

    return { data: data as HospitalizationOutcome };
  }
};
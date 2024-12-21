import { useState, useEffect } from 'react';
import { getMedications } from '../lib/db';
import { useAuth } from './useAuth';

export interface Medication {
  medicineName: string;
  medicineFrequency: string;
  insulinUnits: string;
  insulinFrequency: string;
  timestamp: string;
}

export function useMedication() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadMedications = async () => {
      if (user?.email) {
        try {
          const userMedications = await getMedications(user.email);
          setMedications(userMedications.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          ));
        } catch (error) {
          console.error('Error loading medications:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadMedications();
  }, [user]);

  return { medications, loading };
}
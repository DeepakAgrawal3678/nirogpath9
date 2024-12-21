import { useState, useEffect } from 'react';
import { saveProfile, getProfile } from '../lib/db';
import { useAuth } from './useAuth';

export interface ProfileData {
  name: string;
  gender: string;
  age: string;
  height: string;
  weight: string;
  foodPreference: string;
}

const defaultProfile: ProfileData = {
  name: '',
  gender: '',
  age: '',
  height: '',
  weight: '',
  foodPreference: ''
};

export function useProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData>(defaultProfile);
  const { user } = useAuth();

  useEffect(() => {
    const loadProfile = async () => {
      if (user?.email) {
        const profile = await getProfile(user.email);
        if (profile) {
          setFormData({
            name: profile.name,
            gender: profile.gender,
            age: profile.age,
            height: profile.height,
            weight: profile.weight,
            foodPreference: profile.foodPreference
          });
        }
      }
    };
    loadProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveProfileData = async () => {
    if (user?.email) {
      try {
        await saveProfile(user.email, formData);
        setIsEditing(false);
        alert('Profile saved successfully!');
      } catch (error) {
        console.error('Error saving profile:', error);
        alert('Failed to save profile. Please try again.');
      }
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Reset form data to last saved state
      loadProfile();
    }
    setIsEditing(!isEditing);
  };

  const loadProfile = async () => {
    if (user?.email) {
      const profile = await getProfile(user.email);
      if (profile) {
        setFormData({
          name: profile.name,
          gender: profile.gender,
          age: profile.age,
          height: profile.height,
          weight: profile.weight,
          foodPreference: profile.foodPreference
        });
      }
    }
  };

  return {
    formData,
    isEditing,
    handleChange,
    toggleEdit,
    saveProfileData,
    setFormData
  };
}
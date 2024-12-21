import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { User, Ruler, Weight, Home, Edit, Save } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';

export function Profile() {
  const navigate = useNavigate();
  const { formData, isEditing, handleChange, toggleEdit, saveProfileData } = useProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
          <Button
            onClick={saveProfileData}
            className="flex items-center gap-2"
            disabled={!isEditing}
          >
            <Save className="w-4 h-4" />
            Save Profile
          </Button>
          <Button
            onClick={toggleEdit}
            className="flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
                placeholder="Enter your full name"
                disabled={!isEditing}
              />
              <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Gender
            </label>
            <div className="flex gap-6">
              {['Male', 'Female', 'Other'].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={option.toLowerCase()}
                    checked={formData.gender === option.toLowerCase()}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-500 bg-white/5 border-white/10 focus:ring-orange-500"
                    disabled={!isEditing}
                  />
                  <span className="ml-2 text-slate-300">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="0"
              max="120"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
              placeholder="Enter your age"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Height (cm)
            </label>
            <div className="relative">
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
                placeholder="Enter your height"
                disabled={!isEditing}
              />
              <Ruler className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Weight (kg)
            </label>
            <div className="relative">
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-10"
                placeholder="Enter your weight"
                disabled={!isEditing}
              />
              <Weight className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Food Preference
            </label>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="foodPreference"
                  value="vegetarian"
                  checked={formData.foodPreference === 'vegetarian'}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-500 bg-white/5 border-white/10 focus:ring-orange-500"
                  disabled={!isEditing}
                />
                <span className="ml-2 text-slate-300">Vegetarian</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="foodPreference"
                  value="non-vegetarian"
                  checked={formData.foodPreference === 'non-vegetarian'}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-500 bg-white/5 border-white/10 focus:ring-orange-500"
                  disabled={!isEditing}
                />
                <span className="ml-2 text-slate-300">Non-Vegetarian</span>
              </label>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { List } from 'lucide-react';
import { useDiet } from '../../hooks/useDiet';
import { useDietForm } from '../../hooks/useDietForm';
import { useMealSuggestions } from '../../hooks/useMealSuggestions';
import { DietForm } from '../../components/diet/DietForm';
import { DietHistory } from '../../components/diet/DietHistory';
import { BloodSugarMealCorrelation } from '../../components/diet/BloodSugarMealCorrelation';
import { MealSuggestionList } from '../../components/diet/MealSuggestionList';
import { TotalNutritionCard } from '../../components/diet/TotalNutritionCard';
import { VoiceAssistant } from '../../components/diet/VoiceAssistant';
import { useTotalNutrition } from '../../hooks/useTotalNutrition';

export function Diet() {
  const [showEntries, setShowEntries] = useState(false);
  const { entries, loading } = useDiet();
  const { suggestions, loading: suggestionsLoading } = useMealSuggestions();
  const { totalNutrition, loading: nutritionLoading } = useTotalNutrition();
  const {
    formData,
    activeField,
    error,
    isRecording,
    nutrition,
    handleFormChange,
    toggleRecording,
    handleSubmit
  } = useDietForm();

  // Prepare meal impacts from entries
  const mealImpacts = entries.slice(0, 5).flatMap(entry => ([
    {
      meal: 'Breakfast',
      date: entry.timestamp,
      beforeLevel: 120,
      afterLevel: 140,
      mealContent: entry.breakfast
    },
    {
      meal: 'Lunch',
      date: entry.timestamp,
      beforeLevel: 110,
      afterLevel: 135,
      mealContent: entry.lunch
    },
    {
      meal: 'Dinner',
      date: entry.timestamp,
      beforeLevel: 115,
      afterLevel: 138,
      mealContent: entry.dinner
    }
  ]));

  return (
    <div className="container h-screen py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-white">Diet Tracker</h1>
        <Button
          variant="secondary"
          onClick={() => setShowEntries(!showEntries)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm"
        >
          <List className="w-4 h-4" />
          {showEntries ? 'Hide' : 'Show'} History
        </Button>
      </div>

      {error && (
        <div className={`mb-4 p-3 rounded-lg ${
          error.includes('success')
            ? 'bg-green-500/10 border border-green-500/20 text-green-400'
            : 'bg-red-500/10 border border-red-500/20 text-red-400'
        }`}>
          {error}
        </div>
      )}

      <div className="grid grid-cols-12 gap-4">
        {/* Main Content - 8 columns */}
        <div className="col-span-8 space-y-4">
          <VoiceAssistant />
          
          <MealSuggestionList 
            suggestions={suggestions}
            loading={suggestionsLoading}
          />
          
          <Card className="p-4">
            <DietForm
              formData={formData}
              onFormChange={handleFormChange}
              onSubmit={handleSubmit}
              activeField={activeField}
              isRecording={isRecording}
              onToggleRecording={toggleRecording}
            />
          </Card>
        </div>

        {/* Sidebar - 4 columns */}
        <div className="col-span-4 space-y-4">
          <TotalNutritionCard 
            current={nutrition}
            total={totalNutrition}
            loading={nutritionLoading}
          />

          <BloodSugarMealCorrelation mealImpacts={mealImpacts} />
        </div>
      </div>

      {showEntries && (
        <Card className="mt-4">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-white mb-4">Diet History</h2>
            <DietHistory entries={entries} loading={loading} />
          </div>
        </Card>
      )}
    </div>
  );
}
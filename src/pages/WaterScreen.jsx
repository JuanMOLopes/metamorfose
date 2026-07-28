import React from 'react';
import { useProfile } from '../hooks/useProfile';
import { useWaterToday } from '../hooks/useWaterToday';
import { calculateAge } from '../services/ageCalculator';
import { calculateWaterGoal } from '../services/waterCalculator';

const CUP_ML = 250;

export default function WaterScreen() {
  const { profile } = useProfile();
  const { cups, addCup, removeCup } = useWaterToday();

  const age = profile?.dateOfBirth ? calculateAge(profile.dateOfBirth) : null;
  const goalMl = calculateWaterGoal(profile?.weight, age);
  const goalCups = Math.max(1, Math.round(goalMl / CUP_ML));
  const progress = Math.min(100, Math.round((cups / goalCups) * 100));

  return (
    <div className="screen">
      <h1 className="title">
        {profile?.name ? `Olá, ${profile.name.split(' ')[0]}` : 'Sua água hoje'}
      </h1>
      <p className="subtitle">
        Meta: {goalCups} copos ({goalMl} ml)
      </p>

      <div className="bottle-wrap">
        <div className="bottle-outer">
          <div className="bottle-fill" style={{ height: `${progress}%` }} />
        </div>
        <div className="bottle-label">{progress}%</div>
      </div>

      <p className="cups-row">
        {cups} de {goalCups} copos ({cups * CUP_ML} ml)
      </p>

      <div className="button-row">
        <button className="round-btn" onClick={removeCup} aria-label="Remover copo">
          −
        </button>
        <button
          className="round-btn round-btn-primary"
          onClick={addCup}
          aria-label="Adicionar copo"
        >
          +
        </button>
      </div>

      {progress >= 100 && <p className="celebration">Meta batida hoje! 🎉</p>}
    </div>
  );
}

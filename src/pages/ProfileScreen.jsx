import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';

export default function ProfileScreen() {
  const { profile, saveProfile } = useProfile();
  const navigate = useNavigate();

  const [name, setName] = useState(profile?.name || '');
  const [dateOfBirth, setDateOfBirth] = useState(profile?.dateOfBirth || '');
  const [weight, setWeight] = useState(profile?.weight || '');
  const [height, setHeight] = useState(profile?.height || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveProfile({
      name: name.trim(),
      dateOfBirth,
      weight: weight ? Number(weight) : null,
      height: height ? Number(height) : null,
    });
    navigate('/water');
  };

  return (
    <div className="screen">
      <h1 className="title">Seu perfil</h1>
      <p className="subtitle">Isso ajuda a calcular sua meta de água</p>

      <form onSubmit={handleSubmit} className="form">
        <label className="field">
          Nome
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Como podemos te chamar?"
            required
          />
        </label>

        <label className="field">
          Data de nascimento
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </label>

        <label className="field">
          Peso (kg)
          <input
            type="number"
            inputMode="decimal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="75"
            required
          />
        </label>

        <label className="field">
          Altura (cm)
          <input
            type="number"
            inputMode="numeric"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="180"
          />
        </label>

        <button type="submit" className="btn-primary">
          Salvar e continuar
        </button>
      </form>
    </div>
  );
}

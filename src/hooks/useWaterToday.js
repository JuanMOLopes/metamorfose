import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from '../services/db';

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

export function useWaterToday() {
  const [cups, setCups] = useState(0);
  const [loading, setLoading] = useState(true);
  const date = todayKey();

  useEffect(() => {
    let active = true;
    getItem('water', date).then((data) => {
      if (!active) return;
      setCups(data?.cups || 0);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [date]);

  const updateCups = useCallback(
    async (newCups) => {
      const value = Math.max(0, newCups);
      setCups(value);
      await setItem('water', { date, cups: value });
    },
    [date]
  );

  const addCup = useCallback(() => updateCups(cups + 1), [cups, updateCups]);
  const removeCup = useCallback(() => updateCups(cups - 1), [cups, updateCups]);

  return { cups, loading, addCup, removeCup };
}

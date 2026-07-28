import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from '../services/db';

export function useProfile() {
  // undefined = ainda carregando, null = não existe perfil
  const [profile, setProfile] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getItem('profile', 'user').then((data) => {
      if (!active) return;
      setProfile(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const saveProfile = useCallback(async (data) => {
    const record = { id: 'user', ...data };
    await setItem('profile', record);
    setProfile(record);
    return record;
  }, []);

  return { profile, loading, saveProfile };
}

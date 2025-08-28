import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

export const useAuth = () => {
  const [session, setSession] = useState(null)
  
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])


  return { session };
};
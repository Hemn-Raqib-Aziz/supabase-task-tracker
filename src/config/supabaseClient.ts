import { createClient } from '@supabase/supabase-js'

// secret supabase credentials 
const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;


// const supabase = createClient(supabaseUrl, supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export default supabase;
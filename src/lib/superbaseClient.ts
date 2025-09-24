// import { createClient } from "@supabase/supabase-js"

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY as string

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default supabase;

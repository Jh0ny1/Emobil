// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://znespanbgwntkfvpbckj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZXNwYW5iZ3dudGtmdnBiY2tqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MDU5NjUsImV4cCI6MjA1OTk4MTk2NX0.usSAr5zzdRqlf_6mFdEGBwlUelPAy5JwKfrnbIO_hNk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gwncswephigcayqzyovn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3bmNzd2VwaGlnY2F5cXp5b3ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MTcyMjEsImV4cCI6MjA4ODA5MzIyMX0.nfzurhMm2oVJd4UqItnDpEv3aNDPdOgLi1kWa1AF8c4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cfqjhmonmfvklrdzyjeo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcWpobW9ubWZ2a2xyZHp5amVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNTY4NDQsImV4cCI6MjA4NzkzMjg0NH0.guwuueCYB5t3W3ozB7uS9VWtaZqLqrhjK_XAer53VMA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
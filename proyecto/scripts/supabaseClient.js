import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://<https://imokfxicqzmedegxskxp.supabase.co>.';
const SUPABASE_ANON_KEY = '<eeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltb2tmeGljcXptZWRlZ3hza3hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMTY0MTMsImV4cCI6MjA1Mjg5MjQxM30.Hu763dw72zipJztCLyKy66fuwoW0_GTaLkw8PwKb_8s>';

export const supabase = createClient(SUPABASE_URL, );

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hvtemfayzbyrfrfitcqq.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_aldHHRHVSDThju4bxh17ag_iXIlf6uR'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
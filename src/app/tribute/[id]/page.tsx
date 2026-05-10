import React from 'react'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

// Note: To use framer-motion in App router we either make the page a client component
// or wrap the animated sections in client components. For simplicity, we can make
// the whole page a client component, but fetching is better on server.
// Let's create a ClientWrapper for animations if needed, or just make it a Server component
// and use CSS animations where possible, but prompt asked for framer-motion soft fade-ins.
// We'll create a separate client component for the animated content, or just make the page client 
// and fetch on client? Wait, Next.js Server Components can pass data to Client Components.
// Let's keep data fetching on server, and pass to a Client UI component.

import { TributeClientView } from './TributeClientView'

export default async function TributePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // Fetch tribute data
  const { data: tribute, error } = await supabase
    .from('tributes')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (error || !tribute) {
    notFound()
  }

  return <TributeClientView tribute={tribute} />
}

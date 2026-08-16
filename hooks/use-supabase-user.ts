"use client"

import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"

let cachedUser: User | null | undefined = undefined

export function useSupabaseUser() {
  const [user, setUser] = useState<User | null>(cachedUser ?? null)
  const [loading, setLoading] = useState(cachedUser === undefined)

  useEffect(() => {
    const supabase = createClient()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user ?? null
      cachedUser = nextUser
      setUser(nextUser)
      setLoading(false)
    })

    supabase.auth.getSession().then(({ data }) => {
      const nextUser = data.session?.user ?? null
      cachedUser = nextUser
      setUser(nextUser)
      setLoading(false)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return { user, loading }
}
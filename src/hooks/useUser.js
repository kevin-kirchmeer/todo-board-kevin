import { useState, useEffect } from "react";
import { createClient } from "../lib/supabase";

const supabase = createClient();

export function useUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function loadSession() {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user ?? null);
        }
        loadSession();

        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        })

        return () => data.subscription.unsubscribe();
    }, []);

    return user;
}
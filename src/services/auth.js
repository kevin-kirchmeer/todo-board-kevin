import { createClient } from "../lib/supabase";

const supabase = createClient();

export async function register(email, password){
    const { error } = await supabase.auth.signUp({ email, password });
    if (error ) throw new Error(error.message);
}

export async function login(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}
import { supabase } from '../lib/supabase';

export async function getBoards() {
    const { data, error } = await supabase
        .from('boards')
        .select('*')
        .order('ceated_at', { ascending: false });

        if (error) {
            throw new Error(error.message);
        }

        return data;
}

export async function createBoard(titel) {
    const { data, error } = await supabase
        .from('boards')
        .insert({ titel })
        .select();

        if (error) {
            throw new Error(error.message);
        }

        return data ? data[0] : null;
}

export async function deleteBoard(id) {
    const { error } = await supabase
        .from('boards')
        .delete()
        .eq('id', id);

        if (error) {
            throw new Error(error.message);
        }

        return true;
}
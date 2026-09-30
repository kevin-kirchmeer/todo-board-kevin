import { createClient } from "../lib/supabase";

const supabase = createClient();

export async function getBoards() {
  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createBoard(title) {
  const { data, error } = await supabase
    .from("boards")
    .insert({ title })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data ? data[0] : null;
}

export async function deleteBoard(id) {
  const { error } = await supabase.from("boards").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

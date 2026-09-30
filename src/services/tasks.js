import { supabase } from "../lib/supabase";

export async function getTasks(boardId) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("board_id", boardId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createTask(board_Id, title) {
  const { data, error } = await supabase
    .from("tasks")
    .insert({ board_id: board_Id, title })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data ? data[0] : null;
}

export async function updateTaskStatus(id, status) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data ? data[0] : null;
}

export async function deleteTask(id) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

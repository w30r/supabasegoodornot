"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getAllTodos() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("todos").select();

  if (error) {
    console.error("❌ Supabase Error:", error);
    return { error: "Gagal fetch todos. Try again, boss." };
  }

  console.log("✅ Fetched todos successfully:", data);
  return data;
}

export async function createTodo(task: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("todos")
    .insert([{ task, isDone: false }]) // ← Changed to isDone
    .select()
    .single();

  if (error) {
    console.error("❌ Error creating todo:", error);
    return { error: "Gagal create todo. Try again, boss." };
  }

  console.log("✅ Created todo:", data);
  return data;
}

export async function updateTodo(
  id: number,
  updates: { task?: string; isDone?: boolean },
) {
  // ← Changed to isDone
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("todos")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("❌ Error updating todo:", error);
    return { error: "Gagal update todo. Try again, boss." };
  }

  console.log("✅ Updated todo:", data);
  return data;
}

export async function deleteTodoById(id: number) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    console.error("❌ Error deleting todo:", error);
    return { error: "Gagal delete todo. Try again, boss." };
  }

  console.log("✅ Deleted todo with id:", id);
  return { success: true };
}


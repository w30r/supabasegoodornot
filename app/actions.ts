"use server";

import { createClient } from "@/utils/supabase/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createLobby() {
  const supabase = createClient();

  // 1. Generate a random 4-character room code
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed confusing O, 0, I, 1
  let roomCode = "";
  for (let i = 0; i < 4; i++) {
    roomCode += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }

  // 2. Insert into Supabase
  const { error } = await supabase
    .from("rooms")
    .insert([{ room_code: roomCode }])
    .select()
    .single();

  if (error) {
    console.error("Error creating room:", error);
    return { error: "Gagal create room. Try again, boss." };
  }

  // 3. Redirect to the dynamic room page
  redirect(`/room/${roomCode}`);
}

export async function getAllLobbies() {
  // const cookieStore = await cookies();
  const supabase = createClient();
  const { data, error } = await supabase.from("rooms").select();
  if (error) {
    console.error("Error fetching rooms:", error);
    return { error: "Gagal fetch room. Try again, boss." };
  }
  return data;
}

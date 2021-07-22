import { NextApiRequest, NextApiResponse } from "next";
import { PasteType } from "types";
import supabaseClient from "utils/supabase";

export default async function pasteId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Fetch the paste from supabase
  const { data: pastes, error } = await supabaseClient
    .from<PasteType>("Pastes")
    .select("*")
    .eq("public", "true")
    .order("createdAt", { ascending: false })
    .limit(8);

  // Debug logging
  console.log(pastes);

  // Handle error or no pastes
  if (error || !pastes) {
    return res.send(error);
  }

  // Send the paste as response
  res.send(pastes);
}
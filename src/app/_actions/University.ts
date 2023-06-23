"use server";

import { revalidatePath } from "next/cache";

export async function addNewUni(query: any, token: string) {
  await fetch(`${process.env.DATABASE_URL}/uni/create`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(query),
  })
    .then(async (data) => await data.json())
    .catch((err) => console.log(err));
  revalidatePath("/");
}

"use server";

import { apiServer } from "@/app/_lib/axios";
import { Sale } from "@/app/_types/sale";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

export async function getSales() {
  try {
    const { data } = await apiServer.get<Sale[]>("/sale");
    return data;
  } catch (error) {
    console.log(error);

    if (error instanceof AxiosError) {
      if (error.status === 401) {
        redirect("/login");
      }

      throw new Error(error.message);
    }
  }
}

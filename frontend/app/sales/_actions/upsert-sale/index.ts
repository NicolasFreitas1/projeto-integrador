"use server";

import { revalidatePath } from "next/cache";
import { Sale } from "@/app/_types/sale";
import { apiServer } from "@/app/_lib/axios";

interface UpsertSaleData extends Omit<Sale, "id"> {
  id?: string; // Presente em caso de atualização
}

export async function upsertSale(data: UpsertSaleData): Promise<void> {
  const url = data.id
    ? `http://localhost:5001/sale/${data.id}`
    : "http://localhost:5001/sale";
  const method = data.id ? "PUT" : "POST";

  try {
    await apiServer({
      method,
      url,
      data,
    });

    // Revalida o caminho para atualizar a listagem
    revalidatePath("/sales");
  } catch (e) {
    console.log(e);
  }
}

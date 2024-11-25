"use server";

import { revalidatePath } from "next/cache";
import { Sale } from "@/app/_types/sale";

interface UpsertSaleData extends Omit<Sale, "id" | "soldAt"> {
  id?: string; // Presente em caso de atualização
}

export async function upsertSale(data: UpsertSaleData): Promise<void> {
  const url = data.id ? `http://localhost:5000/sale/${data.id}` : "http://localhost:5000/sale";
  const method = data.id ? "PUT" : "POST";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao salvar a venda");
  }

  // Revalida o caminho para atualizar a listagem
  revalidatePath("/sales");
}

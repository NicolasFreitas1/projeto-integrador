"use server";

import { apiServer } from "@/app/_lib/axios";
import { Sale } from "@/app/_types/sale";
import { SaleWithNames } from "@/app/_types/sale-with-name";
import { getProducts } from "@/app/products/_data/get-products";
import { getUsers } from "@/app/users/_data/get-users";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

export async function getSales() {
  try {
    const users = await getUsers();
    const products = await getProducts();

    const { data } = await apiServer.get<Sale[]>("/sale");

    const salesWithName: SaleWithNames[] = data.map((sale) => {
      return {
        id: sale.id,
        productId: sale.productId,
        productName:
          products?.find((product) => product.id === sale.productId)?.name ??
          "-",
        quantity: sale.quantity,
        sellerId: sale.sellerId,
        sellerName:
          users?.find((user) => user.id === sale.sellerId)?.name ?? "-",
        soldAt: sale.soldAt,
      };
    });
    return salesWithName;
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

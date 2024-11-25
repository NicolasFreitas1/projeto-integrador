"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Sale } from "@/app/_types/sale";
import EditSaleButton from "../_components/edit-sale-button";
import DeleteSaleButton from "../_components/delete-sale-button";

export const saleColumns: ColumnDef<Sale>[] = [
  {
    accessorKey: "productId",
    header: "Produto",
  },
  {
    accessorKey: "quantity",
    header: "Quantidade",
  },
  {
    accessorKey: "soldAt",
    header: "Data da Venda",
    cell: ({ row: { original } }) => {
      const date = new Date(original.soldAt);
      return date.toLocaleString();
    },
  },
  {
    accessorKey: "sellerId",
    header: "Vendedor",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row: { original: sale } }) => (
      <div className="space-x-1">
        <EditSaleButton sale={sale} />
        <DeleteSaleButton saleId={sale.id} />
      </div>
    ),
  },
];

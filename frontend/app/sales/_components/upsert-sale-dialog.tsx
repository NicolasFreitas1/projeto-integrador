"use client";

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { upsertSale } from "../_actions/upsert-sale";
import { toast } from "sonner";

interface UpsertSaleDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  saleId?: string;
  defaultValues?: FormSchema;
}

const formSchema = z.object({
  productId: z.string().uuid("Produto inválido."),
  quantity: z.number().int().positive("A quantidade deve ser positiva."),
  sellerId: z.string().uuid("Vendedor inválido."),
});

type FormSchema = z.infer<typeof formSchema>;

export function UpsertSaleDialog({
  isOpen,
  setIsOpen,
  saleId,
  defaultValues,
}: UpsertSaleDialogProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      productId: "",
      quantity: 1,
      sellerId: "",
    },
  });

  const isUpdate = Boolean(saleId);

  const onSubmit = async (data: FormSchema) => {
    try {
      await upsertSale({ ...data, id: saleId });
      setIsOpen(false);
      form.reset();
      toast.success(`Venda ${isUpdate ? "atualizada" : "adicionada"} com sucesso!`);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar a venda.");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) form.reset();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isUpdate ? "Editar" : "Adicionar"} Venda</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produto</FormLabel>
                  <FormControl>
                    <Input placeholder="ID do Produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Quantidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sellerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendedor</FormLabel>
                  <FormControl>
                    <Input placeholder="ID do Vendedor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{isUpdate ? "Atualizar" : "Adicionar"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

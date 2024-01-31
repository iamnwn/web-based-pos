import { useContext } from "react";
import { InvoiceContext } from "@/contexts/InvoiceProvider";

export function useInvoice() {
  return useContext(InvoiceContext);
}

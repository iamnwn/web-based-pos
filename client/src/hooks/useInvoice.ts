import { useContext } from "react";
import { InvoiceContext } from "@/contexts/InvoiceProvider";

export default function useInvoice() {
  return useContext(InvoiceContext);
}

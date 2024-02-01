import useInvoice from "@/hooks/useInvoice";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";

const AddItem = ({ items }) => {
  const { increaseInvoiceQuantity } = useInvoice();
  const [invoiceData, setInvoiceData] = useState({
    StockId: items.getValue("id"),
    quantity: 1,
    discount: items.getValue("defaultDiscount"),
    ProductId: items.getValue("ProductId"),
    subTotal: 0,
    productName: items.getValue("productName"),
  });

  const calculateSubTotal = () => {
    const unitPrice = items.getValue("unitPrice");
    const total =
      invoiceData.quantity * unitPrice -
      (invoiceData.quantity * unitPrice * invoiceData.discount) / 100;
    setInvoiceData((Data) => ({
      ...Data,
      subTotal: total,
    }));
  };

  useEffect(() => {
    calculateSubTotal();
  }, [invoiceData.discount, invoiceData.quantity]);

  const addtoInvoive = () => {
    return increaseInvoiceQuantity(invoiceData);
  };

  return (
    <div className="grid grid-flow-row gap-3">
      <Input
        className="text-white"
        placeholder="quantity"
        defaultValue={1}
        onChange={(e) =>
          setInvoiceData((data) => ({
            ...data,
            quantity: parseInt(e.target.value),
          }))
        }
      />
      <Input
        className="text-white"
        placeholder="discount"
        min={0.0}
        defaultValue={items.getValue("defaultDiscount") || 0}
        onChange={(e) =>
          setInvoiceData((data) => ({
            ...data,
            discount: parseInt(e.target.value) || 0,
          }))
        }
      />
      <Label className="text-white">Sub total : {invoiceData.subTotal}</Label>
      <Button onClick={addtoInvoive}>Add to Invoice</Button>
    </div>
  );
};

export default AddItem;

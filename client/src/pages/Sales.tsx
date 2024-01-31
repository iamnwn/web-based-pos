import SalesTable from "@/components/SalesTable";
import SalesInvoice from "@/components/SalesInvoice";
import { useState } from "react";

const Sales = () => {
  const [customer, setCustomer] = useState({
    id: "",
    firstName: "",
  });

  const [invoice, setInvoice] = useState({
    StockId: "",
    quantity: "",
    discount: "",
    subTotal: "",
  });

  return (
    <div className="m-5 flex">
      <SalesTable></SalesTable>
      <div className="ml-5">
        <SalesInvoice></SalesInvoice>
      </div>
    </div>
  );
};

export default Sales;

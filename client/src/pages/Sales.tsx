import SalesTable from "@/components/SalesTable";
import SalesInvoice from "@/components/SalesInvoice";
import { useState } from "react";
import CustomerComBox from "@/components/CustomerCombox";
import { Label } from "@/components/ui/label";
import { InvoiceProvider } from "@/contexts/InvoiceProvider";
import SubmitInvoice from "@/components/SubmitInvoice";

const Sales = () => {
  const [customer, setCustomer] = useState({
    id: "",
    firstName: "",
  });

  return (
    <InvoiceProvider>
      <div className="m-5 flex">
        <div>
          <div className="flex flex-col">
            <Label htmlFor="customer" className="mb-3">
              Select Customer : {customer ? customer.firstName : null}
            </Label>
            <CustomerComBox setCustomer={setCustomer} />
          </div>
          <SalesTable></SalesTable>
        </div>
        <div className="ml-5">
          <SalesInvoice></SalesInvoice>
          <div className="mt-5">
            <SubmitInvoice
              customer={customer}
              setCustomer={setCustomer}></SubmitInvoice>
          </div>
        </div>
      </div>
    </InvoiceProvider>
  );
};

export default Sales;

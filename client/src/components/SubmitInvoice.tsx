import { useEffect, useState } from "react";
import { Card } from "./ui/card";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import useInvoice from "@/hooks/useInvoice";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useToast } from "./ui/use-toast";

const SubmitInvoice = ({ customer, setCustomer }) => {
  const { toast } = useToast();
  const axiosPrivate = useAxiosPrivate();
  const INVOICE_URL = "/api/invoice";
  const [payment, setPayment] = useState(0);
  const { invoiceQuantity, invoiceAmount, clearInvoice, invoiceItems } =
    useInvoice();
  const invoice = invoiceQuantity;
  const amount = invoiceAmount;

  const clear = () => {
    clearInvoice();
    setCustomer([]);
    setPayment([]);
  };

  const change = () => {
    if (payment > 0) {
      return payment - amount;
    }
  };

  const changes = change();
  const data = {
    customer: customer.id,
    lines: invoiceItems,
    total: amount,
  };

  useEffect(() => {
    change();
  }, [payment]);

  const submit = async () => {
    if (payment > amount) {
      axiosPrivate
        .post(INVOICE_URL, data)
        .then((response) => {
          toast({
            variant: "success",
            title: response.data.message,
          });
          clear();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast({
        variant: "destructive",
        title: "Error !",
      });
    }
  };

  return (
    <Card className="grid grid-flow-col w-[350] h-[210px] bg-black rounded-sm text-white">
      <div>
        <p className="ml-4 mt-4">Total item : {invoice ? invoice : null}</p>
        <p className="ml-4 ">Total Amount : {amount ? amount : null}</p>
        <Label className=" ml-4 text-lg font-bold" htmlFor="payment">
          Payment
        </Label>
        <Input
          className="ml-4 mt-3 w-40"
          type="number"
          onChange={(e) =>
            setPayment((data) => (data = parseInt(e.target.value)))
          }
          value={payment}
        />
        <p className="ml-4 mt-5 text-xl font-bold">
          Changes : {changes ? changes : null}
        </p>
      </div>
      <div className="grid content-right justify-items-center gap-4 ">
        <Button
          onClick={submit}
          className="text-4xl font-bold mt-4 mr-6 bg-green-600 rounded-sm w-full h-[100px]">
          Pay
        </Button>
        <Button
          onClick={clear}
          className="mb-4 mr-6 bg-red-600 rounded-sm w-full h-auto ">
          Clear
        </Button>
      </div>
    </Card>
  );
};

export default SubmitInvoice;

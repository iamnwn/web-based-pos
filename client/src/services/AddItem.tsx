import useInvoice from "@/hooks/useInvoice";

const AddItem = (item) => {
  console.log("work");

  const { increaseInvoiceQuantity } = useInvoice();
  const invoiceData = {
    StockId: item.getValue("id"),
    quantity: 1,
    discount: item.getValue("discount"),
    ProductId: item.getValue("ProductId"),
  };
  increaseInvoiceQuantity(invoiceData);
  console.log("work");
};

export default AddItem;

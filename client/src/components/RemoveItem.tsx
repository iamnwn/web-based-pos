import { Button } from "./ui/button";
import useInvoice from "@/hooks/useInvoice";

const RemoveItem = ({ id }) => {
  const { decreaseInvoiceQuantity } = useInvoice();

  const remove = () => {
    decreaseInvoiceQuantity(id);
  };

  return (
    <Button onClick={remove} className="bg-red-500">
      Remove
    </Button>
  );
};

export default RemoveItem;

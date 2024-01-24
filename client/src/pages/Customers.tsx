import CustomerForm from "@/components/CustomerForm";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CustomerTable from "@/components/CustomerTable";

const Customers = () => {
  return (
    <div className="flex-cols m-5 ">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="outline outline-gray-500 outline-[1px]">
            Add customer +
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={"start"}
          className="w-auto outline-gray-500 outline-[1px] ">
          <CustomerForm />
        </PopoverContent>
      </Popover>

      <CustomerTable></CustomerTable>
    </div>
  );
};

export default Customers;

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import StockForm from "@/components/StockForm";
import StockTable from "@/components/StockTable";

const Store = () => {
  return (
    <div className="flex-cols m-5 ">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="outline outline-gray-500 outline-[1px]">
            Add Stock +
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={"start"}
          className="w-auto outline-gray-500 outline-[1px] ">
          <StockForm values={null} />
        </PopoverContent>
      </Popover>

      <StockTable></StockTable>
    </div>
  );
};

export default Store;

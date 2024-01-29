import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import StoresTable from "@/components/StoresTable";
import StoresForm from "@/components/StoresForm";

const Stores = () => {
  return (
    <div className="flex-cols m-5 ">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="outline outline-gray-500 outline-[1px]">
            Add Stores +
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={"start"}
          className="w-auto outline-gray-500 outline-[1px] ">
          <StoresForm values={null} />
        </PopoverContent>
      </Popover>

      <StoresTable></StoresTable>
    </div>
  );
};

export default Stores;

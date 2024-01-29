import * as React from "react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import StoreCommandBox from "./StoreCommandBox";

const StoreComBox = ({ setStore }) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState();

  React.useEffect(() => {
    if (selected) {
      setStore({ id: selected.id, storeName: selected.storeName });
    }
  }, [selected]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="w-[160px] justify-center text-white">
          {selected ? <>Selected</> : <>Select</>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <StoreCommandBox setOpen={setOpen} setSelected={setSelected} />
      </PopoverContent>
    </Popover>
  );
};

export default StoreComBox;

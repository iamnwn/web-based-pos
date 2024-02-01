import * as React from "react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CustomerCommandBox from "./CustomerCommandBox";

const CustomerComBox = ({ setCustomer }) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState();

  React.useEffect(() => {
    if (selected) {
      setCustomer({ id: selected.id, firstName: selected.firstName });
    }
  }, [selected]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="w-[160px] justify-center text-white">Select</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <CustomerCommandBox setOpen={setOpen} setSelected={setSelected} />
      </PopoverContent>
    </Popover>
  );
};

export default CustomerComBox;

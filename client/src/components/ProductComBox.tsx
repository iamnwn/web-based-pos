import * as React from "react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ProductCommandBox from "./ProductCommandBox";

const ProductComBox = ({ setProduct }) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState();

  React.useEffect(() => {
    if (selected) {
      setProduct({ id: selected.id, productName: selected.productName });
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
        <ProductCommandBox setOpen={setOpen} setSelected={setSelected} />
      </PopoverContent>
    </Popover>
  );
};

export default ProductComBox;

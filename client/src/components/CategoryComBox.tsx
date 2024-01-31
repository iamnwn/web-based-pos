import * as React from "react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CategoryCommandBox from "./CategoryCommandBox";

const CategoryComBox = ({ setCategory }) => {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState();

  React.useEffect(() => {
    if (selected) {
      setCategory({ id: selected.id, categoryName: selected.categoryName });
    }
  }, [selected]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="w-[160px] justify-center text-white">
          {selected ? selected.categoryName : <>Select</>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <CategoryCommandBox setOpen={setOpen} setSelected={setSelected} />
      </PopoverContent>
    </Popover>
  );
};

export default CategoryComBox;

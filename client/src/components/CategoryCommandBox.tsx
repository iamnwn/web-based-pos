import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

import { useEffect, useState } from "react";

const CategoryCommandBox = ({ setOpen, setSelected }) => {
  const PRODUCT_CATEGORY_URL = "/api/productcategory";
  const axiosPrivate = useAxiosPrivate();
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState();

  const fetchData = async (
    pageIndex: number,
    pageSize: number,
    filter: string
  ) => {
    await axiosPrivate
      .get(
        `${PRODUCT_CATEGORY_URL}/data?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${
          !filter ? "" : filter
        }`
      )
      .then((data) => {
        setCategory(data.data.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    fetchData(0, 5, filter);
  }, [filter]);

  return (
    <Command className="bg-background text-foreground">
      <CommandInput
        onChangeCapture={(e) => setFilter(e.target.value)}
        placeholder="Category"
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {category ? (
            category.map((category) => (
              <CommandItem
                className="bg-background"
                key={category.id}
                value={category}
                onSelect={() => {
                  setSelected(category);
                  setOpen(false);
                }}>
                <p className="w-[80px]">{category.categoryName}</p>
              </CommandItem>
            ))
          ) : (
            <CommandItem className="text-white">Not Found</CommandItem>
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default CategoryCommandBox;

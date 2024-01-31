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

const ProductCommandBox = ({ setOpen, setSelected }) => {
  const axiosPrivate = useAxiosPrivate();
  const PRODUCT_URL = "/api/product";
  const [filter, setFilter] = useState("");
  const [products, setProducts] = useState();

  const fetchData = (pageIndex: number, pageSize: number, filter: string) => {
    axiosPrivate
      .get(
        `${PRODUCT_URL}/data?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${
          !filter ? "" : filter
        }`
      )
      .then((data) => {
        setProducts(data.data.data);
        //
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
        placeholder="Contact"
      />
      <CommandList key={products}>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {products ? (
            products.map((product) => (
              <CommandItem
                className="bg-background"
                key={product.id}
                value={product}
                onSelect={() => {
                  setSelected(product);
                  setOpen(false);
                }}>
                <p className="w-[80px]">{product.productName}</p>
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

export default ProductCommandBox;

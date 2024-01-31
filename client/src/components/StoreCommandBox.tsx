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

const CustomerCommandBox = ({ setOpen, setSelected }) => {
  const axiosPrivate = useAxiosPrivate();
  const STORES_URL = "/api/stores";
  const [filter, setFilter] = useState("");
  const [stores, setStores] = useState();

  const fetchData = (pageIndex: number, pageSize: number, filter: string) => {
    axiosPrivate
      .get(
        `${STORES_URL}/data?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${
          !filter ? "" : filter
        }`
      )
      .then((data) => {
        setStores(data.data.data);
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
      <CommandList key={stores}>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {stores ? (
            stores.map((store) => (
              <CommandItem
                className="bg-background"
                key={store.id}
                value={store}
                onSelect={() => {
                  setSelected(store);
                  setOpen(false);
                }}>
                <p className="w-[80px]">{store.storeLocation}</p>
                <p>{store.storeName}</p>
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

export default CustomerCommandBox;

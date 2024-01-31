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
  const CUSTOMER_URL = "/api/customer";
  const axiosPrivate = useAxiosPrivate();
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState();

  const fetchData = (pageIndex: number, pageSize: number, filter: string) => {
    axiosPrivate
      .get(
        `${CUSTOMER_URL}/data?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${
          !filter ? "" : filter
        }`
      )
      .then((data) => {
        setUsers(data.data.data);
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
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {users ? (
            users.map((user) => (
              <CommandItem
                className="bg-background"
                key={user.id}
                value={user}
                onSelect={() => {
                  setSelected(user);
                  setOpen(false);
                }}>
                <p className="w-[80px]">{user.firstName}</p>
                <p>{user.contact}</p>
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

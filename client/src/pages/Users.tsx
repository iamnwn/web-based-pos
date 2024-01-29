import UserForm from "@/components/UserForm";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserTable from "@/components/UserTable";

const Users = () => {
  return (
    <div className="flex-cols m-5 ">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="outline outline-gray-500 outline-[1px]">
            Add User +
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={"start"}
          className="w-auto outline-gray-500 outline-[1px] ">
          <UserForm values={null} />
        </PopoverContent>
      </Popover>

      <UserTable></UserTable>
    </div>
  );
};

export default Users;

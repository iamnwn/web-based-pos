import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

const UserForm = () => {
  return (
    <Card className="w-[400px] bg-white/20 backdrop-blur border-white text-gray-900 p-2">
      <CardHeader className="h-auto text-2xl font-semibold">Sign in</CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input id="name" placeholder="admin" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" placeholder="xxxxx" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Button>Sign in</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserForm;

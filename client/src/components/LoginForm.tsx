import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

const LoginForm = () => {
  return (
    <Card className="w-[400px] bg-white/20 backdrop-blur text-gray-900 p-2 border-gray-500">
      <CardHeader className="h-auto text-4xl font-semibold">Sign in</CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input
                className="border-gray-500"
                id="name "
                placeholder="admin"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                className="border-gray-500"
                type="password"
                placeholder="xxxxx"
              />
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

export default LoginForm;

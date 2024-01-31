import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { FieldValues, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useToggle from "../hooks/useToggle";
import { Checkbox } from "@/components/ui/checkbox";
import AuthService from "@/services/AuthService";

type formType = {
  userName: string;
  password: string;
};

const LoginForm = () => {
  const { setAuth } = useAuth();
  const { toast } = useToast();

  const navigate = useNavigate();
  const [check, toggleCheck] = useToggle("persist", false);

  const { register, handleSubmit, getValues, formState, reset } =
    useForm<formType>({
      // resolver: yupResolver(schema),
    });
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: FieldValues, e) => {
    e.preventDefault();
    console.log(data);

    const userName = getValues("userName");
    const password = getValues("password");

    await AuthService.Login(data)
      .then((res) => {
        console.log(res);

        const accessToken = res?.data?.accessToken;
        const userRole = res?.data?.userRole;
        const StoreId = res?.data?.StoreId;

        setAuth({ userName, password, userRole, StoreId, accessToken });
        toast({
          variant: "success",
          title: "Success",
        });
        reset();
        navigate("/home", { replace: true });
      })
      .catch((err) => {
        console.log(err);

        const message = err.response.data.message;

        toast({
          variant: "destructive",
          description: message,
        });
        reset();
      });
  };

  return (
    <Card className="w-[400px] bg-white/20 backdrop-blur text-gray-900 p-2 border-gray-500">
      <CardHeader className="h-auto text-4xl font-semibold">Sign in</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input
                {...register("userName")}
                className="border-gray-500"
                id="name "
                placeholder="admin"
              />
              <p className="text-destructive text-xs">
                {errors.userName?.message}
              </p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password")}
                className="border-gray-500"
                type="password"
                placeholder="xxxxx"
              />
              <p className="text-destructive text-xs">
                {errors.password?.message}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="persist"
                onCheckedChange={toggleCheck}
                checked={check}
              />
              <label
                htmlFor="persist"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Trust this device
              </label>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Button type="submit" disabled={isSubmitting}>
                Sign in
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;

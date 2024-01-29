import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import customerServices from "@/services/CustomerServices";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { CreateSchema } from "@/schema/CustomerSchema";

type formType = {
  firstName: string;
  lastName: string;
  contact: number | string;
  email: string;
  city: string;
};

const CustomerForm = ({ values }) => {
  const { register, handleSubmit, setValue, formState, reset } =
    useForm<formType>({
      resolver: yupResolver(CreateSchema),
    });
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (values) {
      setValue("firstName", values.getValue("firstName"));
      setValue("lastName", values.getValue("lastName"));
      setValue("contact", values.getValue("contact"));
      setValue("email", values.getValue("email"));
      setValue("city", values.getValue("city"));
    }
  }, []);

  const { toast } = useToast();

  const onSubmit = async (data: FieldValues) => {
    if (values) {
      const id = values.getValue("id");
      await customerServices
        .updateCustomer(id, data)
        .then((e) => {
          toast({
            variant: "success",
            title: "Success",
            description: e.message,
          });
          reset();
        })
        .catch((err) => {
          if (err.response) {
            const validationErrors = err.response.data;
            const message = validationErrors[0].message;

            toast({
              variant: "destructive",
              description: message,
            });
          }
        });
    } else {
      await customerServices
        .createCustomer(data)
        .then((e) => {
          toast({
            variant: "success",
            title: "Success",
            description: e.message,
          });
          reset();
        })
        .catch((err) => {
          if (err.response) {
            const validationErrors = err.response.data;
            const message = validationErrors[0].message;

            toast({
              variant: "destructive",
              description: message,
            });
          }
        });
    }
  };

  return (
    <Card className="bg-black text-white border-none max-w-[500px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 w-full place-content-stretch gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              {...register("firstName")}
              placeholder="Nuwan"
              // defaultValue={id ? id.getValue("firstName") : ""}
            />
            <p className="text-destructive text-xs">
              {errors.firstName?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              {...register("lastName")}
              placeholder="Thilakarathna"
              // defaultValue={id ? customer?.lastName : ""}
            />
            <p className="text-destructive text-xs">
              {errors.lastName?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="contact">Contact</Label>
            <Input
              {...register("contact")}
              placeholder="0767799707"
              // defaultValue={id ? customer?.contact : ""}
            />
            <p className="w-full text-destructive text-xs">
              {errors.contact?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              placeholder="tinuwan@gmail.com"
              // defaultValue={id ? customer?.email : ""}
            />
            <p className="text-destructive text-xs">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="city">City</Label>
            <Input
              {...register("city")}
              placeholder="Godakawela"
              // defaultValue={id ? customer?.city : ""}
            />
            <p className="text-destructive text-xs">{errors.city?.message}</p>
          </div>

          <div className="grid content-center ">
            <Button
              type="submit"
              className="w-full h-full"
              disabled={isSubmitting}>
              {values ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default CustomerForm;

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import customerServices from "@/services/customerServices";
import { useToast } from "@/components/ui/use-toast";

const CustomerForm = () => {
  const { toast } = useToast();

  const schema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    contact: Yup.number()
      .typeError("Contact must be a number")
      .required("Contact is required"),
    email: Yup.string().email("Invalid email"),
    city: Yup.string().required("City name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await customerServices
      .createCustomer(data)
      .then((e) => {
        toast({
          description: e.message,
        });
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
  };

  return (
    <Card className="bg-black text-white border-none max-w-[500px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 w-full place-content-stretch gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="firstName">First name</Label>
            <Input {...register("firstName")} placeholder="Nuwan" />
            <p className="text-destructive text-sm">
              {errors.firstName?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="lastName">Last name</Label>
            <Input {...register("lastName")} placeholder="Thilakarathna" />
            <p className="text-destructive text-sm">
              {errors.lastName?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="contact">Contact</Label>
            <Input {...register("contact")} placeholder="0767799707" />
            <p className="w-full text-destructive text-sm">
              {errors.contact?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input {...register("email")} placeholder="tinuwan@gmail.com" />
            <p className="text-destructive text-sm">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="city">City</Label>
            <Input {...register("city")} placeholder="Godakawela" />
            <p className="text-destructive text-sm">{errors.city?.message}</p>
          </div>

          <div className="grid content-end">
            <Button type="submit" className="w-full ">
              Add
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default CustomerForm;

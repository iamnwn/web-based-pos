import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AxiosResponse, AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomerComBox from "./CustomerCombox";
import { CreateSchema, UpdateSchema } from "@/schema/UserSchema";
import StoreComBox from "./StoreComBox";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

type formType = {
  id: number;
  nic: number;
  emergencyContact: string;
  state: string;
  district: string;
  postalCode: string;
  userRole: string;
  userName: string;
  password: string;
  isActive: string;
  StoreId: string | null;
  CustomerId: number;
};

const UserForm = ({ values }) => {
  const CUSTOMER_URL = "/api/user";
  const axiosPrivate = useAxiosPrivate();
  let schema;
  const [customer, setCustomer] = useState({
    id: "",
    firstName: "",
  });
  const [store, setStore] = useState({
    id: null,
    storeName: "",
  });

  if (!values) {
    schema = CreateSchema;
  } else {
    schema = UpdateSchema;
  }

  const { register, handleSubmit, setValue, formState } = useForm<formType>({
    resolver: yupResolver(schema),
  });

  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (values) {
      setStore({
        id: values.getValue("StoreId"),
        storeName: values.getValue("storeName"),
      });
      setValue("id", values.getValue("id"));
      setValue("nic", values.getValue("nic"));
      setValue("emergencyContact", values.getValue("emergencyContact"));
      setValue("state", values.getValue("state"));
      setValue("district", values.getValue("district"));
      setValue("postalCode", values.getValue("postalCode"));
      setValue("userRole", values.getValue("userRole"));
      setValue("userName", values.getValue("userName"));
      setValue("isActive", values.getValue("isActive"));
    }
  }, []);

  useEffect(() => {
    if (!values) {
      setValue("CustomerId", customer.id);
    }
    setValue("StoreId", store.id);
  }, [customer, store]);

  const { toast } = useToast();

  const onSubmit = async (data: formType) => {
    console.log(data);

    if (values) {
      const id = values.getValue("id");
      axiosPrivate
        .put(`${CUSTOMER_URL}/${id}`, data)
        .then((response: AxiosResponse) => {
          toast({
            variant: "success",
            title: "Success",
            description: response?.message,
          });
        })
        .catch((reason: AxiosError) => {
          console.log(reason);

          if (
            reason.response!.status === 400 ||
            reason.response!.status === 500
          ) {
            toast({
              variant: "destructive",
              title: "Error",
              description: reason?.response?.data?.error,
            });
          } else {
            toast({
              title: "Something went wrong",
              description: "Contact system administrator",
            });
          }
        });
    } else {
      axiosPrivate
        .put(`${CUSTOMER_URL}`, data)
        .then((response: AxiosResponse) => {
          toast({
            variant: "success",
            title: "Success",
            description: response?.message,
          });
        })
        .catch((reason: AxiosError) => {
          console.log(reason);

          if (
            reason.response!.status === 400 ||
            reason.response!.status === 500
          ) {
            toast({
              variant: "destructive",
              title: "Error",
              description: reason?.response?.data?.error,
            });
          } else {
            toast({
              title: "Something went wrong",
              description: "Contact system administrator",
            });
          }
        });
    }
  };

  return (
    <Card className="bg-black text-white border-none max-w-[500px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3  w-full place-content-stretch gap-4">
          <div className="flex flex-col space-y-2 ">
            <Label htmlFor="nic">NIC no.</Label>
            <Input {...register("nic")} placeholder="123456789V" />
            <p className="text-destructive text-xs">{errors.nic?.message}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="emergencyContact">Emergency contact</Label>
            <Input {...register("emergencyContact")} placeholder="1234567890" />
            <p className="text-destructive text-xs">
              {errors.emergencyContact?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="state">State</Label>
            <Input {...register("state")} placeholder="Province" />
            <p className="text-destructive text-xs">{errors.state?.message}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="district">District</Label>
            <Input {...register("district")} placeholder="District" />
            <p className="text-destructive text-xs">
              {errors.district?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="postalCode">Postal code</Label>
            <Input {...register("postalCode")} placeholder="123456" />
            <p className="text-destructive text-xs">
              {errors.postalCode?.message}
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="userRole">User role</Label>
            <Select onValueChange={(e) => setValue("userRole", e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select user role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="salesmen">Salesmen</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="userName">Username</Label>
            <Input {...register("userName")} placeholder="admin" />
            <p className="text-destructive text-xs">
              {errors.userName?.message}
            </p>
          </div>
          {!values ? (
            <div className="flex flex-col space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                {...register("password")}
                placeholder="123456789V"
              />
              <p className="text-destructive text-xs">
                {errors.password?.message}
              </p>
            </div>
          ) : null}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="userRole">Is active</Label>
            <Select onValueChange={(e) => setValue("isActive", e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-destructive text-xs">
              {errors.isActive?.message}
            </p>
          </div>
          {!values ? (
            <>
              <div className="flex flex-col space-y-2 ">
                <Label htmlFor="customer">Customer</Label>
                <CustomerComBox setCustomer={setCustomer} />
                <p className="text-destructive text-xs">
                  {errors.CustomerId?.message}
                </p>
              </div>

              <div className="flex items-center col-span-2">
                <p>
                  Customer:
                  {customer ? customer.firstName : <>Select customer</>}
                </p>
              </div>
            </>
          ) : null}
          <div className="flex flex-col space-y-2 ">
            <Label htmlFor="store">Store</Label>
            <StoreComBox setStore={setStore} />
            <p className="text-destructive text-xs">
              {errors.StoreId?.message}
            </p>
          </div>

          <div className="flex items-center col-span-2">
            <p>Store: {store ? store.storeName : <>Select customer</>}</p>
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

export default UserForm;

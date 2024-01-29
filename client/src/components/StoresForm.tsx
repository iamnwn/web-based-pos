import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AxiosResponse, AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import StoresService from "@/services/StoresServise";

import * as Yup from "yup";

const schema = Yup.object().shape({
  storeName: Yup.string().required("Store Name is required"),
  storeLocation: Yup.string().required("Store Location is required"),
});

type formType = {
  storeName: string;
  storeLocation: string;
};

const StoreForm = ({ values }) => {
  const { register, handleSubmit, setValue, formState } = useForm<formType>({
    resolver: yupResolver(schema),
  });

  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (values) {
      setValue("storeName", values.getValue("storeName"));
      setValue("storeLocation", values.getValue("storeLocation"));
    }
  }, []);

  const { toast } = useToast();

  const onSubmit = async (data: formType) => {
    console.log(data);

    if (values) {
      const id = values.getValue("id");
      await StoresService.updateStore(id, data)
        .then((response: AxiosResponse) => {
          toast({
            variant: "success",
            title: "Success",
            description: response?.message,
          });
        })
        .catch((reason: AxiosError) => {
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
      StoresService.createStore(data)
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
            <Label htmlFor="storeName">Store Name</Label>
            <Input {...register("storeName")} placeholder="New Store" />
            <p className="text-destructive text-xs">
              {errors.storeName?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="storeLocation">Store Location</Label>
            <Input {...register("storeLocation")} placeholder="Godakawela" />
            <p className="text-destructive text-xs">
              {errors.storeLocation?.message}
            </p>
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

export default StoreForm;

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
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ProductComBox from "./ProductComBox";

type formType = {
  id: number;
  batch: number;
  barcode: number;
  quantityInStock: number;
  boughtPrice: number;
  unitPrice: number;
  maxDiscount: number;
  available: boolean;
  defaultDiscount: number;
  ProductId: number;
};

const StockForm = ({ values }) => {
  const STOCK_URL = "/api/stock";
  const axiosPrivate = useAxiosPrivate();

  const [product, setProduct] = useState({
    id: "",
    productName: "",
  });

  const { register, handleSubmit, setValue, formState } = useForm<formType>({
    // resolver: yupResolver(schema),
  });

  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (values) {
      setProduct({
        id: values.getValue("ProducId"),
        productName: values.getValue("productName"),
      });
      setValue("id", values.getValue("id"));
      setValue("barcode", values.getValue("barcode"));
      setValue("quantityInStock", values.getValue("quantityInStock"));
      setValue("boughtPrice", values.getValue("boughtPrice"));
      setValue("unitPrice", values.getValue("unitPrice"));
      setValue("maxDiscount", values.getValue("maxDiscount"));
      setValue("defaultDiscount", values.getValue("defaultDiscount"));
    }
  }, []);

  useEffect(() => {
    setValue("ProductId", product.id);
  }, [product]);

  const { toast } = useToast();

  const onSubmit = async (data: formType) => {
    console.log(data);

    if (values) {
      const id = values.getValue("id");
      axiosPrivate
        .put(`${STOCK_URL}/${id}`, data)
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
        .post(STOCK_URL, data)
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
          {!values ? (
            <>
              <div className="flex flex-col space-y-2 ">
                <Label htmlFor="product">Product</Label>
                <ProductComBox setProduct={setProduct} />
                <p className="text-destructive text-xs">
                  {errors.ProductId?.message}
                </p>
              </div>

              <div className="flex items-center col-span-2">
                <p>
                  Product:
                  {product ? product.productName : <>Select customer</>}
                </p>
              </div>
            </>
          ) : null}

          <div className="flex flex-col space-y-2 ">
            <Label htmlFor="batch">Batch</Label>
            <Input {...register("batch")} placeholder="123456789V" />
            <p className="text-destructive text-xs">{errors.batch?.message}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="barcode">Barcode</Label>
            <Input {...register("barcode")} placeholder="1234567890" />
            <p className="text-destructive text-xs">
              {errors.barcode?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="quantityInStock">Qty</Label>
            <Input {...register("quantityInStock")} placeholder="Quantity" />
            <p className="text-destructive text-xs">
              {errors.quantityInStock?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="boughtPrice">Bought price</Label>
            <Input {...register("boughtPrice")} placeholder="Price" />
            <p className="text-destructive text-xs">
              {errors.boughtPrice?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="unitPrice">Unit price</Label>
            <Input {...register("unitPrice")} placeholder="Price" />
            <p className="text-destructive text-xs">
              {errors.unitPrice?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="maxDiscount">Max discount</Label>
            <Input {...register("maxDiscount")} placeholder="100%" />
            <p className="text-destructive text-xs">
              {errors.maxDiscount?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="defaultDiscount">Default discount</Label>
            <Input {...register("defaultDiscount")} placeholder="100%" />
            <p className="text-destructive text-xs">
              {errors.defaultDiscount?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="userRole">Is available</Label>
            <Select onValueChange={(e) => setValue("available", e)}>
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
              {errors.available?.message}
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

export default StockForm;

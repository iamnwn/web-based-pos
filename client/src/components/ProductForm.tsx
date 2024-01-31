import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { CreateSchema } from "@/schema/CustomerSchema";
import CategoryComBox from "./CategoryComBox";

import useAxiosPrivate from "@/hooks/useAxiosPrivate";

type formType = {
  id: number;
  productName: string;
  productDetails: string;
  ProductCategoryId: string;
};

const ProductForm = ({ values }) => {
  const axiosPrivate = useAxiosPrivate();
  const PRODUCT_URL = "/api/product";
  const { register, handleSubmit, setValue, formState, reset } =
    useForm<formType>({
      // resolver: yupResolver(CreateSchema),
    });
  const { errors, isSubmitting } = formState;
  const [category, setCategory] = useState({
    id: "",
    categoryName: "",
  });

  useEffect(() => {
    if (values) {
      setValue("id", values.getValue("id"));
      setValue("productName", values.getValue("productName"));
      setValue("productDetails", values.getValue("productDetails"));
      setValue("ProductsCategoryId", values.getValue("ProductsCategoryId"));
    }
  }, []);

  useEffect(() => {
    setValue("ProductsCategoryId", category.id);
  }, [category]);

  const { toast } = useToast();

  const onSubmit = async (data: FieldValues) => {
    if (values) {
      const id = values.getValue("id");
      await axiosPrivate
        .put(`${PRODUCT_URL}/${id}`, data)
        .then((e) => {
          toast({
            variant: "success",
            title: "Success",
            description: e.data.message,
          });
          reset();
        })
        .catch((err) => {
          console.log(err);
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
      await axiosPrivate
        .post(PRODUCT_URL, data)
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
            <Label htmlFor="productName">Product name</Label>
            <Input {...register("productName")} placeholder="Banana" />
            <p className="text-destructive text-xs">
              {errors.productName?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="productDetails">Product details</Label>
            <Input {...register("productDetails")} placeholder="Fruit" />
            <p className="text-destructive text-xs">
              {errors.productDetails?.message}
            </p>
          </div>
          <div className="flex flex-col space-y-2 ">
            <Label htmlFor="category">Category</Label>
            <CategoryComBox setCategory={setCategory} />
            <p className="text-destructive text-xs"></p>
          </div>
          <p>Category: {category ? category.categoryName : null}</p>

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

export default ProductForm;

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { FieldValues, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

type formType = {
  id: number;
  categoryName: string;
};

const ProductCategoryForm = () => {
  const axiosPrivate = useAxiosPrivate();
  const PRODUCT_CATEGORY_URL = "/api/productcategory";
  const { register, handleSubmit, formState, reset } = useForm<formType>({});
  const { errors, isSubmitting } = formState;

  const { toast } = useToast();

  const onSubmit = async (data: FieldValues) => {
    await axiosPrivate
      .post(PRODUCT_CATEGORY_URL, data)
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
  };

  return (
    <Card className="bg-black text-white border-none max-w-[500px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 w-full place-content-stretch gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="categoryName">Category name</Label>
            <Input {...register("categoryName")} placeholder="Banana" />
            <p className="text-destructive text-xs">
              {errors.categoryName?.message}
            </p>
          </div>

          <div className="grid content-center ">
            <Button
              type="submit"
              className="w-full h-full"
              disabled={isSubmitting}>
              Add
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default ProductCategoryForm;

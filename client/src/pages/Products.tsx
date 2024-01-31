import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ProductCategoryForm from "@/components/ProductCategoryForm";
import ProductForm from "@/components/ProductForm";
import ProductTable from "@/components/ProductsTable";
const Products = () => {
  return (
    <div className="flex-cols m-5 ">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="outline outline-gray-500 outline-[1px]">
            Add Category +
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={"start"}
          className="w-auto outline-gray-500 outline-[1px] ">
          <ProductCategoryForm />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="ml-10 outline outline-gray-500 outline-[1px]">
            Add Product +
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={"start"}
          className="w-auto outline-gray-500 outline-[1px] ">
          <ProductForm values={null} />
        </PopoverContent>
      </Popover>

      <ProductTable />
    </div>
  );
};

export default Products;

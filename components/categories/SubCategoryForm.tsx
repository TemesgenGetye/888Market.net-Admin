"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Pencil, Plus, ShoppingBag } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SubmitButton from "../SubmitButton";
import { useCategories } from "@/hooks/useCategories";
import { useSubCategories } from "@/hooks/useSubCategories";
import { useSearchParams } from "next/navigation";

export default function SubCategoryForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    subCategories,
    isCreatingSubCat,
    isUpdating,
    createSubCat,
    updateSubCat,
  } = useSubCategories();
  const { categories } = useCategories();

  const subCategory = subCategories?.find((scat: any) => scat.id == id);
  const thumbnail = useRef<HTMLInputElement>(null);
  const [thumbnailFile, setThumbnailFile] = useState<any | null>(null);
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: subCategory,
  });

  const onSubmit = (data: any) => {
    const {
      name,
      category: { id: category_id },
    } = data;
    const img = thumbnailFile?.file;
    const categoryData = {
      name,
      img,
      category_id,
      delImg: "",
    };
    if (id)
      categoryData.delImg = thumbnailFile?.file ? subCategory?.imgUrl : "";
    id ? updateSubCat({ ...categoryData, id }) : createSubCat(categoryData);
  };

  return (
    <div className="max-w-5xl p-6 bg-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href={"/subcategories"}
              className="size-10 rounded-full hover:bg-blue-100 grid place-items-center"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Link>
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-gray-700" />
              <h1 className="text-xl font-medium text-gray-700">
                {id ? "Edit existing sub-category" : "Add New Sub Category"}
              </h1>
            </div>
          </div>
          <div className="flex gap-4">
            <SubmitButton
              isLoading={id ? isUpdating : isCreatingSubCat}
              label={id ? "Edit Sub-Category" : "Add Sub-Category"}
            />
          </div>
        </div>
        <div>
          <div className="max-w-5xl space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-medium mb-4">
                Sub Category Information
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="productName" className="block mb-2">
                    Name
                  </Label>
                  <Input
                    id="productName"
                    className="bg-gray-100 border-0"
                    placeholder="Category Name"
                    {...register("name", { required: true })}
                  />
                </div>
                <div>
                  <Label htmlFor="productDescription" className="block mb-2">
                    Select Category
                  </Label>
                  <Controller
                    name="category.name"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          const cat = categories?.find(
                            (c) => c.name.toLowerCase() === value.toLowerCase()
                          );
                          field.onChange(value); 
                          setValue("category.id", cat?.id);
                        }}
                      >
                        <SelectTrigger className="bg-gray-100 border-0">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((cat: any) => (
                            <SelectItem value={cat.name} key={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="productDescription" className="block mb-2">
                    Thumbnail
                  </Label>
                  <div className="flex items-center gap-4">
                    {thumbnailFile?.url ? (
                      <Image
                        src={thumbnailFile.url || "/images/placeholder.png"}
                        alt="Thumbnail"
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    ) : subCategory?.imgUrl ? (
                      <div className="relative">
                        <Image
                          src={subCategory?.imgUrl}
                          alt="Thumbnail"
                          width={200}
                          height={200}
                          className="rounded-lg"
                        />
                        <button
                          className="rounded-lg p-1 absolute top-0 -right-5 bg-gray-50 border border-blue-400"
                          onClick={(e) => {
                            e.preventDefault();
                            thumbnail.current?.click();
                          }}
                        >
                          <Pencil className="h-5 w-5 text-blue-400" />
                        </button>
                      </div>
                    ) : (
                      <button
                        className="border border-gray-200 rounded-lg p-2 min-w-[80px] h-[80px] flex items-center justify-center bg-gray-50"
                        onClick={(e) => {
                          e.preventDefault();
                          thumbnail.current?.click();
                        }}
                      >
                        <Plus className="h-6 w-6 text-gray-400" />
                      </button>
                    )}
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      ref={thumbnail}
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []).map(
                          (file) => ({ file, url: URL.createObjectURL(file) })
                        );
                        setThumbnailFile(files[0]);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

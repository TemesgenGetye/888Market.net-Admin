"use client";

import { useRef, useState } from "react";
import { ArrowLeft, Pen, Pencil, Plus, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useCategories } from "@/hooks/useCategories";
import SubmitButton from "../SubmitButton";
import { useParams, useSearchParams } from "next/navigation";

interface catData {
  img: File;
  icon: File;
  name: string;
  delImgs: string[];
}

export default function CategoryForm() {
  const { categories } = useCategories();
  const {
    isCreatingCategory,
    createCategory,
    updateCategory,
    isUpdatingCategory,
  } = useCategories();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const category = categories?.find((scat) => scat.id == id);

  const thumbnail = useRef<HTMLInputElement>(null);
  const [thumbnailFile, setThumbnailFile] = useState<any | null>(null);
  const icon = useRef<HTMLInputElement>(null);
  const [iconFile, setIconFile] = useState<any | null>(null);

  const { register, handleSubmit } = useForm({
    defaultValues: category,
  });
  const onSubmit = (data: any) => {
    const { name } = data;
    const img = thumbnailFile?.file;
    const icon = iconFile?.file;
    const categoryData: catData = {
      name,
      img,
      icon,
      delImgs: [],
    };

    if (id) {
      if (iconFile?.file) categoryData.delImgs.push(category?.iconUrl);
      if (thumbnailFile?.file) categoryData.delImgs.push(category?.imgUrl);
    }

    id ? updateCategory({ ...categoryData, id }) : createCategory(categoryData);
  };

  return (
    <div className="max-w-5xl p-6 bg-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href={"/categoriees"}
              className="size-10 rounded-full hover:bg-blue-100 grid place-items-center"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Link>
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-gray-700" />
              <h1 className="text-xl font-medium text-gray-700">
                {id ? "Edit existing category" : "Add new category"}
              </h1>
            </div>
          </div>
          <div className="flex gap-4">
            <SubmitButton
              isLoading={id ? isUpdatingCategory : isCreatingCategory}
              label={id ? "Edit Category" : "Add Category"}
            />
          </div>
        </div>

        <div>
          <div className="max-w-5xl space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-medium mb-4">Category Information</h2>
              <div className="space-y-10">
                <div>
                  <Label htmlFor="productName" className="block mb-2">
                    Name
                  </Label>
                  <Input
                    id="productName"
                    defaultValue={category?.name}
                    className="bg-gray-100 border-0"
                    placeholder="Category Name"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="space-y-4">
                  <Label htmlFor="productDescription" className="block mb-2">
                    Category Icon
                  </Label>
                  <div className="flex items-center gap-4">
                    {iconFile?.url ? (
                      <Image
                        src={iconFile.url}
                        alt="Thumbnail"
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    ) : category?.iconUrl ? (
                      <div className="relative">
                        <Image
                          src={category?.iconUrl}
                          alt="Thumbnail"
                          width={200}
                          height={200}
                          className="rounded-lg"
                        />
                        <button
                          className="rounded-lg p-1 absolute top-0 -right-5 bg-gray-50 border border-blue-400"
                          onClick={(e) => {
                            e.preventDefault();
                            icon.current?.click();
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
                          icon.current?.click();
                        }}
                      >
                        <Plus className="h-6 w-6 text-gray-400" />
                      </button>
                    )}

                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      ref={icon}
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []).map(
                          (file) => ({ file, url: URL.createObjectURL(file) })
                        );
                        setIconFile(files[0]);
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-4">
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
                    ) : category?.imgUrl ? (
                      <div className="relative">
                        <Image
                          src={category?.imgUrl}
                          alt="Thumbnail"
                          width={200}
                          height={200}
                          className="rounded-lg"
                        />
                        <button
                          className="border border-blue-400 rounded-lg p-1 absolute top-0 -right-5 bg-gray-50"
                          onClick={(e) => {
                            e.preventDefault();
                            thumbnail.current?.click();
                          }}
                        >
                          <Pencil className="h-5 w-5 text-blue-400" />
                          {/* <p className="text-xs">EDIT</p> */}
                        </button>
                      </div>
                    ) : (
                      <button
                        className="rounded-lg p-2 min-w-[80px] h-[80px] flex items-center justify-center bg-gray-50 border border-gray-50"
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

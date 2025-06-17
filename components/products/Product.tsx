"use clinet";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MoreVertical, Pen, Pencil, Trash } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import ProductTypes from "./type";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import Modal from "../Modal";

interface ProductComponentProps {
  product: ProductTypes;
  key: number;
  checked?: boolean;
  removeFromDeleteList?: (id: number) => void;
}

export default function Product({
  product,
  checked,
  removeFromDeleteList,
}: ProductComponentProps) {
  const {
    id,
    imgUrls,
    name,
    category,
    subcategory,
    price: { discounted, currency },
    stock = 12,
  } = product;
  const { deleteProduct, isDeletingProduct } = useProducts();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const categoryName = category?.name ?? "";
  const subcategoryName = subcategory?.name ?? "";
  const [checkedState, setCheckedState] = useState(checked || false);
  const router = useRouter();

  useEffect(() => {
    setCheckedState((state) => (checked !== undefined ? checked : state));
  }, [checked]);

  return (
    <tr className="border-b border-gray-100 relative">
      <td className="p-4">
        <Checkbox
          checked={checkedState}
          onClick={() => {
            setCheckedState((state) => !state);
            if (checkedState) removeFromDeleteList?.(id);
          }}
        />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-md">
            <Image
              src={
                imgUrls[0] ||
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=320&q=80"
              }
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <span className="font-medium">{name}</span>
        </div>
      </td>
      <td className="p-4 text-sm">{categoryName}</td>
      <td className="p-4 text-sm">{subcategoryName}</td>
      <td className="p-4 font-medium">
        <span className="">{discounted}</span>
        <span className="text-xs font-bold">{currency.toUpperCase()}</span>
      </td>
      <td className="p-4 text-sm">{stock}</td>
      <td className="p-4">
        <Badge
          className={`${
            stock > 20
              ? "bg-green-100 text-green-600 hover:bg-green-100"
              : stock === 0
              ? "bg-red-100 text-red-600 hover:bg-red-100"
              : "bg-yellow-100 text-yellow-600 hover:bg-yellow-100"
          }`}
        >
          {stock > 20 ? "In stock" : stock === 0 ? "Out of stock" : "Low stock"}
        </Badge>
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200"
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            <Trash size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-200"
            onClick={() => router.push(`/products/new?pid=${id}`)}
          >
            <Pencil size={16} />
          </Button>
        </div>
      </td>
      {}

      {isModalVisible && (
        <td>
          <Modal
            isVisible={isModalVisible}
            title="Confirm Deletion"
            description="Are you sure you want to delete the product? This action cannot be undone."
            confirmLable="Delete"
            isLoading={isDeletingProduct}
            onConfirm={() => {
              deleteProduct(id);
            }}
            onCancel={() => setIsModalVisible(false)}
          />
        </td>
      )}
    </tr>
  );
}

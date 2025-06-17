"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { CategoryType } from "./type";
import { useCategories } from "@/hooks/useCategories";
import Modal from "../Modal";

interface CategoryProps {
  category: CategoryType;
  key: number;
  checked?: boolean;
  removeFromDeleteList?: (id: number) => void;
}

export default function Category({
  category,
  checked,
  removeFromDeleteList,
}: CategoryProps) {
  const { deleteCategory, isDeletingCategory } = useCategories();
  const { imgUrl, name, iconUrl, id } = category;
  const [checkedState, setCheckedState] = useState<boolean>(checked || false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setCheckedState((state) => (checked !== undefined ? checked : state));
  }, [checked]);

  return (
    <tr className="border-b border-gray-100">
      <td className="p-4">
        <Checkbox
          className="accent-blue-600"
          checked={checkedState}
          onClick={() => {
            setCheckedState((state) => !state);
            if (checkedState) removeFromDeleteList?.(id);
          }}
        />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-md">
            <Image
              src={imgUrl || "thumnailUrl"}
              alt={`${name.slice(0, 3)}-thumbnail`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-md">
            <Image
              src={iconUrl || "iconUrl"}
              alt={`${name.slice(0, 3)}-icon`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </td>
      <td className="p-4 text-sm">{name}</td>
      <td className="p-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200"
            onClick={() => setIsModalVisible(true)}
          >
            <Trash size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-200"
          >
            <Pencil size={16} />
          </Button>
        </div>
      </td>
      {isModalVisible && (
        <td>
          <Modal
            isVisible={isModalVisible}
            title="Confirm Deletion"
            description="Are you sure you want to delete the product? This action cannot be undone."
            confirmLable="Delete"
            isLoading={isDeletingCategory}
            onConfirm={() => {
              deleteCategory(id);
            }}
            onCancel={() => setIsModalVisible(false)}
          />
        </td>
      )}
    </tr>
  );
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  deleteMultipleCategories,
  getCategories,
  postCategory,
  deleteCategory as removeCategories,
  updateCategory as updateCategoryApi,
} from "@/lib/api/category";
import camelCase from "@/utils/camelCase";
import { useRouter } from "next/navigation";

export function useCategories() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createCategory, isPending: isCreatingCategory } = useMutation(
    {
      mutationFn: postCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        router.push("/categoriees");
        toast.success("Category created successfully");
      },
      onError: (err: any) => {
        console.error("Login Error:", err?.message || "Unknown Error");
        toast.error("Error creating category");
      },
    }
  );

  const { mutate: deleteCateogries, isPending: isDeletingCategories } =
    useMutation({
      mutationFn: deleteMultipleCategories,
      onSuccess: (data: any[]) => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        toast.success(`${data?.length ?? 0} categories successfully deleted.`);
      },
      onError: (err: any) => {
        console.error("Bulk Delete Error:", err?.message || "Unknown Error");
        toast.error("An error occurred while deleting multiple categories.");
      },
    });

  const {
    isLoading: isLoadingCategories,
    data,
    isError,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const categories = data?.map((category: any) => {
    return camelCase(category);
  });

  const { mutate: deleteCategory, isPending: isDeletingCategory } = useMutation(
    {
      mutationFn: removeCategories,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        toast.success("Category succesfully deleted.");
      },
      onError: (err: any) => {
        console.error("Login Error:", err?.message || "Unknown Error");
        toast.error("An error occured while trying to delete the category.");
      },
    }
  );

  const { mutate: updateCategory, isPending: isUpdatingCategory } = useMutation(
    {
      mutationFn: updateCategoryApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
        toast.success("Category successfully updated.");
      },
    }
  );

  return {
    isLoadingCategories,
    categories,
    isError,
    isDeletingCategories,
    isDeletingCategory,
    isCreatingCategory,
    isUpdatingCategory,
    createCategory,
    refetchCategories,
    deleteCategory,
    deleteCateogries,
    updateCategory,
  };
}

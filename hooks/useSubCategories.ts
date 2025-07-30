import {
  deleteMultipleSubCategories,
  getSubCategories,
  postSubCategory,
  deleteSubCategory as removeSubCategory,
  updateSubCategory,
} from "@/lib/api/subCategory";
import camelCase from "@/utils/camelCase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useSubCategories() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createSubCat, isPending: isCreatingSubCat } = useMutation({
    mutationFn: postSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      queryClient.invalidateQueries({ queryKey: ["sub-categories"] });
      router.push("/subcategories");
      toast.success("SubCategory created successfully");
    },
    onError: (err: any) => {
      console.error("Login Error:", err?.message || "Unknown Error");
      toast.error("Error creating subcategory");
    },
  });
  const { mutate: deleteSubCategory, isPending: isDeletingSubCategory } =
    useMutation({
      mutationFn: removeSubCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["login"] });
        queryClient.invalidateQueries({ queryKey: ["sub-categories"] });
        toast.success("Sub-category deleted succesfully!");
      },
      onError: (err: any) => {
        console.error("Login Error:", err?.message || "Unknown Error");
        toast.error("An error occured while trying to delete a subcategory.");
      },
    });

  const { mutate: deleteSubCateogries, isPending: isDeletingSubCategories } =
    useMutation({
      mutationFn: deleteMultipleSubCategories,
      onSuccess: (data: any[]) => {
        queryClient.invalidateQueries({ queryKey: ["sub-categories"] });
        toast.success(`${data?.length ?? 0} categories successfully deleted.`);
      },
      onError: (err: any) => {
        console.error("Bulk Delete Error:", err?.message || "Unknown Error");
        toast.error("An error occurred while deleting multiple categories.");
      },
    });

  const { mutate: updateSubCat, isPending: isUpdating } = useMutation({
    mutationFn: updateSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sub-categories"] });
      toast.success("Subcategory succesfully updated.");
    },
  });

  const {
    isLoading: isLoadingSubCategories,
    data,
    isError,
    refetch: refetchSubCategories,
  } = useQuery({
    queryKey: ["sub-categories"],
    queryFn: getSubCategories,
  });
  const subCategories = data?.map((subCategory: any) => {
    return camelCase(subCategory);
  });

  return {
    isLoadingSubCategories,
    subCategories,
    isError,
    isCreatingSubCat,
    createSubCat,
    refetchSubCategories,
    deleteSubCategory,
    deleteSubCateogries,
    updateSubCat,
    isUpdating,
    isDeletingSubCategory,
    isDeletingSubCategories,
  };
}

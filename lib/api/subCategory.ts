import { deleteImage, uploadImage } from "@/utils/image";
import supabase from "../config/supabase";

export const getSubCategories = async () => {
  try {
    const { data, error } = await supabase.from("subcategories").select(`
      id,
      name,
      img_url,
      category:categories ( 
        id,
        name
      )
    `);
    if (error) throw new Error(error?.message);

    return data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

export const postSubCategory = async (subCategory: any) => {
  try {
    const { name, img, category_id } = subCategory;
    const img_url = await uploadImage(img, "subcategories");
    const { data, error } = await supabase
      .from("subcategories")
      .insert([{ name, img_url, category_id }])
      .select();

    if (error) throw new Error(error?.message);

    return data;
  } catch (err) {
    console.error("Error creating category:", err);
    return err;
  }
};

export const deleteSubCategory = async (id: number) => {
  try {
    const { error } = await supabase
      .from("subcategories")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error?.message);

    return true;
  } catch (err) {
    console.error("Error deleting category:", err);
    return err;
  }
};

export const deleteMultipleSubCategories = async (ids: number[]) => {
  try {
    // Step 1: Fetch img_url for each subcategory
    const { data, error: fetchError } = await supabase
      .from("subcategories")
      .select("img_url")
      .in("id", ids);

    if (fetchError) throw new Error(fetchError.message);

    // Step 2: Delete image from Supabase storage
    for (const subcategory of data || []) {
      const url = subcategory.img_url;
      if (url) {
        await deleteImage(url, "subcategories"); // Adjust 'subcategories' as needed for your bucket/folder name
      }
    }

    // Step 3: Delete subcategories from the table
    const { data: deletedSubCategories, error } = await supabase
      .from("subcategories")
      .delete()
      .in("id", ids)
      .select();

    if (error) throw new Error(error.message);

    return deletedSubCategories;
  } catch (err) {
    console.error("Error deleting multiple subcategories:", err);
    throw err;
  }
};

export const updateSubCategory = async (subCategory: any) => {
  try {
    const { id, name, img, category_id, delImg } = subCategory;
    const img_url = img ? await uploadImage(img, "subcategories") : undefined;
    delImg && deleteImage(delImg, "subcategories");
    const { data, error } = await supabase
      .from("subcategories")
      .update({ name, img_url, category_id })
      .eq("id", id)
      .select();

    if (error) throw new Error(error?.message);

    return data;
  } catch (err) {
    console.error("Error updating category:", err);
    return err;
  }
};

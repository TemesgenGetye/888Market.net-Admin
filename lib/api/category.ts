import { deleteImage, uploadImage } from "@/utils/image";
import supabase from "../config/supabase";

export const getCategories = async () => {
  try {
    const { data, error } = await supabase.from("categories").select(`
      id,
      name,
      img_url,
      icon_url
    `);
    if (error) throw new Error(error?.message);

    return data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

export const postCategory = async (category: any) => {
  try {
    const { name, img, icon } = category;
    const img_url = await uploadImage(img, "categories");
    const icon_url = await uploadImage(icon, "categories");
    console.log(img_url);
    const { data, error } = await supabase
      .from("categories")
      .insert([{ name, img_url, icon_url }])
      .select();

    if (error) throw new Error(error?.message);

    return data;
  } catch (err) {
    console.error("Error creating category:", err);
    throw err;
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const { data, error: fetchError } = await supabase
      .from("categories")
      .select("img_url, icon_url")
      .eq("id", id)
      .single();

    if (fetchError) throw new Error(fetchError.message);

    const imgUrl = data?.img_url;
    const iconUrl = data?.icon_url;

    if (imgUrl) {
      await deleteImage(imgUrl, "categories");
    }

    if (iconUrl) {
      await deleteImage(iconUrl, "categories");
    }

    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw new Error(error.message);

    return true;
  } catch (err) {
    console.error("Error deleting category:", err);
    throw err;
  }
};

export const deleteMultipleCategories = async (ids: number[]) => {
  try {
    // Step 1: Fetch icon_url and img_url for each category
    const { data, error: fetchError } = await supabase
      .from("categories")
      .select("icon_url, img_url")
      .in("id", ids);
    console.log(data);

    if (fetchError) throw new Error(fetchError.message);

    // Step 2: Delete images from Supabase storage
    for (const category of data || []) {
      const urls = [category.icon_url, category.img_url].filter(Boolean); // filter out null/undefined
      for (const url of urls) {
        await deleteImage(url, "categories"); // Assumes 'categories' is the bucket or folder name
      }
    }

    // Step 3: Delete categories from the table
    const { data: deletedCategories, error } = await supabase
      .from("categories")
      .delete()
      .in("id", ids)
      .select();

    if (error) throw new Error(error.message);

    return deletedCategories;
  } catch (err) {
    console.error("Error deleting multiple categories:", err);
    throw err;
  }
};

export const updateCategory = async (category: any) => {
  try {
    const { name, img, icon, id, delImgs } = category;
    for (const url of delImgs) {
      await deleteImage(url, "categories");
    }
    const img_url = img ? await uploadImage(img, "categories") : undefined;
    const icon_url = icon ? await uploadImage(icon, "categories") : undefined;

    const { data, error } = await supabase
      .from("categories")
      .update({ name, img_url, icon_url })
      .eq("id", id);

    if (error) throw new Error(error?.message);

    return data;
  } catch (err) {
    console.error("Error updating category:", err);
  }
};

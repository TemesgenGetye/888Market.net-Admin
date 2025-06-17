export interface CategoryType {
  name: string;
  id: number;
  imgUrl: string | null;
  iconUrl: string | null;
}

export interface SubCategoryType {
  name: string;
  id: number;
  imgUrl: string | null;
  category: {
    id: number;
    name: string;
  };
}

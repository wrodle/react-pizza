export enum SortEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
}

export type SortType = {
  name: string;
  sort: SortEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortType;
}

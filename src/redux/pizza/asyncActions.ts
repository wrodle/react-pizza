import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SearchPizzaParams } from "./slice";
import { Pizza } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { currentPage, categoryId, sortBy, orderBy, search } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://62beee990bc9b125616319d8.mockapi.io/items?limit=4${
        categoryId + sortBy + orderBy + search + currentPage
      }`
    );
    return data;
  }
);

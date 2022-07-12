import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPizzas } from "./asyncActions";
import { Pizza, PizzaSliceState, Status } from "./types";

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export type SearchPizzaParams = {
  sortBy: string;
  orderBy: string;
  categoryId: string;
  search: string;
  currentPage: string;
};

const pizzaSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<Pizza[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      }
    );
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

export default pizzaSlice.reducer;

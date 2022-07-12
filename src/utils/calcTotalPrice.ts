import { CartItem } from "../redux/cart/types";

export const totalPrice = (items: CartItem[]) =>
  items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);

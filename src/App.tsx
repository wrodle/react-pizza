import { FC, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);
const FullPizza = lazy(
  () => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza")
);

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;

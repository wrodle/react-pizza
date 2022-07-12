import React, { FC, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

import { useAppDispatch } from "../redux/store";
import { selectPizza } from "../redux/pizza/selectors";
import { selectFilter } from "../redux/filter/selectors";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { SearchPizzaParams } from "../redux/pizza/slice";
import { setCategoryId, setFilters } from "../redux/filter/slice";

const Home: FC = () => {
  const searchValue = useSelector((state: any) => state.filter.searchValue);
  const navigate = useNavigate();
  const { categoryId, sort, currentPage } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const getPizzas = async () => {
    const sortBy = `&sortBy=${sort.sort.replace("-", "")}`;
    const orderBy = `&order=${sort.sort.includes("-") ? "asc" : "desc"}`;
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const page = `&page=${currentPage}`;
    dispatch(
      fetchPizzas({
        sortBy,
        orderBy,
        categoryId: category,
        search,
        currentPage: page,
      })
    );
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort, searchValue, currentPage]);
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sort,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort.sort, currentPage]);
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;
      const sort = sortList.find((obj) => obj.sort === params.sortBy);
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const onChangeCategory = useCallback(
    (id: number) => dispatch(setCategoryId(id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClick={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading" ? skeletons : pizzas}
      </div>
      <Pagination />
    </>
  );
};

export default Home;

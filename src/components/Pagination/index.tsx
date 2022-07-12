import React, { FC } from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/filter/slice";

const Pagination: FC = () => {
  const currentPage = useSelector((state: any) => state.filter.currentPage);
  const dispatch = useDispatch();
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      forcePage={currentPage - 1}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel="<"
    />
  );
};

export default Pagination;

import React, { ChangeEvent, FC, useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";

import styles from "./Search.module.scss";
import closeIcon from "../../assets/img/icons/close.svg";
import searchIcon from "../../assets/img/icons/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../redux/filter/slice";

const Search: FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const searchValue = useSelector((state: any) => state.filter.searchValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const clickClose = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.icons__open} src={searchIcon} alt="search" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type="text"
        placeholder="поиск пиццы..."
      />
      {searchValue && (
        <img
          className={styles.icons__close}
          onClick={clickClose}
          src={closeIcon}
          alt="close"
        />
      )}
    </div>
  );
};

export default Search;

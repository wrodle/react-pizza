import React, { FC, memo } from "react";

type CategoriesProps = {
  value: number;
  onClick: (i: number) => void;
};

const Categories: FC<CategoriesProps> = memo(({ value, onClick }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClick(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;

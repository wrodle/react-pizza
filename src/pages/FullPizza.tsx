import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://62beee990bc9b125616319d8.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        console.log("Error");
      }
    }
    fetchPizza().then();
  }, [id]);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container full-pizza">
      <h2 className="full-pizza__text">{pizza.title}</h2>
      <h4 className="full-pizza__price">от {pizza.price} ₽</h4>
      <img className="full-pizza__img" src={pizza.imageUrl} alt="" />
    </div>
  );
};

export default FullPizza;

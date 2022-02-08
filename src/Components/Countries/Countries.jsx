import React, { useState, useEffect } from "react";
import axios from "axios";
import { Filter } from "./Filter";
import { Views } from "./Views";

export const Countries = () => {
  const [date, setDate] = useState([]);
  const [name, setname] = useState([]);
  const [filtro, setfiltro] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((result) => {
      /*  console.log(result.data); */
      setDate(result.data);
    });
  }, []);

  const newarray = date.map((element) => element.name.common);
  const search = (e) => {
    setfiltro(e.target.value);
    const filtercountries = newarray.filter((element) =>
      element.toLowerCase().includes(e.target.value)
    );
    setname(filtercountries);
  };

  return (
    <>
      <Filter filtro={filtro} search={search} name={name} />
      <ul>
        {name.length >= 10 ? (
          "Too many matches, specify another filter"
        ) : (
          <Views name={name} />
        )}
      </ul>
    </>
  );
};

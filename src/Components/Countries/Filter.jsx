import { Views } from "./Views";

export const Filter = ({ filtro, search, name }) => {

  return (
    <>
      find countries: <input value={filtro} onChange={search} />     
    </>
  );
};

/* name.map((Element) => {
  return <li key={Element}>{Element}</li>;
}) */
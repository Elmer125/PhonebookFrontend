import { Countriefilter } from "./Countriefilter";
import { ListCountries } from "./ListCountries";

export const Views = ({ name }) => {
  return (
    <>
      {name.length === 1 ? (
        <Countriefilter name={name} />
      ) : (
        name.map((element) => {
          return <ListCountries key={element} element={element} />;
        })
      )}
    </>
  );
};

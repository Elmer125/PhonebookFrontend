export function ListCountries({ element }) {
  const handleCountry = (e) => {
    console.log(e.target.value);
  };
  return (
    <>
      <li key={element}>
        {element}{" "}
        <button onClick={handleCountry} value={element}>
          show
        </button>
      </li>
    </>
  );
}

export const Filtro = ({ filtro, search }) => {
  return (
    <>
      filter shown with <input value={filtro} onChange={search} />
    </>
  );
};

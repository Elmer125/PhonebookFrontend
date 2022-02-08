export function Page({ countrie }) {
  return (
    <>
      <h3>Languages</h3>
      <ul>
        {Object.values(countrie).map((value) => {
          return <li key={value}>{value}</li>;
        })}
      </ul>
    </>
  );
}

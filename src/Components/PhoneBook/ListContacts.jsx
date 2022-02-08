
export const ListContact = ({ persons,deletePerson }) => {
 
  return (
    <>
      <ul>
        {persons.map((element) => {
          return (
            <li key={element.name}>
              {element.name} <br></br>
              {element.number}
              <button
                onClick={() => {
                  deletePerson(element.id, element.name);
                }}
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

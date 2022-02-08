import React, { useState, useEffect } from "react";
import { Filtro } from "./Filtro";
import { Form } from "./Form";
import { ListContact } from "./ListContacts";
import noteService from "../../services/notes";

export const PhoneBook = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filtro, setFiltro] = useState("");
  const [contact, setcontact] = useState([]);

  useEffect(() => {
    noteService.getAll().then((result) => {
      setPersons(result.data);
    });
  }, []);

  const handleContact = (e) => {
    setNewName(e.target.value);
  };
  const handlePhone = (e) => {
    setNewPhone(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    let search = persons.filter((persons) => persons.name === newName);

    if (search.length !== 0) {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one`
      );
      if (result) {
        const newObject = {
          name: newName,
          number: newPhone,
          id: search[0].id,
        };
        noteService.update(search[0].id, newObject).then((result) => getdate());
      }
      setNewName("");
      setNewPhone("");
    } else {
      const newPerson = { name: newName, number: newPhone };
      noteService.create(newPerson).then((result) => {
        setPersons(persons.concat(result.data));
        setcontact(persons.concat(result.data));
        setNewName("");
        setNewPhone("");
      });
    }
  };

  const search = (e) => {
    setFiltro(e.target.value);
    setcontact(
      persons.filter((elemnt) =>
        elemnt.name.toLowerCase().includes(e.target.value)
      )
    );
  };

  const getdate = () => {
    noteService.getAll().then((result) => {
      setcontact(result.data);
      setPersons(result.data);
    });
  };
  const deletePerson = (id, name) => {
    const resul = window.confirm(`Delete ${name} ?`);
    if (resul) {
      noteService.deletePerson(id).then((result) => {
        getdate();
      });
    }
  };

  return (
    <>
      <h2>PhoneBook</h2>
      <div>
        <Filtro filtro={filtro} search={search} />
      </div>
      <Form
        addPerson={addPerson}
        handlePhone={handlePhone}
        handleContact={handleContact}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <ListContact
        persons={contact.length === 0 ? persons : contact}
        deletePerson={deletePerson}
      />
    </>
  );
};

import React, { useState, useMemo, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import ContactTable from "./components/ContactTable";
import CreateContact from "./components/CreateContact";

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: "John Doe", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", phone: "987-654-3210" },
  ]);

  const addContact = useCallback((newContact) => {
    setContacts((prev) => [...prev, { id: Date.now(), ...newContact }]);
  }, []);

  const editContact = useCallback((id, updatedContact) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? updatedContact : c)));
  }, []);

  const deleteContact = useCallback((id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return (

      <Routes>
        <Route
          path="/"
          element={
            <ContactTable
              contacts={contacts}
              onEdit={editContact}
              onDelete={deleteContact}
            />
          }
        />
        <Route path="/create-contact" element={<CreateContact onAdd={addContact} />} />
      </Routes>

  );
};

export default App;
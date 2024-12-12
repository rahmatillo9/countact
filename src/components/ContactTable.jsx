import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";

const ContactTable = React.memo(({ contacts, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        contact.phone.includes(debouncedSearch)
    );
  }, [contacts, debouncedSearch]);

  const navigate = useNavigate();

  return (
    <div>
      <header className="bg-gray-100 p-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search contacts..."
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => navigate("/create-contact")}
        >
          Add Contact
        </button>
      </header>

      <table className="table-auto w-full mt-4 border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    const updatedName = prompt("Edit name", contact.name);
                    const updatedPhone = prompt("Edit phone", contact.phone);
                    if (updatedName && updatedPhone) {
                      onEdit(contact.id, { id: contact.id, name: updatedName, phone: updatedPhone });
                    }
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error ml-2"
                  onClick={() => onDelete(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default ContactTable;

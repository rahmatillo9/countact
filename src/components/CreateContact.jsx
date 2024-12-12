import React from "react";
import { useNavigate } from "react-router-dom";
import useGetInputValues from "../hooks/useGetInputValues";

const CreateContact = ({ onAdd }) => {
  const navigate = useNavigate();
  const { values, handleChange } = useGetInputValues({ name: "", phone: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(values);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-lg font-bold">Add New Contact</h2>
      <div className="form-control">
        <label>Name</label>
        <input
          type="text"
          name="name"
          className="input input-bordered"
          value={values.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-control">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          className="input input-bordered"
          value={values.phone}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-4">
        Save
      </button>
    </form>
  );
};

export default CreateContact;
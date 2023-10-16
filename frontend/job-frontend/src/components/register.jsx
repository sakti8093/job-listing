import React, { useEffect, useState } from "react";
const baseURL = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";
const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const handlChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseURL}/register`, data);
      if (res.status === 200) {
        alert("user successfully registered");
      }
    } catch (error) {
      console.log(error, "err");
    }
  };

  console.log(data);
  return (
    <form onSubmit={handleSubmit} onChange={handlChange}>
      <input type="text" placeholder="Name" name="name" />
      <input type="text" placeholder="Email" name="email" />
      <input type="text" placeholder="Mobile" name="mobile" />
      <input type="text" placeholder="Password" name="password" />
      <button>submit</button>
    </form>
  );
};

export default Register;

"use client"
import React, { useState } from 'react'

type FormProps = {
  submitData: (data: UserData) => void;
}


export type UserData = {
  username: string
}

export default function CreateUser({ submitData }: FormProps) {
  const [formData, setFormData] = useState<UserData>({
    username: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    console.log(name)
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitData(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Create User" />
    </form>
  )
}
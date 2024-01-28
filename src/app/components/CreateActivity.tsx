"use client"
import React, { useState } from 'react'

type FormProps = {
  submitData: (data: ActivityData) => void;
}


export type ActivityData = {
  activityDescription: string,
  completed: boolean
}

export default function CreateActivity({ submitData }: FormProps) {
  const [formData, setFormData] = useState<ActivityData>({
    activityDescription: "",
    completed: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitData(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Create new activity:
        <input
          type="text"
          name="activityDescription"
          value={formData.activityDescription}
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="Create Activity" />
    </form>
  )
}
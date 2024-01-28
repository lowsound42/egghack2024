"use client"
import { useState, useContext, useEffect } from "react";
import CreateUser, { UserData } from "./CreateUser";
import { IUser } from "../models/models";
import { v4 as uuidv4 } from 'uuid';
import UsersPhones from "./UsersPhones";
import { AppContext } from './AppContext';
export default function HomePage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const userContext = useContext(AppContext);

  const handleSubmit = (formData: UserData) => {
    let newUser: IUser = { username: formData.username, id: uuidv4(), assignedActivities: [] }

    setUsers(users => [...users, newUser]);
  };

  return (
    <AppContext.Provider value={users}>
      <main>
        {users.length <= 1 ? <CreateUser submitData={handleSubmit} /> : null}
        <UsersPhones setUsers={setUsers} users={users} />
      </main>
    </AppContext.Provider>
  );
}

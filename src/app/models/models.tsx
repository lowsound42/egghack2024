export interface IActivity {
  id: string,
  description: string,
  completed: boolean
}


export interface IUser {
  id: string,
  username: string,
  assignedActivities: IActivity[]
}


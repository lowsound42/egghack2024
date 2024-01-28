import React, { useState, useContext, useEffect } from 'react'
import styles from "./component.module.css"
import { IActivity, IUser } from '../models/models'
import CreateActivity, { ActivityData } from './CreateActivity'
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from './AppContext';

type Props = {
  users: IUser[],
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

type CompleteActivity = {
  user: IUser,
  activity: IActivity
}

type ActivityLifeCycle = {
  activityId: string,
  activityCompletedBy: string[],
  activityEnded: boolean
}

export default function UsersPhones({ users, setUsers }: Props) {
  const userContext = useContext(AppContext);



  const [activityAlerts, setActivityAlert] = useState<ActivityLifeCycle[]>([]);
  const handleSubmit = (formData: ActivityData) => {
    let newActivity: IActivity = { id: uuidv4(), description: formData.activityDescription, completed: formData.completed }

    setUsers(prevUser => {
      return prevUser.map((user, idx) => {
        return { ...prevUser[idx], assignedActivities: [...prevUser[idx].assignedActivities, newActivity] }
      })
    });
  };

  const completeTask = (activity: CompleteActivity) => {
    let userWhoCompletedTask: IUser = activity.user;
    let otherUser: IUser[] = users.filter(element => {
      return element.id != userWhoCompletedTask.id
    })

    let userList: IUser[] = users;

    if (userList.find(c => c.id === activity.user.id)) {
      userList.forEach(e => {
        e.assignedActivities.forEach(x => {
          if (x.id == activity.activity.id && e.id == userWhoCompletedTask.id) {
            x.completed = true;
          }
        })
      })
    }

    let listOfActiveTasks = activityAlerts;
    if (listOfActiveTasks.find(c => c.activityId === activity.activity.id)) {
      listOfActiveTasks.map(element => {
        if (element.activityId === activity.activity.id && !element.activityCompletedBy.find(c => c === userWhoCompletedTask.id)) {
          return element.activityCompletedBy.push(userWhoCompletedTask.id)
        }
      })
    } else {
      let newActivityCompletionObject: ActivityLifeCycle = {
        activityId: activity.activity.id,
        activityCompletedBy: [userWhoCompletedTask.id],
        activityEnded: false
      }
      listOfActiveTasks.push(newActivityCompletionObject);
    }
    setActivityAlert([...listOfActiveTasks])
  }

  return (
    <div className={styles.phoneContainer}>
      {users.map((element, i) => {
        return <div key={i} className={styles.userPhone}>
          <CreateActivity submitData={handleSubmit} />
          <div className={styles.activityContainer}>
            {element.assignedActivities.map((item, key) => {
              return <div className={`${styles.activity} ${(activityAlerts.find(x => x.activityId == item.id)?.activityCompletedBy?.find(x => x == element.id) == element.id) ? styles.completed : null} 
              ${(activityAlerts.find(x => x.activityId == item.id)?.activityCompletedBy?.find(x => x == element.id) === undefined && activityAlerts.find(x => x.activityId == item.id)) ? styles.friendComplete : null}
            }`}
                key={key}>
                <div className={styles.activityDescription}>
                  {item.description}
                </div>
                <button className={styles.activityCompleteButton} onClick={() => completeTask({ user: element, activity: item })}>Complete Task</button>
              </div>
            })}
          </div>
        </div>
      })}
    </div>
  )
}
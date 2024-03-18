import React from 'react'
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:4000";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import  useAuthContext  from '../hooks/useAuthContext';

const WorkoutDetails = ({ workout }) => {

    const {dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    const handleClick = async () =>{
        if (!user) {
            return;
        }
        try {
            const response = await axios.delete(`/api/workouts/${workout._id}`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
                dispatch({type: "DELETE_WORKOUT", payload: response.data})
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
    </div>
  )
}

export default WorkoutDetails

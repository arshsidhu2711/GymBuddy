import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import useAuthContext  from "../hooks/useAuthContext";

const Home = () => {
    // const [workouts, setWorkouts] = useState(null);
    const {workouts, dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();
    const fetchWorkouts = async () => {
        try {
            const response = await axios.get("/api/workouts",{
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            dispatch({type: "SET_WORKOUT" , payload : response.data});
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchWorkouts();
        }
    }, [user]);

    return (
        <div className="home">
            <div className="workouts">
                {workouts &&
                    workouts.map((workout) => (
                        <WorkoutDetails workout={workout} key={workout._id} />
                    ))}
            </div>
            <WorkoutForm/>
        </div>
    );
};

export default Home;

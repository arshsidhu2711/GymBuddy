import axios from "axios";
import { useState } from "react";
import React from "react";
axios.defaults.baseURL = "http://localhost:4000";

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import  useAuthContext  from "../hooks/useAuthContext";

const WorkoutForm = () => {
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const { dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError("You must be logged in");
            return;
        }

        const workout = { title, load, reps };
        try {
            const response = await axios.post("/api/workouts", workout, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            dispatch({ type: "CREATE_WORKOUT", payload: response.data });
            console.log(response);
            setTitle("");
            setLoad("");
            setReps("");
            setError(null);
            setEmptyFields([]);
        } catch (error) {
            setError(error.response.data.error);
            setEmptyFields(error.response.data.emptyFields);
            console.log(error.response.data.message);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Excersize Title:</label>
            <input
                type="text"
                onChange={(e) => {setTitle(e.target.value);
                    const index = emptyFields.indexOf("title");
                    if (index > -1) {
                        emptyFields.splice(index, 1);
                    }
                }}
                value={title}
                className={emptyFields.includes("title") ? "error" : ""}
            />

            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => {
                    setLoad(e.target.value);
                    const index = emptyFields.indexOf("load");
                    if (index > -1) {
                        emptyFields.splice(index, 1);
                    }
                }}
                value={load}
                className={emptyFields.includes("load") ? "error" : ""}
            />

            <label>Number of Reps:</label>
            <input
                type="number"
                onChange={(e) => {setReps(e.target.value);
                    const index = emptyFields.indexOf("reps");
                    if (index > -1) {
                        emptyFields.splice(index, 1);
                    }
                }}
                value={reps}
                className={emptyFields.includes("reps") ? "error" : ""}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default WorkoutForm;

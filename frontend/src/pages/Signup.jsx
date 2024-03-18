import React, { useEffect, useState } from "react";
import useSignup from "../hooks/useSignup";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup, isLoading, error, setError } = useSignup();
    const [passError, setPassError] = useState([]);

    const passCheck = (password) => {
        let passwordError = [];
        if (password.length < 8) {
            passwordError.push(`Password must be at least 8 characters long.`);
        }
        if (/[a-z]/.test(password) === false) {
            passwordError.push(
                `Password must contain at least 1 lowercase letter.`
            );
        }
        if (/[A-Z]/.test(password) === false) {
            passwordError.push(
                `Password must contain at least 1 uppercase letter.`
            );
        }
        if (/[0-9]/.test(password) === false) {
            passwordError.push(`Password must contain at least 1 number.`);
        }
        if (/[!@#$%^&*()\-__+.]/.test(password) === false) {
            passwordError.push(
                `Password must contain at least 1 special character.`
            );
        }
        return passwordError;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if(!name || !email || !password){
            setError("All fields are required");
            return;
        }
        const passwordError = passCheck(password);
        setPassError(passwordError);
        console.log(passError)
        if (passwordError.length === 0) {
            console.log("no errors");
            await signup(name, email, password);
        }
    };

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <label>Email address:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Sign up</button>
            {passError &&
                passError.map((error) => (
                    <div className="error" key={error}>
                        {error}
                    </div>
                ))}
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default Signup;

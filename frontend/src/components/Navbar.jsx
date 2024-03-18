import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";
const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const handleClick = () => {
        logout();
    };
    console.log(user);
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Gym Buddy</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span className="name">{user.name}</span>
                            <button onClick={handleClick}>Logout</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;

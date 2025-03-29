import { useState } from "react";
import { loginUser } from "../services/api";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUser(email, password);
            localStorage.setItem("token", data.token);
            alert("Login successful!");
            window.location.href = "/users";
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleLogin} className="max-w-md mx-auto p-4">
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded mb-2"
                required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                Login
            </button>
        </form>
    );
};

export default LoginForm;

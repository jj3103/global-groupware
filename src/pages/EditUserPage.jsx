import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUsers, updateUser } from "../services/api.js";
import { toast } from "react-hot-toast";

const EditUserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "" });

    useEffect(() => {
        const loadUser = async () => {
            try {
                const data = await fetchUsers();
                const foundUser = data.data.find((u) => u.id === parseInt(id));
                if (foundUser) {
                    setUser(foundUser);
                    setFormData({ first_name: foundUser.first_name, last_name: foundUser.last_name, email: foundUser.email });
                }
            } catch (error) {
                console.error("User not found.");
            }
        };
        loadUser();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(id, formData);

            setUser((prev) => ({ ...prev, ...formData }));
            navigate("/users");
        } catch (error) {
            console.error("Update failed:", error);
        }
    };


    if (!user) return <p className="text-center text-gray-600">Loading...</p>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Edit User</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditUserPage;

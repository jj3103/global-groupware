import { useState } from "react";
import { updateUser } from "../../services/api.js";

const UserForm = ({ user, onClose }) => {
    const [formData, setFormData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUser(user.id, formData);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-2">Edit User</h2>
            <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                required
            />
            <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                required
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
                required
            />
            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Update</button>
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-3 py-1 rounded ml-2">Cancel</button>
        </form>
    );
};

export default UserForm;

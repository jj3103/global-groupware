// import { useState, useEffect } from "react";
// import { fetchUsers, deleteUser } from "../../services/api.js";
// import UserCard from "./UserCard";
// import Pagination from "./Pagination";
// import { useNavigate } from "react-router-dom";

// const UserList = () => {
//     const [users, setUsers] = useState([]);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);

//     const navigate = useNavigate()

//     useEffect(() => {
//         const getUsers = async () => {
//             try {
//                 const data = await fetchUsers(page);
//                 setUsers(data.data);
//                 setTotalPages(data.total_pages);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };

//         getUsers();
//     }, [page]);

//     const handleDelete = async (id) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this user?");
//         if (confirmDelete) {
//             await deleteUser(id);
//             setUsers(users.filter(user => user.id !== id));
//             setTimeout(() => (alert("✅ User deleted successfully!")), [2000]);
//         } else {
//             alert("❌ Failed to delete user.");
//         }
//     };
//     const handleEdit = (id) => {
//         console.log(`Navigating to /edit/${id}`)
//         navigate(`/edit/${id}`);
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">User List</h1>
//             <div className="grid gap-4">
//                 {users.map(user => (
//                     <UserCard key={user.id} user={user} onEdit={() => handleEdit(user.id)} onDelete={() => handleDelete(user.id)} />
//                 ))}
//             </div>
//             <Pagination page={page} totalPages={totalPages} setPage={setPage} />
//         </div>
//     );
// };

// export default UserList;

import { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "../../services/api.js";
import UserCard from "./UserCard";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchUsers(page);
                setUsers(data.data);
                setTotalPages(data.total_pages);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        getUsers();
    }, [page]);

    const handleDeleteClick = (id) => {
        setSelectedUserId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (selectedUserId) {
            try {
                await deleteUser(selectedUserId);
                setUsers(users.filter(user => user.id !== selectedUserId));

                setSuccessMessage("✅ User deleted successfully!");

                setTimeout(() => setSuccessMessage(""), 3000);
            } catch (error) {
                setSuccessMessage("❌ Failed to delete user.");
                setTimeout(() => setSuccessMessage(""), 3000);
            }
        }
        setIsModalOpen(false);
        setSelectedUserId(null);
    };

    const handleEdit = (id) => {
        console.log(`Navigating to /edit/${id}`);
        navigate(`/edit/${id}`);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User List</h1>

            {successMessage && (
                <div className="bg-green-100 text-green-700 p-2 rounded-md mb-4 text-center">
                    {successMessage}
                </div>
            )}

            <div className={`grid gap-4 transition ${isModalOpen ? "opacity-50" : "opacity-100"}`}>
                {users.map(user => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onEdit={() => handleEdit(user.id)}
                        onDelete={() => handleDeleteClick(user.id)}
                    />
                ))}
            </div>
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold">Confirm Delete</h3>
                        <p>Are you sure you want to delete this user?</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;

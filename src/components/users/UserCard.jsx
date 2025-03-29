import React from "react";

const UserCard = ({ user, onEdit, onDelete }) => {
    return (
        <div className="flex justify-between items-start p-4 border rounded-lg shadow-sm bg-white flex-wrap">
            <div className="flex items-center space-x-4">
                <img src={user.avatar} alt={user.first_name} className="w-12 h-12 rounded-full" />
                <div>
                    <p className="text-base sm:text-lg font-semibold">{user.first_name} {user.last_name}</p>
                    <p className="text-sm sm:text-base text-gray-500">{user.email}</p>
                </div>
            </div>
            <div className=" flex sm:flex-row items-center sm:items-start gap-2 sm:gap-4 self-start">
                <button
                    onClick={onEdit}
                    className="px-3 py-1 text-sm sm:text-base bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="px-3 py-1 text-sm sm:text-base bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default UserCard;

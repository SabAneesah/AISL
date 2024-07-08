import React, { useContext } from "react";
import NavBarSignedIn from "../Components/NavBarSignedIn";
import Footer from "../Components/Footer";
import { DataContext } from "../routes/UserRoute";

const Dashboard = () => {
  const { user } = useContext(DataContext);

  return (
    <>
      <NavBarSignedIn />
      <div className="bg-purple-600 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-11/12 h-5/6 p-6">
          <div className="flex justify-between items-start">
            <div className="flex flex-col items-center">
              <div className="bg-red-600 rounded-full w-24 h-24 flex items-center justify-center text-white text-2xl mb-6">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white">DP</span>
                )}
              </div>
              <h2 className="text-2xl font-semibold text-center">{user.name}</h2>
              <button className="bg-indigo-500 text-white px-4 py-2 my-2 rounded">
                Edit Profile
              </button>
              <div className="mt-4 space-y-2">
                <div className="bg-gray-200 rounded px-4 py-2">
                  <strong>Email:</strong> {user.email}
                </div>
                <div className="bg-gray-200 rounded px-4 py-2">
                  <strong>Degree Program:</strong> {user.degree}
                </div>
                <div className="bg-gray-200 rounded px-4 py-2">
                  <strong>Year:</strong> {user.year}
                </div>
              </div>
            </div>
            <div className="flex-1 ml-6">
              <h2 className="text-2xl font-semibold">Recent</h2>
              <div className="mt-4 border-t border-gray-300 pt-4">
                {/* Placeholder for recent activities */}
                <p className="text-gray-500">No recent activities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

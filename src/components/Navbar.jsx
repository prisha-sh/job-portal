import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const userId = useSelector((state) => state.auth.userId);
  const userData = useSelector((state) => state.auth.userData); // Get userData from auth slice
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Check if employer_id exists and is not null
  const isEmployer = userData?.employer_id != null;
  console.log("role is :",role);
  console.log("hiiiiiiiii");
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md border-gray-200">
      <div className="container mx-auto flex items-center justify-between px-6 py-2">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            JobGenius
          </span>
        </Link>

        {/* Middle Navigation - only if logged in */}
        {token && (
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Home
            </Link>
            {/* Show Jobs link only if employer_id is null or doesn't exist */}
            {(role != "employer") && (
              <Link
                to="/jobs"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Jobs
              </Link>
            )}
            {/* Show Search link only if employer_id is null or doesn't exist */}
            {(role!="employer") && (
              <Link
                to="/search-jobs"
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                Search
              </Link>
            )}
          </div>
        )}

        {/* Right-side Auth Buttons */}
        <div className="flex items-center gap-4">
          {token ? (
            <>
              <Link
                to={(role=="employer") ? "/employer-personal-tab" : "/user-personal-tab"}
                className="px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/user-signup"
                className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

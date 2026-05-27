import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from "../images/Worktime.gif";
import { signup } from '../services/apicalls/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { setRole, setLoading } from '../redux/slices/authSlice';
import LoadingScreen from "../components/LoadingScreen";
import { toast } from 'react-hot-toast';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pull loading flag correctly
  const isLoading = useSelector(state => state.auth.loading);

  // Local form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmpassword: ''
  });
  const [error, setError] = useState('');

  // Set fixed role once
  useEffect(() => {
    dispatch(setRole("user"));
  }, [dispatch]);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    dispatch(setLoading(true));

    // Client-side validation
    if (formData.password !== formData.confirmpassword) {
      setError('Passwords do not match');
      dispatch(setLoading(false));
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      dispatch(setLoading(false));
      return;
    }

    try {
      await signup(
        dispatch,
        navigate,
        formData.email,
        "user",
        formData.password,
        formData.confirmpassword
      );
    } catch (error) {
       toast.error("Error in signup. Please try again.");
      console.error('Signup error:', error);
      
      // Handle specific error messages from the API
      if (error.response?.data?.message) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("Error in signup. Please try again.");
       
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Show loading screen when isLoading is true
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-screen flex items-center justify-center p-4 bg-[#141761]" data-theme="synthwave">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden border border-primary/25">
        <div className="w-full lg:w-1/2 p-6 flex flex-col">
          <h1 className="text-3xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-6">
            JobGenius
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Create an Applicant Account</h2>
             <Link to={"/employer-signup"}>
             <p className="text-xs mt-1 text-blue-400 ">Are you a Recruiter? Register here</p></Link> 
            </div>

            <div className="space-y-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Choose a password"
                  required
                  disabled={isLoading}
                />
                <p className="text-xs opacity-70 mt-1">
                  Password must be at least 6 characters long
                </p>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="confirmpassword"
                  value={formData.confirmpassword}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Confirm password"
                  required
                  disabled={isLoading}
                />
                <p className="text-xs opacity-70 mt-1">
                  Password and Confirm password should match
                </p>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-sm" 
                    required 
                    disabled={isLoading}
                  />
                  <span className="text-xs leading-tight">
                    I agree to the{" "}
                    <span className="text-primary hover:underline">terms of service</span> and{" "}
                    <span className="text-primary hover:underline">privacy policy</span>
                  </span>
                </label>
              </div>
            </div>

            {error && (
              <div className="alert alert-error">
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <img src={img} alt="Work illustration" className="w-full h-auto rounded-3xl" />
            <div className="text-center mt-6 space-y-2">
              <h2 className="text-xl font-semibold">Let's get started</h2>
              <p className="opacity-70">Find a job that suits you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

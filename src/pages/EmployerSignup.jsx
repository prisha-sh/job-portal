import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import img from "../images/Company.gif";
import { signup } from '../services/apicalls/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { setRole, setLoading } from '../redux/slices/authSlice';
import LoadingScreen from "../components/LoadingScreen";
import { toast } from 'react-hot-toast';

const EmployerSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const isloading = useSelector((state) => state.auth.loading);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmpassword: ''
  });
  
  const [error, setError] = useState('');
  const user = "Employer";

  useEffect(() => {
    dispatch(setRole("Employer"));
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setError('');

    // Validation
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
      const register = await signup(
        dispatch, 
        navigate, 
        formData.email, 
        user, 
        formData.password, 
        formData.confirmpassword
      );
      
      // If signup is successful, the signup function should handle navigation
      // and showing success toast
      
    } catch (error) {
      console.error('Signup error:', error);
      
      // Handle specific error messages from the API
      if (error.response?.data?.message) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("Error in signup. Please try again.");
        toast.error("Error in signup. Please try again.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Show loading screen when isloading is true
  if (isloading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#141761]"
      data-theme="synthwave"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              JobGenius
            </span>
          </div>

          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Employer Account</h2>
               <Link to={"/user-signup"}>
                           <p className="text-xs mt-1 text-blue-400 ">Are you an Applicant? Register here</p></Link> 
                </div>

                <div className="space-y-3">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="input input-bordered w-full"
                      required
                      disabled={isloading}
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
                      placeholder="Choose a password"
                      className="input input-bordered w-full"
                      required
                      disabled={isloading}
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
                      placeholder="Confirm password"
                      className="input input-bordered w-full"
                      required
                      disabled={isloading}
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
                        disabled={isloading}
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
                  className="btn btn-primary w-full" 
                  type="submit" 
                  disabled={isloading}
                >
                  {isloading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src={img} alt="Language connection illustration" className="w-full h-full rounded-3xl" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Let's get started</h2>
              <p className="opacity-70">Find job that suits you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignup;

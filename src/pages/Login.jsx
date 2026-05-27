import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from "../images/Consulting.gif";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/slices/authSlice';
import { login } from '../services/apicalls/authApi';
import LoadingScreen from "../components/LoadingScreen";
import toast from 'react-hot-toast';

const Login = () => {
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(state => state.auth.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      await login(dispatch, navigate, email, role, password);
    } catch (error) {
      console.error(error);
      toast.error("failed to LogIn, try again")
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (isLoading) {
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

          {/* Role Switch */}
          <div className="flex space-x-4 mb-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === 'user'}
                onChange={() => setRole('user')}
                className="radio radio-primary"
                disabled={isLoading}
              />
              <span className="text-gray-700">Applicant</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="employer"
                checked={role === 'employer'}
                onChange={() => setRole('employer')}
                className="radio radio-secondary"
                disabled={isLoading}
              />
              <span className="text-gray-700">Recruiter</span>
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Welcome Back</h2>
                <p className="text-sm opacity-70">
                  {role === 'user'
                    ? 'Sign in to your account to search jobs'
                    : 'Sign in to manage your job postings'}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="form-control w-full space-y-2">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-control w-full space-y-2">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Don't have an account?{' '}
                    <Link to="/user-signup" className="text-primary hover:underline">
                      Create one
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src={img}
                alt="Consulting illustration"
                className="w-full h-full rounded-3xl"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Begin your journey!!</h2>
              <p className="opacity-70">
                {role === 'user'
                  ? 'Find jobs that suit your skill set'
                  : 'Attract top talent and grow your team'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

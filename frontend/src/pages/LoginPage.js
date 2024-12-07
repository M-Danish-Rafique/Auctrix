import React, { useState } from 'react';
import { Mail, Lock, EyeOff, Eye } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      // This is a placeholder for Google authentication
      // In a real application, you would use Firebase, 
      // Google OAuth, or another authentication service
      console.log('Initiating Google Sign-In');
      // Example of how you might implement Google Sign-In
      // const result = await signInWithGoogle();
      // Handle successful sign-in
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      // Handle sign-in error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
    if (!passwordRegex.test(password)) {
      toast.error('Weak password: must include 1 lowercase, 1 uppercase, 1 number, and 1 special character');
      return;
    }

    const handleLogin = async () => {
      try {
        const response = await axios.post('http://127.0.0.1/login', {
          email,
          password,
        });
        if (response.data.success) {
          toast.success('Login successful');
          // Handle successful login, e.g., redirect to dashboard
        } else {
          toast.error('Login failed: ' + response.data.message);
        }
      } catch (error) {
        console.error('Login Error:', error);
        toast.error('An error occurred during login');
      }
    };

    await handleLogin();
    };
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-500">Sign in to continue to your account</p>
          </div>

          {/* Google Sign-In Button */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FcGoogle className="mr-2" size={24} />
              Continue with Google
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button type="button" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </form>

          <div className="text-center">
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{' '}
              <button type="button" className="font-medium text-blue-600 hover:text-blue-500">
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');



//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
//           <p className="text-gray-500">Sign in to continue to your account</p>
//         </div>

//         {/* Google Sign-In Button */}
//         <div className="space-y-4">
//           <button
//             onClick={handleGoogleSignIn}
//             className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//           >
//             <FcGoogle className="mr-2" size={24} />
//             Continue with Google
//           </button>

//           <div className="flex items-center my-4">
//             <div className="flex-grow border-t border-gray-300"></div>
//             <span className="mx-4 text-gray-500 text-sm">or</span>
//             <div className="flex-grow border-t border-gray-300"></div>
//           </div>
//         </div>

//         {/* Existing Email/Password Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* [Previous email and password input fields remain the same] */}
//           {/* ... (previous input fields) ... */}

//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Sign In
//           </button>
//         </form>

//         <div className="text-center">
//           <p className="mt-2 text-sm text-gray-600">
//             Don't have an account?{' '}
//             <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
//               Register
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
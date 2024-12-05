import React, { useState } from 'react';
import { Mail, ArrowLeft, Check } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simulate password reset request
    setIsLoading(true);
    try {
      // Simulated API call for password reset
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set submitted state to true
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset error:', error);
      // In a real app, you'd handle error states here
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    // In a real app, this would typically use React Router
    console.log('Navigating back to login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        {!isSubmitted ? (
          <>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password</h2>
              <p className="text-gray-500 mb-6">
                Enter the email address associated with your account
              </p>
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

              <button
                type="submit"
                disabled={isLoading}
                className={`
                  w-full flex justify-center items-center py-2 px-4 border border-transparent 
                  rounded-lg shadow-sm text-sm font-medium text-white 
                  ${isLoading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                  }
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  transition-colors duration-300
                `}
              >
                {isLoading ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  'Reset Password'
                )}
              </button>

              <button
                type="button"
                onClick={handleGoBack}
                className="w-full flex justify-center items-center text-sm text-gray-600 hover:text-gray-800 mt-4"
              >
                <ArrowLeft className="mr-2" size={16} />
                Back to Login
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-4 rounded-full">
                <Check className="text-green-600" size={48} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Password Reset Email Sent
            </h2>

            <p className="text-gray-600">
              We've sent a password reset link to <strong>{email}</strong>. 
              Check your email and follow the instructions to reset your password.
            </p>

            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full py-2 px-4 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Try Another Email
              </button>

              <button
                onClick={handleGoBack}
                className="w-full py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Back to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
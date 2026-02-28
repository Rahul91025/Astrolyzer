import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-[#FAF6EE] border border-gray-200 p-8 shadow-md">

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-300 mb-8">
          <button
            onClick={() => {
              setIsLogin(true);
              setShowPassword(false); // Reset visibility
            }}
            className={`flex-1 py-3 text-center font-semibold text-sm tracking-wide uppercase transition ${
              isLogin ? 'border-b-2 border-orange-500 text-black' : 'text-gray-400'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setShowPassword(false); // Reset visibility
            }}
            className={`flex-1 py-3 text-center font-semibold text-sm tracking-wide uppercase transition ${
              !isLogin ? 'border-b-2 border-orange-500 text-black' : 'text-gray-400'
            }`}
          >
            Register
          </button>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-light mb-6 uppercase tracking-wide">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {/* Form */}
        <form className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-3 bg-white text-sm focus:outline-none focus:border-black"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-3 bg-white text-sm focus:outline-none focus:border-black"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full border border-gray-300 px-4 py-3 bg-white pr-10 text-sm focus:outline-none focus:border-black"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Login Extra */}
          {isLogin && (
            <div className="flex items-center justify-between text-sm text-gray-700">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-orange-500" />
                <span>Remember me</span>
              </label>
              <a href="#" className="hover:underline">
                Lost Your Password ?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 text-sm tracking-wider uppercase transition duration-200"
          >
            {isLogin ? 'Log In' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

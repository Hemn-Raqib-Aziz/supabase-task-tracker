import { useAppDispatch, useAppSelector } from "../hooks/hooks"; 
import {
  setEmail,
  setPassword,
  clearAuthError,
  signInUser,
  signUpUser,
  setAuthError
} from "../redux/slices/AuthSlice";
import AuthForm from "../components/AuthForm";
import { useState } from "react";

const Auth = () => {
  const dispatch = useAppDispatch();
  const { email, password, error, signupMessage } = useAppSelector((state) => state.auth);
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      dispatch(clearAuthError());
      dispatch(setAuthError("Email and password are required."));
      return;
    }

    if (password.length < 6) {
      dispatch(clearAuthError());
      dispatch(setAuthError("Password must be at least 6 characters."));
      return;
    }

    dispatch(clearAuthError());

    if (isSignup) {
      dispatch(signUpUser({ email, password }));
    } else {
      dispatch(signInUser({ email, password }));
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 px-4 sm:px-6 py-8 sm:py-12 font-sans flex items-center justify-center">
      <section className="max-w-lg w-full mx-auto">
        <header className="mb-8 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
            {isSignup ? "Sign Up" : "Sign In"}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {isSignup ? "Create your account to get started" : "Welcome back! Please sign in"}
          </p>
        {signupMessage && (
  <p className="text-green-600 text-center mt-4">
    {signupMessage}
  </p>
)}
        </header>



        <AuthForm
          email={email}
          password={password}
          error={error}
          onSubmit={handleSubmit}
          onEmailChange={(val) => dispatch(setEmail(val))}
          onPasswordChange={(val) => dispatch(setPassword(val))}
          buttonText={isSignup ? "Sign Up" : "Sign In"}
        />

        <div className="text-center">
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              dispatch(clearAuthError());
              dispatch(setEmail(""));
              dispatch(setPassword(""));
            }}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 hover:underline cursor-pointer"
          >
            {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default Auth;

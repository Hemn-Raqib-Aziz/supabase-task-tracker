import { useState } from "react";
import BaseForm from "./BaseForm";
import type { AuthFormProps } from "../types/auth.types";
import { useNavigate } from "react-router-dom";

function AuthForm({ 
  email, 
  password, 
  error, 
  onSubmit, 
  onEmailChange, 
  onPasswordChange, 
  buttonText 
}: AuthFormProps) {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleForgotPasswordRedirect = () => {
  navigate("/request-password-reset");
};


  return (
    <BaseForm onSubmit={onSubmit} error={error} buttonText={buttonText}>
      <div>
        <input
          type="email"
          placeholder="person@gmail.com"
          value={email}
          autoComplete="email"
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white placeholder-gray-400"
        />
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="************"
          value={password}
          autoComplete="current-password"
          onChange={(e) => onPasswordChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white placeholder-gray-400 pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-lg focus:outline-none cursor-pointer"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>

      <div className="text-right">
        <button
        onClick={handleForgotPasswordRedirect}
          type="button"
          className="text-sm text-gray-600 hover:text-gray-900 hover:underline focus:outline-none cursor-pointer"
        >
          Forgot password?
        </button>
      </div>
    </BaseForm>
  );
}

export default AuthForm;
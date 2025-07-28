import { useState } from "react";
import BaseForm from "./BaseForm";
import type { ChangePasswordFormProps } from "../types/auth.types";

function ChangePasswordForm({
  onSubmit,
  onPasswordChange,
  onConfirmPasswordChange,
  password,
  confirmPassword,
  error,
  buttonText = "Change Password",
}: ChangePasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <BaseForm onSubmit={onSubmit} error={error} buttonText={buttonText}>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="New password"
          value={password}
          autoComplete="new-password"
          onChange={(e) => onPasswordChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white placeholder-gray-400 pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-lg focus:outline-none cursor-pointer"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>

      <div>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm new password"
          value={confirmPassword}
          autoComplete="new-password"
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white placeholder-gray-400"
        />
      </div>
    </BaseForm>
  );
}

export default ChangePasswordForm;

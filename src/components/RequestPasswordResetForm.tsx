import BaseForm from "./BaseForm";
import type { RequestPasswordResetFormProps } from "../types/auth.types";

function RequestPasswordResetForm({
  email,
  onEmailChange,
  onSubmit,
  error,
  buttonText = "Send Reset Link",
}: RequestPasswordResetFormProps) {
  return (
    <BaseForm onSubmit={onSubmit} error={error} buttonText={buttonText}>
      <div>
        <input
          // type="email"
          placeholder="your.email@example.com"
          value={email}
          autoComplete="email"
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white placeholder-gray-400"
          required
        />
      </div>
    </BaseForm>
  );
}

export default RequestPasswordResetForm;

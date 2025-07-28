import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  setEmail,
  clearError,
  clearSuccess,
  requestPasswordReset,
  setError
} from "../redux/slices/passwordChangeSlice";
import RequestPasswordResetForm from "../components/RequestPasswordResetForm";

function RequestPasswordResetPage() {
  const dispatch = useAppDispatch();
  const { email, error, loading, resetSuccess } = useAppSelector((state) => state.passwordChange);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(clearSuccess());

    if (!email) {
      dispatch(clearError());
      dispatch(setError("Email is required"));
      return;
    }

    dispatch(requestPasswordReset(email));
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 px-4 py-10 flex items-center justify-center">
      <section className="max-w-md w-full">
        <header className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900">Reset Password</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your email to receive a password reset link.
          </p>
        </header>

        {resetSuccess ? (
          <p className="text-green-600 text-center">
            Check your email for the password reset link.
          </p>
        ) : (
          <RequestPasswordResetForm
            email={email}
            onEmailChange={(val) => dispatch(setEmail(val))}
            onSubmit={handleSubmit}
            error={error}
            buttonText={loading ? "Sending..." : "Send Reset Link"}
          />
        )}
      </section>
    </main>
  );
}

export default RequestPasswordResetPage;

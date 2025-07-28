import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  setPassword,
  setConfirmPassword,
  clearError,
  clearSuccess,
  changePassword,
  allowPasswordReset,
  disallowPasswordReset
} from "../redux/slices/passwordChangeSlice";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const allowed = useAppSelector(state => state.passwordChange.allowedToReset);

  const { password, confirmPassword, error, loading, changeSuccess } = useAppSelector(
    (state) => state.passwordChange
  );

  useEffect(() => {
    if (changeSuccess) {
      navigate("/");
      dispatch(clearSuccess());
    }
  }, [changeSuccess, navigate, dispatch]);

//   useEffect(() => {
//   const handleRecovery = async () => {
//     const hash = window.location.hash;
//     if (hash.includes("type=recovery")) {
//       const { data, error } = await supabase.auth.getSession(); // Grabs session if token exists in URL
//       if (error || !data.session) {
//         console.error("Recovery session error:", error);
//       }
//     }
//   };

//   handleRecovery();
// }, []);

useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      dispatch(allowPasswordReset());
    } else {
      dispatch(disallowPasswordReset());
      navigate("/"); // redirect if no recovery token in URL
    }
  }, [dispatch, navigate]);

  if (!allowed) {
    return null; // or loading spinner or redirect
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(clearSuccess());

    if (!password || !confirmPassword) {
      dispatch(clearError());
      return;
    }

    if (password !== confirmPassword) {
      dispatch(clearError());
      return;
    }

    if (password.length < 6) {
      dispatch(clearError());
      return;
    }

    dispatch(changePassword({ password }));
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 px-4 py-10 flex items-center justify-center">
      <section className="max-w-md w-full">
        <header className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900">Reset Your Password</h2>
          <p className="text-sm text-gray-500 mt-1">Enter a new password to update your account</p>
        </header>

        <ChangePasswordForm
          onSubmit={handleSubmit}
          password={password}
          confirmPassword={confirmPassword}
          onPasswordChange={(val) => dispatch(setPassword(val))}
          onConfirmPasswordChange={(val) => dispatch(setConfirmPassword(val))}
          error={error}
          buttonText={loading ? "Updating..." : "Update Password"}
        />
      </section>
    </main>
  );
}

export default ForgotPasswordPage;

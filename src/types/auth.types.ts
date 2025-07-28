import type { 
  EmailDto, 
  PasswordDto, 
  ErrorDto, 
  FormSubmitDto, 
  EmailChangeDto, 
  PasswordChangeDto
} from "./base.types";

/**
 * Authentication form component props
 */
export interface AuthFormProps 
  extends EmailDto,
          PasswordDto,
          ErrorDto,
          FormSubmitDto,
          EmailChangeDto,
          PasswordChangeDto {
  buttonText: string;
}

/**
 * Authentication state management
 */
export interface AuthState extends EmailDto, PasswordDto, ErrorDto {
  isAuthenticated: boolean;
  loading: boolean;
  signupMessage?: string;
}

/**
 * Password change form component props
 */
export type ChangePasswordFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  password: string;
  confirmPassword: string;
  error?: string;
  buttonText?: string;
};

/**
 * Password reset request form component props
 */
export type RequestPasswordResetFormProps = {
  email: string;
  onEmailChange: (val: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error?: string;
  buttonText?: string;
};

/**
 * Password change flow state management
 */
export interface PasswordChangeState {
  email: string;
  password: string;
  confirmPassword: string;
  error: string;
  loading: boolean;
  resetSuccess: boolean;  // success of sending reset email
  changeSuccess: boolean; // success of password update
  allowedToReset: boolean;
}
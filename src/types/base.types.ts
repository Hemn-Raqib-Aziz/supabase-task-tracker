import type { ReactNode } from "react";

/**
 * Base Data Transfer Objects (DTOs)
 * These are the fundamental building blocks used across the application
 */

// Core data DTOs
export interface IdDto {
  id: number;
}

export interface TitleDto {
  title: string;
}

export interface DescriptionDto {
  description: string;
}

export interface ImageUrlDto {
  image_url: string | null;
}

export interface FileDto {
  file: File | null;
}

export interface EmailDto {
  email?: string;
}

export interface CreatedAtDto {
  created_at?: string;
}

export interface PasswordDto {
  password: string;
}

// UI state DTOs
export interface ErrorDto {
  error?: string;
}

export interface ButtonTextDto {
  buttonText?: string;
}

export interface MessageDto {
  message: string;
}

export interface IsOpenDto {
  isOpen: boolean;
}

export interface ChildrenDto {
  children: ReactNode;
}

// Form event handler DTOs
export interface FormSubmitDto {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface EmailChangeDto {
  onEmailChange: (email: string) => void;
}

export interface PasswordChangeDto {
  onPasswordChange: (password: string) => void;
}

// Dialog action DTOs
export interface ConfirmHandlerDto {
  onConfirm: () => void;
}

export interface CancelHandlerDto {
  onCancel: () => void;
}

export interface ConfirmTextDto {
  confirmText?: string;
}

export interface CancelTextDto {
  cancelText?: string;
}

export interface ConfirmButtonStyleDto {
  confirmButtonStyle?: 'danger' | 'primary';
}

// Edit functionality DTOs
export interface ShowEditsYesDto {
  yes: boolean;
}
import type { Session } from "@supabase/supabase-js";
import type { 
  IdDto,
  TitleDto, 
  DescriptionDto, 
  ImageUrlDto, 
  EmailDto, 
  CreatedAtDto,
  ErrorDto,
  FormSubmitDto,
  ButtonTextDto,
  ShowEditsYesDto
} from "./base.types";

/**
 * Core Task entity
 */
export interface Task extends TitleDto, DescriptionDto, ImageUrlDto, EmailDto, CreatedAtDto {
  id?: number;
}

/**
 * Task wrapper DTO
 */
export interface TaskDto {
  task: Task;
}

/**
 * Task change handler DTO
 */
export interface TaskChangeDto {
  onTaskChange: (task: Task) => void;
}

/**
 * Task deletion handler DTO
 */
export interface DeleteHandlerDto {
  onDelete: (id: number) => void;
}

/**
 * Task editing handler DTO
 */
export interface EditHandlerDto {
  onEdit?: (id: number, updatedTask: Task) => Promise<{ success: boolean } | void>;
}

/**
 * Task card component props
 */
export interface TaskCardTypes 
  extends TaskDto, 
          ErrorDto {}

/**
 * Task form component props
 */
export interface TaskFormProps 
  extends TaskDto,
          ErrorDto,
          FormSubmitDto,
          TaskChangeDto,
          ButtonTextDto {
  file: File | null;
  setNewFile: (file: File | null) => void;
  disabled?: boolean; // Added for upload loading state
}

/**
 * Show edits functionality props
 */
export interface ShowEditsTypes 
  extends ShowEditsYesDto, 
          IdDto {}

/**
 * Redux state for task management
 */
export type TaskState = {
  items: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  // Fetch errors
  fetchError: string | null;
  // Add task errors
  addTaskError: string | null; // Server-side errors when adding tasks
  addTaskValidationError: string | null; // Client-side validation errors for adding tasks
  // Card operation errors (for update/delete operations)
  cardErrors: Record<number, string>; // { taskId: errorMessage }
  // Image upload state
  imageUploadStatus: "idle" | "loading" | "succeeded" | "failed";
  imageUploadError: string | null;
};

/**
 * Redux action payloads
 */
export type AddTaskPayload = {
  task: Task;
  session: Session;
};

export type UpdateTaskPayload = {
  id: number;
  updatedTask: Task;
};
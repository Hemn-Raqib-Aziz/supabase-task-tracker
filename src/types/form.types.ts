import type { 
  TaskDto,
  TaskChangeDto
} from "./task.types";
import type { 
  ChildrenDto,
  FormSubmitDto,
  ErrorDto,
  ButtonTextDto,
  FileDto
} from "./base.types";

/**
 * Base form component props
 * Used as foundation for all form components
 */
export interface BaseFormProps 
  extends ChildrenDto,
          FormSubmitDto,
          ErrorDto {
  buttonText: string;
  disabled?: boolean; // Added for upload loading state
}

/**
 * Customized form component props
 * Used for task-specific forms with additional functionality
 */
export interface CustomizedFormTypes 
  extends TaskDto, 
          ErrorDto, 
          FormSubmitDto, 
          TaskChangeDto, 
          ButtonTextDto {}

/**
 * File handling DTO
 * Used for forms that handle file uploads
 */
export interface FileTypeDto {
  file: FileDto;
}
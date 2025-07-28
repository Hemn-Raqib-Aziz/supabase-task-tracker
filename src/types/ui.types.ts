import type { 
  IsOpenDto,
  TitleDto,
  MessageDto,
  ConfirmTextDto,
  CancelTextDto,
  ConfirmHandlerDto,
  CancelHandlerDto,
  ConfirmButtonStyleDto
} from "./base.types";

/**
 * Confirmation dialog component props
 * Used for all confirmation dialogs across the application
 */
export interface ConfirmationDialogProps 
  extends IsOpenDto,
          TitleDto,
          MessageDto,
          ConfirmTextDto,
          CancelTextDto,
          ConfirmHandlerDto,
          CancelHandlerDto,
          ConfirmButtonStyleDto {}
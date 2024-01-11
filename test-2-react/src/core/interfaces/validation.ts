export interface IValidationResult {
  isValid: boolean;
  error: string | null;
}

export interface IFieldGroupValidationResult {
  [key: string]: IValidationResult;
}

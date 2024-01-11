import { IValidationResult } from '.';

export interface IErrorsObject {
  [key: string]: IValidationResult;
}

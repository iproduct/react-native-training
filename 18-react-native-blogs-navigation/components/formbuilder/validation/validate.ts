import { Post } from "../../../model/posts.model";
import * as yup from 'yup';
import { Optional } from "../../../model/shared-types";

export type ValidationConfig<T> = {
    [P in keyof T]?: Validator<T[P]> | Validator<T[P]>[]
}

export type FieldValidationResult = string[] | string | undefined; // array of error messages

export type ValidationResult<T> = {
    [P in keyof T]?: FieldValidationResult
}

export type FormState<T> = {
    [P in keyof T]?: FormFieldState;
}

export class FormFieldState {
    constructor(
        public valid: ValidStatus,
        public changed: ChangedStatus
    ) { }
}

export enum ValidStatus {
    INVALID, VALID
}

export enum ChangedStatus {
    PRISTINE, DIRTY
}

export type ErrorString = string

// should return a string error message if value is invalid or undefined otherwise
export type ValidatorFunc<V> = (value: V, field: string) => Optional<ErrorString>

export type Validator<V> = ValidatorFunc<V> | yup.BaseSchema

export type ValidatorFactory<V> = (...args: any) => Validator<V>

type PostValidationConfig = ValidationConfig<Post>

type PostValidationResult = ValidationResult<Post>

// Validation Utils
export function validatorValidate<Value>
    (validator: Validator<Value>, fieldName: string, value: Value): FieldValidationResult {
    const errors: FieldValidationResult = undefined;
    if (typeof validator === 'function') {
        return validator(value, fieldName);
    } else {
        try {
            validator.validateSync(value);
        } catch (err) {
            const validationError = err as yup.ValidationError;
            return validationError.errors;
        }
    }
}


// Standad validators
export class Validators {
    static required: ValidatorFactory<string> = () => (value: string, field: string) => {
        if (value.trim().length === 0) {
            return `The field '${field}' is required`
        }
    }
    static pattern: ValidatorFactory<string> = (validationPattern: RegExp) => (value: string, field: string) => {
        if (!validationPattern.test(value)) {
            return `The field '${field}' does not match pattern '${validationPattern}'`
        }
    }
    static len: ValidatorFactory<string> = (min: number, max: number) => (value: string, field: string) => {
        if (value.length < min) {
            return `The field '${field}' should be at least ${min} characters long`
        } else if (value.length > max) {
            return `The field '${field}' should be no more tan ${max} characters long`
        }
    }
}


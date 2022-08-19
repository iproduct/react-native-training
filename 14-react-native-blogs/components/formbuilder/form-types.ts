import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validation/validate.js';
import { FormTextComponent } from './FormTextComponent.js';
export type FormComponents<Entity> = {
    [Prop in keyof Entity]?: FormComponent<Prop>
}

export interface FormComponent<State> {
    id: string;
    value: State;
    valid: ValidStatus;
    changed: ChangedStatus;
    readonly initialValue?: State;
    validators?: Validator | Validator[];
    reset(): void;
    validate(): string[]; // validation errors, empty [] in no errors
    render(): string;
}

export interface FormTextComponentType extends FormComponent<string> {
    multiline: boolean;
}

export type FormCheckboxComponentType = FormComponent<boolean>;

export interface FormNumberComponentType extends FormComponent<number> {
    min: number;
    max: number;
}

export interface FormUrlComponentType extends FormComponent<string> {
    allowRelative: boolean;
    allowInsecure: boolean;
}

export type FormComponentType<Prop> =
    Prop extends string ? FormTextComponent | FormUrlComponentType :
    Prop extends number ? FormNumberComponentType :
    Prop extends boolean ? FormCheckboxComponentType : never;

// export type FormComponentUnionType =
//   FormTextComponent | FormUrlComponentType | FormNumberComponentType | FormCheckboxComponentType;

export type FormElements<Entity> = {
    [Prop in keyof Entity]: FormComponentType<Prop>
}



import { ValidStatus, ChangedStatus } from './validate';
export type FormComponents<Entity> = {
    [Prop in keyof Entity]?: FormComponent<Prop>
}

export interface FormComponent<State> {
    id: string;
    value: State;
    valid: ValidStatus;
    changed: ChangedStatus;
    readonly initialValue?: State;
    reset(): void;
    validate(): string[]; // validation errors, empty [] in no errors
}

interface FormTextComponent extends FormComponent<string> {
    multiline: boolean;
}
type FormCheckboxComponent = FormComponent<boolean>;
interface FormNumberComponent extends FormComponent<number>{
    min: number;
    max: number;
}
interface FormUrlComponent extends FormComponent<string> {
    allowRelative: boolean;
    allowInsecure: boolean;
}

export type FormComponentType<Prop> =
    Prop extends string ? FormTextComponent | FormUrlComponent :
    Prop extends number ? FormNumberComponent :
    Prop extends boolean ? FormCheckboxComponent: never;
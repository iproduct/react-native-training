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
    render(): string;
}

interface FormTextComponentType extends FormComponent<string> {
    multiline: boolean;
}
type FormCheckboxComponentType = FormComponent<boolean>;
interface FormNumberComponentType extends FormComponent<number> {
    min: number;
    max: number;
}
interface FormUrlComponentType extends FormComponent<string> {
    allowRelative: boolean;
    allowInsecure: boolean;
}

export type FormComponentType<Prop> =
    Prop extends string ? FormTextComponent | FormUrlComponentType :
    Prop extends number ? FormNumberComponentType :
    Prop extends boolean ? FormCheckboxComponentType : never;


export class FormTextComponent implements FormTextComponentType {
    constructor(
        public id: string,
        public value: string,
        public initialValue = '',
        public multiline: boolean = false,
        public valid: ValidStatus = ValidStatus.INVALID,
        public changed: ChangedStatus = ChangedStatus.PRISTINE
    ) { }
    reset(): void {
        throw new Error('Method not implemented.');
    }
    validate(): string[] {
        throw new Error('Method not implemented.');
    }
    render(): string {
        throw new Error('Method not implemented.');
    }

}
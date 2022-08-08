import { ValidStatus, ChangedStatus, Validator } from './validate';
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

export type FormWidgetElements<Entity> = {
    [Prop in keyof Entity]: FormComponentType<Prop>
}


export class FormTextComponent implements FormTextComponentType {
    constructor(
        public id: string,
        public value: string,
        public initialValue = '',
        public multiline: boolean = false,
        public validators?: Validator | Validator[],
        public valid: ValidStatus = ValidStatus.INVALID,
        public changed: ChangedStatus = ChangedStatus.PRISTINE
    ) { }
    reset(): void {
        this.value = this.initialValue;
    }
    validate(): string[] {
        const errors = [] as string[];
        if (!this.validators) return [];
        if (Array.isArray(this.validators)) {
            for (const validator of this.validators) {
                try {
                    validator(this.value, this.id);
                } catch (err) {
                    errors.push(err as string);
                }
            }
        } else {
            try {
                this.validators(this.value, this.id);
            } catch (err) {
                errors.push(err as string);
            }
        }
        return errors;
    }

    render(): string {
        const validationErrors = this.validate();
        return this.multiline ?
            `
        <div class="input-field col s12">
            <textarea id="${this.id}" name="${this.id}" type="text" 
                class="materialize-textarea validate ${validationErrors ? 'invalid' : 'valid'}" value="${this.value}">
            </textarea>
            <label for="imageUrl">Blog Image URL</label>
            <span class="helper-text" data-error="${this.validate().join(', ')}"></span>
        </div>
        `
            :
            `
        <div class="input-field col s12">
            <input id="${this.id}" name="${this.id}" type="text" class="validate ${validationErrors ? 'invalid' : 'valid'}"
                value="${this.value}">
            <label for="imageUrl">Blog Image URL</label>
            <span class="helper-text" data-error="${this.validate().join(', ')}"></span>
        </div>
        `
    }
}

export class FormWidget<Entity> {
    constructor(
        public elements: FormWidgetElements<Entity>,
        public intitialValue: Entity
    ) { }
    reset(){
        for(const elemId in this.elements){
            this.elements[elemId].reset();
        }
    }
    validate() {
        return;
    }
    getFormSnapshot(): Entity | null { // TODO: implement me and remove null
        return null;
    }
}

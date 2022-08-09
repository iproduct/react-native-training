import { capitalize } from './utils.js';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validate.js';
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

// export type FormComponentUnionType =
//   FormTextComponent | FormUrlComponentType | FormNumberComponentType | FormCheckboxComponentType;

export type FormWidgetElements<Entity> = {
    [Prop in keyof Entity]: FormComponentType<Prop>
}


export class FormTextComponent implements FormTextComponentType {
    constructor(
        public id: string,
        public value: string,
        public initialValue = '',
        public multiline: boolean = false,
        public label = capitalize(id),
        public property: string = id,
        public validators?: Validator | Validator[],
        public hidden: boolean = false,
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
                class="materialize-textarea validate ${validationErrors ? 'invalid' : 'valid'}" data-property="${this.property}">${this.value}</textarea>
            <label for="${this.id}">${this.label}</label>
            <span class="helper-text" data-error="${this.validate().join(', ')}"></span>
        </div>
        `
            : this.hidden ?
                `
            <input id="${this.id}" name="${this.id}" hidden data-property="${this.property}" >
        `
                :
                `
        <div class="input-field col s12">
            <input id="${this.id}" name="${this.id}" data-property="${this.property}" type="text" class="validate ${validationErrors ? 'invalid' : 'valid'}"
                value="${this.value}">
            <label for="${this.id}">${this.label}</label>
            <span class="helper-text" data-error="${this.validate().join(', ')}"></span>
        </div>
        `
    }
}

export class FormWidget<Entity> {
    constructor(
        public formId: string,
        public elements: FormWidgetElements<Entity>,
        public intitialValue: Entity,
        public validationConfig: ValidationConfig<Entity>,
        public handleSubmit: (event: SubmitEvent) => void,
        public valid: ValidStatus = ValidStatus.INVALID,
        public changed: ChangedStatus = ChangedStatus.PRISTINE
    ) { }
    // init() {
    //     for (const elemId in this.intitialValue) {
    //         this.elements[elemId].initialValue = this.intitialValue[elemId];
    //     }
    // }

    reset = () => {
        for (const elemId in this.elements) {
            this.elements[elemId].reset();
        }
    }
    validate(): ValidationResult<Entity> {
        const result: ValidationResult<Entity> = {};
        this.valid = ValidStatus.VALID;
        for (const elemId in this.elements) {
            const fieldErrors = this.elements[elemId].validate();
            if (fieldErrors && fieldErrors.length > 0) {
                result[elemId] = fieldErrors;
                this.valid = ValidStatus.INVALID;
            }
        }
        return result;
    }

    getFormSnapshot(): Entity {
        const result: Entity = { ...this.intitialValue };
        for (const elemId in this.elements) {
            const elemValue = this.elements[elemId].value;
            if (elemId in this.elements) {
                switch (typeof result[elemId]) {
                    case 'string':
                        result[elemId] = elemValue as unknown as Entity[Extract<keyof Entity, string>];
                        break;
                    case 'number':
                        result[elemId] = (!Number.isNaN(parseFloat(elemValue)) ? parseFloat(elemValue) : undefined) as unknown as Entity[Extract<keyof Entity, string>];
                        break;
                    case 'boolean':
                        result[elemId] = new Boolean(elemValue) as unknown as Entity[Extract<keyof Entity, string>];
                        break;
                    case 'undefined':
                        result[elemId] = undefined as unknown as Entity[Extract<keyof Entity, string>];
                        break;
                    case 'object':
                        if (Array.isArray(result[elemId])) {
                            result[elemId] = elemValue.split(/\W+/) as unknown as Entity[Extract<keyof Entity, string>];
                        } else {
                            throw Error("Unexpected object field type when getting form snapshot")
                        }
                        break;
                    default:
                        throw Error("Unexpected field type when getting form snapshot")
                }
            }
        }
        return result;
    }

    render() {
        let fieldsMarkup = '';
        for (const elemId in this.elements) {
            fieldsMarkup += `<div class="row">${this.elements[elemId].render()}</div>`;
        }
        return ` 
        <form id="${this.formId}" class="col s12">
            ${fieldsMarkup}
            <button class="btn waves-effect waves-light" type="submit" name="submit">Submit
                <i class="material-icons right">send</i>
            </button>
            <button id="${this.formId}-reset-button" class="btn waves-effect waves-light red lighten-1" type="button">Reset
                <i class="material-icons right">cached</i>
            </button>
        </form>
        `;
    }

    makeInteractive() {
        const formElem = document.getElementById(this.formId)! as HTMLFormElement;
        formElem.addEventListener('submit', this.handleSubmit);
        const resetButton = document.getElementById(`${this.formId}-reset-button`)! as HTMLButtonElement;
        resetButton.addEventListener('click', this.reset);
        // formElem.addEventListener('change', this.validateForm, true);

        formElem.addEventListener('keyup', this.fieldChanged, true);

    }

    private fieldChanged = (event: KeyboardEvent) => {
        const target = event.target as HTMLInputElement;
        const value = (event.target as HTMLInputElement).value;
        if (typeof value !== 'undefined') {
            this.elements[target.getAttribute('data-property')! as keyof Entity].value = value as string;
        }
    }
}

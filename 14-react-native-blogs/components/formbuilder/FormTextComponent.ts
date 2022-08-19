import { FormElements, FormTextComponentType } from './form-types.js';
import { ValidStatus, ChangedStatus, Validator, ValidationResult, ValidationConfig } from './validation/validate.js';
import { capitalize } from '../../utils/utils.js';


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

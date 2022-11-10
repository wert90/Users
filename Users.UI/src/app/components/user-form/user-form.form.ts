import { FormControl, Validators } from "@angular/forms";

export const userFormGroup = {
    'userName': new FormControl(null, [Validators.required]),
    'userSurname': new FormControl(null, [Validators.required]),
    'userEmail': new FormControl(null, [Validators.required, Validators.email]),
    'userDateBirth': new FormControl(null),
    'userScholarity': new FormControl(null),
}
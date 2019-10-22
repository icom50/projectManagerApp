import { FormControl } from '@angular/forms';
 
function formValidator(control:FormControl):{[s:string]:boolean} {
    if(control.value.length > 10) {
        return {invalidControl : true}
    }
}

export default formValidator;
export class Validator {
    constructor(name) {
        this.name = name;
    }
    setError(control, error, message) {
        control.error = error;
        control.errorMessage = error ? message : null;
        if (control.el) {
            control.el.setAttribute("error", control.error ? "true" : "false");
            control.el.setAttribute("errorMessage", control.errorMessage);
        }
        if (control.el.nextSibling["attributes"]["wf-error"])
            control.el.nextSibling.textContent = control.errorMessage;
    }
}

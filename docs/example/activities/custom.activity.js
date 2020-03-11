class CustomActivity {
    get ctx() { return this._ctx; }
    set ctx(value) { this._ctx = value; }

    get next() { return this._next; }
    set next(value) { this._next = value; }

    constructor() {
        this.name = 'my-custom-activity';
        this.type = 'custom-activity';
    }
    
    execute() {
        return new Promise((resolve) => {
            alert('Custom Activity');

            this.ctx.wf.goto(this.next);
            resolve(true);
        });
    };
} 
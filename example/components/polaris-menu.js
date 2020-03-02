class PolarisMenu extends HTMLElement {    
    constructor() {
      super();

      this.process = '';
      this.shadow = this.attachShadow({mode: 'open'});

      this.items = [
        {"name": "Home", "process": "home"},
        {"name": "Login", "process": "login"},        
        {"name": "Deposit", "process": "deposit"},
        {"name": "Registration", "process": "registration"}        
      ];
    }

    get items() { return this._items; }
    set items(value) { this._items = value; }

    get ctx() { return this._ctx; }
    set ctx(value) { this._ctx = value; }

    connectedCallback() {
        this.items
        this.shadow.innerHTML = '';
        this.shadow.appendChild(this._css());
        this.shadow.appendChild(this._render());

        this._setActiveMenuItem();

        this.hashchange = this._setActiveMenuItem.bind(this);
        window.addEventListener('hashchange', this.hashchange);

        this.wfMessage = this._wfMessage.bind(this);
        document.addEventListener('wfMessage', this.wfMessage);
    }

    disconnectedCallback() {
        window.removeEventListener('hashchange', this.hashchange);
        document.removeEventListener('wfMessage', this.wfMessage);
    }

    _render() {
        const container = document.createElement('div');
        container.id = 'container';

        if(typeof this.items === "string")             
            this._renderItems(this._getModelItems(), container);                    
        else if(typeof this.items === "object") 
            this._renderItems(this.items, container);

        return container;
    }

    _getModelItems(){
        return this.ctx
                   .model
                   .getValue(this.items)
    }

    _renderItems(items, container) {
        if(!items)
            return;

        for(let item of items)
            container.appendChild(this._createItem(item));
    }

    _createItem(item) {
        const nav = document.createElement('nav');
        const a = document.createElement('a');
        
        a.href = `#${item.process}`;
        a.id = item.process;
        a.textContent = item.name;

        if(item.process === this.process)
            a.className = 'active';

        nav.appendChild(a);

        return nav;
    }

    _wfMessage(event) {
        if(this._shouldChangeLocation(event))
            window.location.hash = event.detail.process;
    }

    _shouldChangeLocation(event) {
        return event.detail.type 
        && event.detail.type === 'PROCESS_CHANGED' 
        && event.detail.process !== "default"
        && event.detail.metadata?.stack?.length === 0;
    }

    _setActiveMenuItem() {
        const params = window.location.hash.replace('#', '').split('-');
        this.process = params[0];  

        if(!this.process)
            window.location.hash = 'home';
        
        const activeItem = this.shadow.querySelector(`a.active`);
        const newItem = this.shadow.getElementById(this.process);
        
        if(activeItem) activeItem.className = '';
        if(newItem) newItem.className = 'active';        
    }

    _css() {
        const style = document.createElement('style');
        style.innerHTML = `
            #container {
                position: relative;
                height: 100%;
                border-right: 1px solid #757575;
            }
            
            a{
                display: block;
                line-height: 2;
                padding: 0 5px;
                width: calc(100% - 20px);
                border-radius: 10px;
                text-transform: capitalize;
            }
            
            a:visited,
            a:link {
                margin: 0 5px;
                cursor: pointer;
                color: #757575;
                text-decoration: none;
            }
            
            a:active,
            a:hover {
                margin: 0 5px;
                cursor: pointer;
                color: purple;
                text-decoration: underline;
            }
            
            a.active {
                color: purple;
                background-color: rgb(238, 177, 238);
            }
        `;

        return style;
    }
  }

  customElements.define('polaris-menu', PolarisMenu);
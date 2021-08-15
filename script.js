class TodoList extends HTMLElement {
    constructor() {
        super();
        const shadowDom = this.attachShadow({ mode: 'open' });
        const wrapper = document.createElement('div');
        const title = this.title;
        const addTaskLabel = this.getAttribute('add-task-label');
        wrapper.innerHTML = `
            <h1>${title}</h1>
            <h3 id="subheader"></h3>
            <p id="counter">Liczba zadań: 0</p>
            
            <ul class="task-list"></ul>
            <input class="new-task-input" type="text"></input>
            <button class="add-task-button">${addTaskLabel}</button>
            <button class="clear-all-button">Usuń wszystko</button>
        `;
        shadowDom.appendChild(wrapper);
        this.addTask = this.addTask.bind(this);
        this.clearList = this.clearList.bind(this);
        this.taskList = this.shadowRoot.querySelector('.task-list');
        const subHeader = shadowDom.getElementById('subheader');
        const newTemplate = document.getElementById('new-template');
        const newTemplateClone = newTemplate.content.cloneNode(true);
        subHeader.appendChild(newTemplateClone);
    }

    connectedCallback() {
        const addTaskButton = this.shadowRoot.querySelector('.add-task-button');
        const clearListButton = this.shadowRoot.querySelector('.clear-all-button');
        
        addTaskButton.addEventListener('click', this.addTask);
        clearListButton.addEventListener('click', this.clearList);
    }
    
    addTask() {
        const textInput = this.shadowRoot.querySelector('.new-task-input');
        if(textInput.value) {
            const li = document.createElement('li');
            li.textContent = textInput.value;

            this.taskList.appendChild(li);
            textInput.value = '';
            this.updateCounter();
        }
    }

    clearList() {
        const listChildren = Array.from(this.taskList.childNodes);
        listChildren.forEach((elem) => elem.remove());
        this.updateCounter();
    }

    updateCounter() {
        const counterElement = this.shadowRoot.getElementById('counter');
        counterElement.innerHTML = `Liczba zadań ${this.taskList.childNodes.length}`;
    }


}
customElements.define('todo-list', TodoList);
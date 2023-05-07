import { User } from "../models/User";

export class UserForm {
    constructor(
        public parent: Element,
        public model: User,
    ) {
        this.bindModel();
    }

    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        })
    }

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick,
        }
    }

    onSetNameClick = (): void => {
        const input = this.parent.querySelector('input');
        
        if (input) {
            const name = input.value;
            this.model.set({ name })
        }
    }

    onSetAgeClick = (): void => {
        console.log('click button');
        this.model.setRandomAge();
    }

    template(): string {
        return `
            <div>
                <h1>User Form </h1>
                <div> User name: ${this.model.get('name')}</div>
                <div> User age: ${this.model.get('age')}</div>
                <input /> 
                <button class=" set-name" type="button">Change name</button>
                <button class="set-age">Set random age</button>
            </div>
        `
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventMap = this.eventsMap();
        for (let eventKey in eventMap) {
            const [eventName, selector] = eventKey.split(':');;
            fragment.querySelectorAll(selector)
                .forEach((element) => {
                    element.addEventListener(eventName, eventMap[eventKey]);
                });

        }
    }

    render(): void {
        this.parent.innerHTML = '';
        const templateElemetnt = document.createElement('template');
        templateElemetnt.innerHTML = this.template();
        this.bindEvents(templateElemetnt.content);
        this.parent.append(templateElemetnt.content);
    }
}
import { User } from "../models/User";

export abstract class View {
    abstract eventsMap(): {[key: string]: ()  => void;};;
    abstract template(): string;
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
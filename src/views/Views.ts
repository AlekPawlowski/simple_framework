import { Model } from "../models/Model";
import { User } from "../models/User";

export abstract class View<T extends Model<K>, K> {
    regions: { [key: string]: Element } = {};

    constructor(
        public parent: Element,
        public model: User,
    ) {
        this.bindModel();
    }
    abstract template(): string;

    regionsMap(): { [key: string]: string } {
        return {} 
    }

    eventsMap(): { [key: string]: () => void } { 
        return {} 
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

    mapRegions(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap();
        for (let key in regionsMap) {
            const selector = regionsMap[key];
            const element  = fragment.querySelector(selector);
            if(element){
                this.regions[key] = element;
            }
        }
    }

    onRender(): void {}

    render(): void {
        this.parent.innerHTML = '';
        
        const templateElemetnt = document.createElement('template');
        templateElemetnt.innerHTML = this.template();
        
        this.bindEvents(templateElemetnt.content);
        this.mapRegions(templateElemetnt.content);

        this.onRender();


        this.parent.append(templateElemetnt.content);
    }
}
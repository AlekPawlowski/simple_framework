import { User } from "../models/User";
import { View } from "./Views";

export class UserForm extends View {
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
}
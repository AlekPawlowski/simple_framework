import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";


export class Collection<T, K> {
    models: T[] = [];
    events: Eventing = new Eventing();

    constructor(
        public rootUrl: string,
        public deserialize: (json: K) => T,
    ){}

    get on()  {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    fetch(): void {
        console.log(this.rootUrl)
        axios.get(this.rootUrl)
        .then((response: AxiosResponse) => {
            console.log("response: " + response);
            response.data.forEach((value: K) => {
                console.log(value)
                this.models.push(this.deserialize(value));
            });
        })
        this.trigger('change');
    }
}
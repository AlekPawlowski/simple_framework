import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";

export interface UserProps {
    name?: string;
    age?: number;
    id?: number;
}
const url = "http://localhost:3000/users"

export class User {
    public events: Eventing = new Eventing();
    public sync: Sync<UserProps> = new Sync<UserProps>(url);
    public attributes: Attributes<UserProps>;

    constructor(attrs: UserProps) {
        this.attributes = new Attributes<UserProps>(attrs);
    }

    get on() {
        // return reference to the events.on
        /*
            usage of this will be user.on('event', callback)
        */
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }
    
    get get() {
        return this.attributes.get;
    }
}

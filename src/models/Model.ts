import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
    set(value:T): void;
    getAll(): T;
    get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data:T): AxiosPromise;
}

interface Events {
    on(eventName: string, callback: () => void): void;
    trigger(eventName: string): void;
}

interface HasId {
    id?: number;
}


export class Model<T extends HasId> {
    constructor(
        private attributes: ModelAttributes<T>,
        private events: Events,
        private sync: Sync<T>
    ){}


    // get on() {
    //     // return reference to the events.on
    //     /*
    //         usage of this will be user.on('event', callback)
    //     */
    //     return this.events.on;
    // }
    // shorter synta for uuper code, we can use it only if in our constructor 
    // contains assigment of that call (for example ModelAttributes), otherwise it cannot be used cause
    // order of assigment methods vs constructor
    on = this.events.on;
    trigger = this.events.trigger;
    get = this.attributes.get;

    set(update: T): void {
        this.attributes.set(update);
        this.events.trigger("change");
    }

    fetch(): void {
        const id = this.get('id');

        if (typeof id !== 'number') {
            throw new Error('cannot fetch without and id');
        }

        this.sync.fetch(id).then(
            (response: AxiosResponse): void => {
                this.set(response.data);
            });
    }

    save(): void {
        this.sync
            .save(this.attributes.getAll())
            .then(
                (response: AxiosResponse): void => {
                    this.trigger('save');
                }
            )
            .catch(() => {
                this.trigger('error');
            });
    }
}
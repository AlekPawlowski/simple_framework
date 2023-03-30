import axios, { AxiosResponse } from "axios";
const url = "http://localhost:3000/users"
interface UserProps {
    name?: string;
    age?: number;
    id?: number;
}

export class User {
    constructor(private data: UserProps) { }

    get(propName: string): string | number {
        return this.data[propName];
    }

    set(update: UserProps): void {
        Object.assign(this.data, update);
    }

    fetch(): void {
        axios.get(`${url}/${this.get('id')}`)
            .then((response: AxiosResponse): void => {
                this.set(response.data);
            })
    }

    save(): void {
        const id = this.get('id');
        if (id) {
            // put
            axios.put(`${url}/${id}`, this.data);
        } else {
            // post
            axios.post(url, this.data);
        }
    }
}

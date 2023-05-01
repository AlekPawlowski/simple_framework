import { User } from "./models/User";

const user = new User({ id: 1, name: "John", age: 999})

user.on('save', () => {
    console.log(user);
});

user.save();
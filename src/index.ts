import { User } from "./models/User";

const user = new User({name: "John", age: 20});
user.on('change', () => {
    console.log('user changed 3');
});

user.on('change', () => {
    console.log('user changed 2');
});

user.on('save', () => {
    console.log('save was triggered');
});

user.trigger('save');

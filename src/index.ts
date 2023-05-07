import { User } from "./models/User";
import { UserForm } from "./views/UserForm";

const user = User.buildUser({ name: "John", age: 20 });
const root = document.getElementById('root');

if (root) {
    const userForm = new UserForm(
        root,
        user
    );
    userForm.render();
}
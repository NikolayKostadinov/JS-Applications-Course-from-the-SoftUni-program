import {html} from "../../node_modules/lit-html/lit-html.js";
import {notify} from "../api/notification.js";
import {register} from "../api/users.js";
import {createSubmitHandler} from "../utils.js";

const registerTemplate = (onSubmit) => html`
    <section id="register-page" class="content auth">
        <form id="register" @submit=${onSubmit}>
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Register</h1>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="maria@email.com">

                <label for="pass">Password:</label>
                <input type="password" name="password" id="register-password">

                <label for="con-pass">Confirm Password:</label>
                <input type="password" name="confirm-password" id="confirm-password">

                <input class="btn submit" type="submit" value="Register">

                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </div>
        </form>
    </section>
`;

export function registerView(ctx) {
    let handler = createSubmitHandler(ctx, onSubmit);
    ctx.render(registerTemplate(handler));
}

async function onSubmit(ctx, data, event) {
    if (Object.values(data).some(v => v === '')) {
        notify('All fields are required!');
        return;
    }

    if (data.password !== data['confirm-password']) {
        notify('Passwords must be the same!');
        return;
    }
    await register(data.email, data.password);
    event.target.reset();
    ctx.page.redirect('/')
}

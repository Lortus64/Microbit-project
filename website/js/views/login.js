import m from 'mithril';
import * as modul from "../models/auth";

let login = {
    oninit: modul.auth.clear(),
    view: function() {
        return m("main.container", [
            m("h1.title", "Login"),
            m("form", {
                onsubmit: function(event) {
                    event.preventDefault();
                    modul.auth.login();
                } }, [
                m("label.input-label", "Username"),
                m("input.input[type=text][placeholder=Username][required]", {
                    oninput: function (e) {
                        modul.auth.username = e.target.value;
                    }
                }),

                m("label.input-label", "Password"),
                m("input.input[type=password][required]", {
                    onchange: function (e) {
                        modul.auth.password = e.target.value;
                    }
                }),

                m("input[type=submit][value=Log in].button", "Logga in")
            ]),
        ]);
    }
};

export { login };

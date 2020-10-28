var m = require("mithril");
import {baseUrl} from "./vars";

var auth = {
    username: "",
    password: "",
    token: "",

    clear: function() {
        auth.username = "";
        auth.password = "";
    },

    login: function() {
        m.request({
            method: "POST",
            url: `${baseUrl}/login`,
            headers: { "Content-Type": "application/json" },
            body: {
                username: auth.username,
                password: auth.password
            }
        }).then(function(result) {
            if(result == "100"){
                auth.token = "100"
                m.route.set("/admin");
            }
        });
        m.route.set("/login");
    }
};

export { auth };

"use strict";

import m from "mithril";
import { layout } from "./views/layout";
import { home } from "./views/home";
import { history } from "./views/history";
import { login } from "./views/login";
import { layoutlogin } from "./views/loginlayout";
import { admin } from "./views/admin";
import { add } from "./views/add";
import { del } from "./views/delete";
import { update } from "./views/update";
import { auth } from "./models/auth";

m.route(document.body, "/", {
    "/": {
        render: function() {
            if (auth.token) {
                return m(layoutlogin, m(home));
            }
            return m(layout, m(home));
        }
    },
    "/history": {
        render: function() {
            if (auth.token) {
                return m(layoutlogin, m(history));
            }
            return m(layout, m(history));
        }
    },
    "/login": {
        render: function() {
            return m(layout, m(login));
        }
    },
    "/admin": {
        render: function() {
            if (auth.token) {
                return m(layoutlogin, m(admin));
            }
            return m.route.set("login");
        }
    },
    "/admin/add": {
        render: function() {
            if (auth.token) {
                return m(layoutlogin, m(add));
            }
            return m.route.set("login");
        }
    },
    "/admin/delete:id": {
        render: function(vnode) {
            if (auth.token) {
                return m(layoutlogin, m(del, vnode.attrs));
            }
            return m.route.set("login");
        }
    },
    "/admin/update:id": {
        render: function(vnode) {
            if (auth.token) {
                return m(layoutlogin, m(update, vnode.attrs));
            }
            return m.route.set("login");
        }
    },
});

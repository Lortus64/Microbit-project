"use strict";

import m from 'mithril';

let layoutlogin = {
    view: function(vnode) {
        var currentURL = m.route.get();

        return [
            m("nav.bottom-nav",
                m("a.link[href=#!/]", {
                    class: currentURL === "/" ? "selected" : ""
                }, "Data"),
                m("a.link[href=#!/history]", {
                    class: currentURL === "/history" ? "selected" : ""
                }, "History"),
                m("a.link[href=#!/admin]", {
                    class: currentURL === "/admin" ? "selected" : ""
                }, "Admin"),
            ),
            m("main.container", vnode.children),
        ];
    }
};

export { layoutlogin };

import m from 'mithril';
import * as modul from "../models/form";

let del = {
    oninit: function(vnode) {
        modul.form.id = vnode.attrs.id;
    },

    view: function(vnode) {
        return m("form", {
            onsubmit: function(event) {
                event.preventDefault();
                modul.form.del();
            } }, [
            m("P", "Are you sure you want to delete microbit ", vnode.attrs.id),
            m("input[type=submit][value=Delete].button", "Delete")
        ]);
    }
};

export { del };
import m from 'mithril';
import * as modul from "../models/form";

let update = {
    oninit: function(vnode) {
        modul.form.setup(vnode.attrs.id);
    },
    view: function() {
        return m("form", {
            onsubmit: function(event) {
                event.preventDefault();
                modul.form.update();
            } }, [
            m("p", modul.form.info),
            m("label.input-label", "Microbit id"),
            m("p", "Must be a unique number"),
            m(`input.input[type=number][placeholder=${modul.form.id}]`, {
                oninput: function (e) {
                    modul.form.id = e.target.value;
                }
            }),

            m("label.input-label", "Room"),
            m("p", "Room the microbit is in"),
            m(`input.input[type=text][placeholder=${modul.form.room}]`, {
                onchange: function (e) {
                    modul.form.room = e.target.value;
                }
            }),

            m("label.input-label", "Description"),
            m("p", "Extra information on the microbit"),
            m(`input.input[type=text][placeholder=${modul.form.descript}]`, {
                onchange: function (e) {
                    modul.form.descript = e.target.value;
                }
            }),

            m("input[type=submit][value=Save].button", "Save")
        ]);
    }
};

export { update };
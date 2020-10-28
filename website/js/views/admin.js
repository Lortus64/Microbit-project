import m from 'mithril';
import * as modul from "../models/form";

let admin = {
    oninit: function() {
        modul.form.getall();
    },

    view: function() {
        console.info(modul.form.data);
        return m("main.container", [
            m("h1.title", "Admin"),
            m(
                "a.button",
                { href: "#!/admin/add" },
                "Add Microbit"
            ),

            m("table.table-scroll.table-striped", [
                m("thead", [
                    m("tr", [
                        m("th", "Id"),
                        m("th", "Room"),
                        m("th", "Description")
                    ])
                ]),
                m("tbody", modul.form.data.map(function (value) {
                    return m("tr", [
                        m("td", value.microbitid),
                        m("td", value.room),
                        m("td", value.descript),
                        m("td", m("a.button", { href: "#!/admin/update" + value.microbitid}, "Update")),
                        m("td", m("a.button", { href: "#!/admin/delete" + value.microbitid}, "Delete"))
                    ]);
                }))
            ])
        ]);
    }
};

export { admin };
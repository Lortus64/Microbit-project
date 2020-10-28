"use strict";

import m from 'mithril';
import * as modul from "../models/history";


let history = {
    oninit: function() {
        modul.history.get_all();
    },
    view: function() {
        return m("main.container", [
            m("h1.title", "History"),
            m("table.table-scroll.table-striped", [
                m("thead", [
                    m("tr", [
                        m("th", "Id"),
                        m("th", "Maxtemp"),
                        m("th", "Mintemp"),
                        m("th", "Maxlight"),
                        m("th", "Minlight"),
                        m("th", "Time")
                    ])
                ]),
                m("tbody", modul.history.data.map(function (value) {
                    return m("tr", [
                        m("td", value.microbitid),
                        m("td", value.maxtemp),
                        m("td", value.mintemp),
                        m("td", value.maxlight),
                        m("td", value.minlight),
                        m("td", value.logtime)
                    ]);
                }))
            ])
        ]);
    }
};

export { history };

"use strict";

import m from 'mithril';
import io from 'socket.io-client';
var data = [];


let home = {
    oninit: function() {
        const socket = io('localhost:3000');
        socket.on('data', (result) => {
            data = result;
            m.redraw();
        })
    },

    view: function() {
        console.info(data);
        return m("main.container", [
            m("h1.title", "Microbitdata"),
            data.map(function (value) {
                // console.info("Room change");
                return m("div.room", [
                    m("h2", `${value[0].room}`),
                    value.map(function (romvalue) {
                        return m("div.value", [
                            // console.info(romvalue),
                            // m("p", `________________________________`),
                            m("p", `Microbit: ${romvalue.microbitid}`),
                            m("p", `temp: ${romvalue.temperature} | light: ${romvalue.light}`),
                            m("p", `${romvalue.descript}`)
                        ])
                    })
                ])
            })
        ])
    }
};

export { home };

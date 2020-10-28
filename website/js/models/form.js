var m = require("mithril");
import {baseUrl} from "./vars";

var form = {
    oldid: "",
    id: "",
    room: "",
    descript: "",
    data: [],
    info: "",

    getall: function() {
        m.request({
            method: "GET",
            url: `${baseUrl}/getall`,
            mode: "cors"
        }).then(function(result) {
            form.data = result[0];
        });
    },

    save: function() {
        form.getall();
        var go = true;

        form.data.map(function(value){
            if(value.microbitid == form.id) {
                go = false;
            };
        });

        if (go) {
            m.request({
                method: "POST",
                url: `${baseUrl}/addbit`,
                headers: { "Content-Type": "application/json" },
                body: {
                    id: form.id,
                    room: form.room,
                    descript: form.descript
                }
            });

            form.clear();
            m.route.set("/");
        }
        else {
            form.data = [];
            form.info = `Id ${form.id} is already in use!`;
            m.route.set("/admin/add");
        }
    },

    update: function() {
        var go = true;

        m.request({
            method: "POST",
            url: `${baseUrl}/getone`,
            headers: { "Content-Type": "application/json" },
            body: {
                id: form.id,
            }
        }).then(function(result) {

            console.info("result");
            console.info(result);

            if(typeof result[0][0] !== "undefined") {
                console.info(result[0][0].microbitid);
                console.info(form.id);
                console.info(form.oldid);
                if(result[0][0].microbitid == form.id && result[0][0].microbitid != form.oldid) {
                    go = false;
                };
            };


            if (go) {
                m.request({
                    method: "POST",
                    url: `${baseUrl}/update`,
                    headers: { "Content-Type": "application/json" },
                    body: {
                        oldid: form.oldid,
                        id: form.id,
                        room: form.room,
                        descript: form.descript
                    }
                });
                console.info("Done");
                form.clear();
                m.route.set("/");
            }
            else {
                form.info = `Id ${form.id} is already in use!`;
                m.redraw();
            };
        });

    },

    del: function() {
        m.request({
            method: "POST",
            url: `${baseUrl}/del`,
            headers: { "Content-Type": "application/json" },
            body: {
                id: form.id,
            }
        });

        form.clear();
        m.route.set("/");
    },

    clear: function() {
        form.oldid = "";
        form.id = "";
        form.room = "";
        form.descript = "";
        form.info = "";
        form.data = [];
    },

    setup: function(id) {
        m.request({
            method: "POST",
            url: `${baseUrl}/getone`,
            headers: { "Content-Type": "application/json" },
            body: {
                id: id,
            }
        }).then(function(result) {
            form.oldid = result[0][0].microbitid;
            form.id = result[0][0].microbitid;
            form.room = result[0][0].room;
            form.descript = result[0][0].descript;
        });
    }
};

export { form };

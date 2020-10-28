var m = require("mithril");
import {baseUrl} from "./vars";

let history = {
    data: [],

    get_all: function() {
        m.request({
            method: "GET",
            url: `${baseUrl}`,
            mode: "cors"
        }).then(function(result) {
            console.info(result);
            history.data = result;
        });
    }
}

export { history };

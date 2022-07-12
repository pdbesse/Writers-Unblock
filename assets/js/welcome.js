$(document).ready(getWelcomeBackground);

var background = $("html");

$("#unblock-btn").click(function () {
    document.location = "prompt-page.html"
    }
)

function getWelcomeBackground() {
    var accessKey = "vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE";

    var welcomeURL = `https://api.unsplash.com/collections/06kpy-uZhBw/photos?client_id=${accessKey}`

    fetch(welcomeURL).then(function (response) {
        return response.json();
    })
        .then(function (welcomedata) {
            console.log(welcomedata);
            i = Math.floor(Math.random() * welcomedata.length);
            var welcomeLink = welcomedata[i].urls.full;
            background.css("background-image", "url("+ welcomeLink +")");
        })
}
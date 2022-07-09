$(document).ready(getWelcomeBackground);

var background = $("html");

$("#unblock-btn").click(function () {
    
        
    }
)

function getWelcomeBackground() {
    var accessKey = "vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE";

    var welcomeURL = `https://api.unsplash.com/collections/06kpy-uZhBw/photos?client_id=${accessKey}`

    // need to add Math.random and return multiple objects
    fetch(welcomeURL).then(function (response) {
        return response.json();
    })
        .then(function (welcomedata) {
            console.log(welcomedata);
            i = Math.floor(Math.random() * welcomedata.length);
            // console.log(welcomedata.results);
            var welcomeLink = welcomedata[i].urls.full;
            background.css("background-image", "url("+ welcomeLink +")");
            // background.css("background-size", "cover")
    
        })
}
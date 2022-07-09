$(document).ready(getWelcomeBackground);

var background = $("#background");

$("#unblock-btn").click(function () {
    
        
    }
)

function getWelcomeBackground() {
    var accessKey = "vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE";

    var welcomeURL = `https://api.unsplash.com/users/pdbesse/collections&client_id=${accessKey}`

    // need to add Math.random and return multiple objects
    fetch(welcomeURL).then(function (response) {
        return response.json();
    })
        .then(function (welcomedata) {
            console.log(welcomedata);
            /* i = Math.floor(Math.random() * portraitdata.results.length); */
            // console.log(portraitdata.results);
            /* var welcomeLink = portraitdata.results[i].urls.small;
            background.attr("src", welcomeLink); */
    
        })
}
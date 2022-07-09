/*  if #nameCheck is true, run getName and display to label #name
    if #portraitCheck is true, run getPersonPicture and change src of #portrait
    if #settingsCHeck is true, run getSettingPicture and display to grid layout
    if adjCheck is true, run getAdjs and display to #adj1, #adj2, #adj3
    if nounsCheck is true, run getNouns and display to #noun1, #noun2, #noun3
 */

var nameCheck = $("#nameCheck")
var portraitCheck = $("#portraitCheck")
var settingCheck = $("#settingCheck")
var adjCheck = $("#adjCheck")
var nounsCheck = $("#nounsCheck")
var themeCheck = $("#storyCheck")
var searchBtn = $("#search-btn");
var saveBtn = $("save-btn");
var portrait = $("#portrait")
var storyThemes = ["Good vs Evil", "Love", "Redemption", "Courage & Perseverance", "Coming of Age", "Revenge"]

var promptObjLS = {
    promptid: "",
    name: "",
    portrait: "",
    adjective1: "",
    adjdef1: "",
    adjective2: "",
    adjdef2: "",
    adjective3: "",
    adjdef3: "",
    noun1: "",
    noundef1: "",
    noun2: "",
    noundef2: "",
    noun3: "",
    noundef3: "",
    theme: "",
    setting: "",
    setting: "",
    setting: ""
}

$("#save-btn").click(function () {
    localStorage.setItem("prompt", JSON.stringify(promptObjLS));
    console.log(promptObjLS);
})


// external js: masonry.pkgd.js, imagesloaded.pkgd.js

//comment out 
// init Masonry after all images have loaded
var $grid = $('.grid').imagesLoaded(function () {
    $grid.masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
        columnWidth: '.grid-sizer'

    });

});

// var $grid = $('.grid').masonry({
//     itemSelector: '.grid-item',
//     percentPosition: true,
//     columnWidth: '.grid-sizer'
// });
// $grid.imagesLoaded(function () {
//     $grid.masonry('layout');
// }

// )

$("#search-btn").click(function () {

    if (!(portraitCheck.is(":checked")) && !(nameCheck.is(":checked")) && !(nounsCheck.is(":checked")) && !(adjCheck.is(":checked")) && !(themeCheck.is(":checked")) && settingCheck.val() == "blank") {
        console.log("no input search was requested")
        $( "#dialog" ).dialog({
            autoOpen: false,
            show: {
                effect: "blind",
                duration: 500
            },
            hide: {
                effect: "explode",
                duration: 500
            }
        });
        $( "#dialog" ).dialog( "open" )
    }
    if (portraitCheck.is(":checked")) {
        /* alert("test"); */
        getPersonPicture();
    }
    if (nameCheck.is(":checked")) {
        getName();
    }
    if (nounsCheck.is(":checked")) {
        $("#noun-container").empty();
        getNouns();
    }
    if (adjCheck.is(":checked")) {
        $("#adj-container").empty();
        getAdjs();
    }
    if (themeCheck.is(":checked")) {
        getTheme();
    }
    if (settingCheck.val() !== "blank") {
        console.log("settingCheck.val() !== blank")
        getItemElementWithQuery(function (imgEl) {
            // $grid.empty();
            // $grid.masonry( 'remove', elements)
            console.log(imgEl)
            var elems = [imgEl];
            // make jQuery object
            var $elems = $(elems);
            $grid.prepend($elems).masonry('prepended', $elems);
        });


    }
})


// Unsplash API request
// person

function getPersonPicture() {
    var accessKey = "vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE";
    var pageNum = Math.floor(Math.random() * 5);

    var personPicURL = `https://api.unsplash.com/search/photos?&query=man%20person&per_page=30&page=${pageNum}&client_id=${accessKey}`

    // need to add Math.random and return multiple objects
    fetch(personPicURL).then(function (response) {
        return response.json();
    })
        .then(function (portraitdata) {
            i = Math.floor(Math.random() * portraitdata.results.length);
            /* console.log(portraitdata.results); */
            var portraitLink = portraitdata.results[i].urls.small;
            portrait.attr("src", portraitLink);
            promptObjLS["portrait"] = portraitLink;
        })
}

//WordsAPI request
// noun

// only one random word can be returned per request => run multiple times?
function getNouns() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5310a4a30cmsh92d3fc3f3671101p143a11jsn790aeb586352',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };

    for (i = 0; i < 3; i++) {
        fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true&partOfSpeech=noun', options)
            .then(function (response) {
                return response.json();
            })
            .then(function (noundata) {
                /* console.log(noundata.word);
                console.log(noundata.results[0].definition); */

                var nounCard = document.createElement("div");
                nounCard.setAttribute("class", "card, column");
                $(nounCard).append("<h5 class='card-header'>" + noundata.word + "</h5>");
                $(nounCard).append("<p class='card-content'>" + noundata.results[0].definition + "</p>");
                $("#noun-container").append(nounCard);
                promptObjLS["noun" + i] = noundata.word;
                promptObjLS["noundef" + i] = noundata.results[0].definition;
            })
    }
}

function getAdjs() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5310a4a30cmsh92d3fc3f3671101p143a11jsn790aeb586352',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };

    for (i = 0; i < 3; i++) {
        fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true&partOfSpeech=adjective', options)
            .then(function (response) {
                return response.json();
            })
            .then(function (adjdata) {
                /* console.log(adjdata.word);
                console.log(adjdata.results[0].definition); */
                promptObjLS["adjective" + i] = adjdata.word;
                promptObjLS["adjdef" + i] = adjdata.results[0].definition;

                var adjCard = document.createElement("div");
                adjCard.setAttribute("class", "card, column");
                $(adjCard).append("<h5 class='card-header'>" + adjdata.word + "</h5>");
                $(adjCard).append("<p class='card-content'>" + adjdata.results[0].definition + "</p>");
                $("#adj-container").append(adjCard);
            })
    }
}

// NameFake API request

function getName() {
    var nameURL = "https://randomuser.me/api/?nat=us";
    fetch(nameURL).then(function (response) {
        return response.json();
    })
        .then(function (namedata) {
            var name = ((namedata.results[0].name.first) + " " + (namedata.results[0].name.last));
            globalName = name;
            console.log(globalName);
            /* console.log((namedata.results[0].name.first) + " " + (namedata.results[0].name.last)); */
            /* console.log(name); */
            $("#name").text(name);
            promptObjLS["name"] = name;

        })
}

function getTheme() {
    var i = Math.floor(Math.random() * storyThemes.length);
    $("#story-theme").text(storyThemes[i]);
}


/* // create <div class="grid-item"></div>
  function getItemElementWithQuery() {
    var accessKey = "vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE";
    var settingsQuery = $("#setting").val();
    /* console.log(settingsQuery); */
/*  var pageNum = Math.floor(Math.random() * 5);
 var settingPicURL = `https://api.unsplash.com/search/photos?&query=${settingsQuery}&page=${pageNum}&client_id=${accessKey}` */

// need to add Math.random and return multiple objects
/*  fetch(settingPicURL).then(function (response) {
     return response.json();
 })
     .then(function (settingdata) {
         i = Math.floor(Math.random() * settingdata.results.length) */
/* console.log(settingdata.results); */
/* 
            var settingLink = settingdata.results[i].urls.small;
            var img = document.createElement('img');
            img.setAttribute("class", "grid-item");
            $img.attr("src", settingLink);
        }
        )
    return img;
    } */

function getItemElementWithQuery(cb) {
    var img = document.createElement('img')
    var $img = $(img)
    img.className = 'grid-item'
    var accessKey = "vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE";
    var settingsQuery = $("#settingCheck").val();
    console.log($("#settingCheck").val());
    /* console.log(settingsQuery); */
    var pageNum = Math.floor(Math.random() * 30);
    var settingPicURL = `https://api.unsplash.com/search/photos?&query=${settingsQuery}&page=${pageNum}&client_id=${accessKey}`

    // need to add Math.random and return multiple objects
    fetch(settingPicURL).then(function (response) {
        return response.json();
    })
        .then(function (settingdata) {
            i = Math.floor(Math.random() * settingdata.results.length)
            // console.log(settingdata.results);
            var settingLink = settingdata.results[i].urls.small;
            $img.attr("src", settingLink);
            cb(img)
            // return img;
        }
        )

}

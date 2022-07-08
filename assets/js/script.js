/*  if #nameCheck is true, run getName and display to label #name
    if #portraitCheck is true, run getPersonPicture and change src of #portrait
    if #settingsCHeck is true, run getSettingPicture and display to grid layout
    if adjCheck is true, run getAdjs and display to #adj1, #adj2, #adj3
    if nounsCheck is true, run getNouns and display to #noun1, #noun2, #noun3
 */

var nameCheck = $("#nameCheck")
var portraitCheck = $("#portraitCheck")
var settingsCheck = $("#settingsCheck")
var adjCheck = $("#adjCheck")
var nounsCheck = $("#nounsCheck")
var themeCheck = $("#storyCheck")
var searchBtn = $("#search-btn");
var saveBtn = $("save-btn");
var portrait = $("#portrait")
var settingsLinks
var nouns
var adjs
var storyThemes = ["Good vs Evil", "Love", "Redemption", "Courage & Perseverance", "Coming of Age", "Revenge"]

$("#search-btn").click(function () {
    if (portraitCheck.is(":checked")) {
        /* alert("test"); */
        getPersonPicture();
    }
    if (nameCheck.is(":checked")) {
        getName();
    }
    if (nounsCheck.is(":checked")){
        getNouns();
    }
    if (adjCheck.is(":checked")){
            getAdjs();
    }
    if (themeCheck.is(":checked")){
        getTheme();
    }
})


// Unsplash API request
// person

function getPersonPicture() {
    var accessKey = "vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE";
    var pageNum = Math.floor(Math.random() * 30);

    var personPicURL = `https://api.unsplash.com/search/photos?&query=man%20person&per_page=30&page=${pageNum}&client_id=${accessKey}`

    // need to add Math.random and return multiple objects
    fetch(personPicURL).then(function (response) {
        return response.json();
    })
        .then(function (portraitdata) {
            i = Math.floor(Math.random() * portraitdata.results.length);
            console.log(portraitdata.results);
            var portraitLink = portraitdata.results[i].urls.small;
            portrait.attr("src", portraitLink);
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
            console.log(adjdata.word);
            console.log(adjdata.results[0].definition);

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
            /* console.log((namedata.results[0].name.first) + " " + (namedata.results[0].name.last)); */
            /* console.log(name); */
            $("#name").text(name);

        })
}

function getTheme() {
    var i = Math.floor(Math.random() * storyThemes.length);
    $("#story-theme").text(storyThemes[i]);
}


// story themes list in array
// 













// external js: masonry.pkgd.js, imagesloaded.pkgd.js

// init Masonry after all images have loaded
var $grid = $('.grid').imagesLoaded(function () {
    $grid.masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
        columnWidth: '.grid-sizer'
    });
});


$('.append-button').on('click', function () {
    event.preventDefault();
    var elems = [getItemElement()];
    // // make jQuery object
    var $elems = $( elems );
    $grid.prepend( $elems ).masonry( 'prepended', $elems );
    });

// create <div class="grid-item"></div>
function getItemElement() {

    var img = document.createElement('img')
    var $img = $( img )
    img.className = 'grid-item'
    var accessKey = "vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE";
    var pageNum = Math.floor(Math.random() * 30);
    var settingPicURL = `https://api.unsplash.com/search/photos?&query=landscape&per_page=30&page=${pageNum}&client_id=${accessKey}`

    // need to add Math.random and return multiple objects
    fetch(settingPicURL).then(function (response) {
        return response.json();
    })
        .then(function (settingdata) {
            i = Math.floor(Math.random() * settingdata.results.length)
            console.log(settingdata.results);
            var settingLink = settingdata.results[i].urls.small;
            $img.attr("src", settingLink);
        }
        )
    return img;
  }

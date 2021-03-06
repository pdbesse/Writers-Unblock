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
var settingNote = $("#note");

// empty local storage object
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
    settingArray: []
}

// external js: masonry.pkgd.js, imagesloaded.pkgd.js
// init Masonry after all images have loaded
var $grid = $('.grid').imagesLoaded(function () {
    $grid.masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
        transitionDuration: '0.8s',
        initLayout: false,
        columnWidth: '.grid-sizer'
    });
});

// remove clicked items from masonry
$grid.on('click', '.grid-item', function () {
    if ($grid.masonry('getItemElements').length == 1) {
        document.getElementById('note').className += " is-hidden";
    }

    // remove clicked element
    $grid.masonry('remove', this)
        // layout remaining item elements
        .masonry('layout');
});

// on click, search button validates user input and runs functions according to which options are selected
$("#search-btn").click(function () {
    document.getElementById('result-container').className += " is-hidden";
    // if no user input selection, run Invalid Input dialogue
    if ((portraitCheck.val() == "blank") && (nameCheck.val() == "blank") && !(nounsCheck.is(":checked")) && !(adjCheck.is(":checked")) && !(themeCheck.is(":checked")) && (settingCheck.val() == "blank")) {
        $("#dialog").dialog({
            title: "Invalid Input ",
            autoOpen: false,
            width: 350,
            height: 100,
            modal: true,
            draggable: false,
            resizable: false,
            closeOnEscape: false,
            show: {
                effect: "blind",
                duration: 10
            },
            hide: {
                effect: "explode",
                duration: 500
            }
        });
        $("#dialog").dialog("open")
    }
    // if name name input does not equal "blank", run getName()
    if (nameCheck.val() !== "blank") {
        getName();
        document.getElementById('name-container').className -= "is-hidden";
        nameCheck.prop('checked', false);
        nameCheck.val("blank").change();
    }
    // if portrait input does not equal "blank", run getPersonPicture()
    if (portraitCheck.val() !== "blank") {
        getPersonPicture();
        document.getElementById('portrait-container').className -= "is-hidden";
        portraitCheck.prop('checked', false);
        portraitCheck.val("blank").change();
    }
    // if adjective input is checked, run getAdjs()
    if (adjCheck.is(":checked")) {
        $("#adj-container").empty();
        getAdjs();
        document.getElementById('adj-container-hide').className -= "is-hidden";
        adjCheck.prop('checked', false);
    }
    //if noun input is checked, run getNouns()
    if (nounsCheck.is(":checked")) {
        $("#noun-container").empty();
        getNouns();
        document.getElementById('noun-container-hide').className -= "is-hidden";
        nounsCheck.prop('checked', false);
    }
    // if theme input is checked, run getTheme()
    if (themeCheck.is(":checked")) {
        getTheme();
        document.getElementById('story-container').className -= "is-hidden";
        themeCheck.prop('checked', false);
    }
    // if setting input does not equal "blank", run getItemElementWithQuery()
    if (settingCheck.val() !== "blank") {
        getItemElementWithQuery(function (imgEl) {
            var elems = [imgEl];
            // make jQuery object
            var $elems = $(elems);

            $grid.prepend($elems).masonry('prepended', $elems);
            $grid.imagesLoaded().progress(function () {
                $grid.masonry('layout');
            });


        });
        document.getElementById('grid-container').className -= "is-hidden";
    }
    document.getElementById('result-container').className -= " is-hidden";
})

//generate 3 more images for setting
$("#more-btn").click(function () {
    if (settingCheck.val() !== "blank") {
        for (var i = 0; i < 3; i++) {
            getItemElementWithQuery(function (imgEl) {
                var elems = [imgEl];
                // make jQuery object
                var $elems = $(elems);
                $grid.prepend($elems).masonry('prepended', $elems);
                $grid.imagesLoaded().progress(function () {
                    $grid.masonry('layout');
                });
            });
        }
        document.getElementById('result-container').className -= " is-hidden";
    }
})

$("#save-btn").click(function () {
    // if there is no prompt already in local storage
    if (!localStorage.getItem("prompt")) {
        localStorage.setItem("prompt", JSON.stringify(promptObjLS));
    } else {
        // implement saving multiple prompt choices
        localStorage.setItem("prompt", JSON.stringify(promptObjLS));
        console.log("There is already a locally stored prompt object")
    }
    var adjContainer = document.getElementById("adj-container");

    for (i = 1; i < 4; i++) {
        promptObjLS["adjective" + i] = adjContainer.children[i - 1].children[0].textContent;
        promptObjLS["adjdef" + i] = adjContainer.children[i - 1].children[1].textContent;
    }
    var nounContainer = document.getElementById("noun-container");

    for (i = 1; i < 4; i++) {
        promptObjLS["noun" + i] = nounContainer.children[i - 1].children[0].textContent;
        promptObjLS["noundef" + i] = nounContainer.children[i - 1].children[1].textContent;
    }
    //gets current grid of images and saves them as an array of img.grid-item elements
    var elems = $grid.masonry('getItemElements')
    promptObjLS['settingArray'] = elems;
    console.log(promptObjLS);
    localStorage.setItem("prompt", JSON.stringify(promptObjLS));
})

// Randomuser.me API request
// get random name function
function getName() {
    // use of template literal to pass input value as search parameter in request URL
    var nameGender = nameCheck.val();
    var nameURL = `https://randomuser.me/api/?gender=${nameGender}&nat=us`;
    fetch(nameURL).then(function (response) {
        return response.json();
    })
        // pull first and last name from JSON response
        .then(function (namedata) {
            var name = ((namedata.results[0].name.first) + " " + (namedata.results[0].name.last));

            // add value pulled from JSON response to HTML and local storage object
            $("#name").text(name);
            promptObjLS["name"] = name;
        })
}

// Unsplash API request
// get random person portrait function
function getPersonPicture() {
    // use of template literal to pass access key and input value as search parameter in request URL 
    var accessKey = "vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE";
    var portraitGender = portraitCheck.val();
    // select random page number and pass as search parameter
    var pageNum = Math.floor(Math.random() * 5);
    var personPicURL = `https://api.unsplash.com/search/photos?&query=${portraitGender}%20person&per_page=30&page=${pageNum}&client_id=${accessKey}`

    fetch(personPicURL).then(function (response) {
        return response.json();
    })
        .then(function (portraitdata) {
            // select random index from returned JSON object
            i = Math.floor(Math.random() * portraitdata.results.length);
            // add URL pulled from JSON response to image src and local storage object
            var portraitLink = portraitdata.results[i].urls.small;
            portrait.attr("src", portraitLink);
            promptObjLS["portrait"] = portraitLink;
        })
}

// Words API request
// get random adjectives and definitions function
function getAdjs() {
    // headers to pass request authorization
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5310a4a30cmsh92d3fc3f3671101p143a11jsn790aeb586352',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };
    // for loop to run fetch and HTML element creation/appending three times
    for (i = 0; i < 3; i++) {
        fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true&partOfSpeech=adjective', options)
            .then(function (response) {
                return response.json();
            })
            .then(function (adjdata) {
                // create adjCard div and set classes
                var adjCard = document.createElement("div");
                adjCard.setAttribute("class", "card, column");
                // pull word from JSON response and add to created h5 element
                $(adjCard).append("<h5 class='card-header'>" + adjdata.word + "</h5>");
                // pull definition from JSON response and add to created p element
                $(adjCard).append("<p class='card-content'>" + adjdata.results[0].definition + "</p>");
                // append adjCard to the HTML page
                $("#adj-container").append(adjCard);
            })
    }
}

// WordsAPI request
// get random nouns and definitions function
function getNouns() {
    const options = {
        // headers to pass request authorization
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5310a4a30cmsh92d3fc3f3671101p143a11jsn790aeb586352',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };
    // for loop to run fetch and HTML element creation/appending three times
    for (i = 0; i < 3; i++) {
        fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true&partOfSpeech=noun', options)
            .then(function (response) {
                return response.json();
            })
            .then(function (noundata) {
                // create nounCard div and set classes
                var nounCard = document.createElement("div");
                nounCard.setAttribute("class", "card, column");
                // pull word from JSON response and add to created h5 element
                $(nounCard).append("<h5 class='card-header'>" + noundata.word + "</h5>");
                // pull definition from JSON response and add to created p element
                $(nounCard).append("<p class='card-content'>" + noundata.results[0].definition + "</p>");
                // append nounCard to the HTML page
                $("#noun-container").append(nounCard);
            })
    }
}

// get random story theme function
function getTheme() {
    // select random element from story theme array
    var i = Math.floor(Math.random() * storyThemes.length);
    // add random element value as text to the HTML page and local storage object
    $("#story-theme").text(storyThemes[i]);
    promptObjLS["theme"] = storyThemes[i];
}

// function with a callback function to wait for image to return before using it
function getItemElementWithQuery(cb) {
    var img = document.createElement('img')
    var $img = $(img)
    img.className = 'grid-item'
    var accessKey = "vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE";
    var settingsQuery = $("#settingCheck").val();
    var pageNum = Math.floor(Math.random() * 30);
    var settingPicURL = `https://api.unsplash.com/search/photos?&query=${settingsQuery}&page=${pageNum}&client_id=${accessKey}`

    // need to add Math.random and return multiple objects
    fetch(settingPicURL).then(function (response) {
        return response.json();
    })
        .then(function (settingdata) {
            i = Math.floor(Math.random() * settingdata.results.length)
            var settingLink = settingdata.results[i].urls.small;
            $img.attr("src", settingLink);
            cb(img)
        }
        )
}


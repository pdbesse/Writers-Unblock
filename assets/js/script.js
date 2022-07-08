$("#generate").on("click"), getName();

// Unsplash API request
// person

function getPersonPicture (){
    /* var accessKey = "vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE" */
    var personPicURL = `https://api.unsplash.com/search/photos?&query=person&client_id=vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE`

    // need to add Math.random and return multiple objects
    fetch(personPicURL).then(function (response) {
        return response.json();})
        .then(function (data) {
            for (i=1; i<2; i++) {
            console.log(data.results[i])

            var personURL = data.results[i].urls.small;
            $("#picture").attr("src", personURL);
            }
            
        }
        
)}


$("#generate").on("click", getPersonPicture);


//WordsAPI request
// noun

function getNoun() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5310a4a30cmsh92d3fc3f3671101p143a11jsn790aeb586352',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };
    
    fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true&limit=5&partOfSpeech=noun', options)
    .then(function (response) {
        return response.json();})
        .then(function (data) {
            console.log(data);
        })
    }


// NameFake API request

function getName () {
    var nameURL = "https://randomuser.me/api/?nat=us";
    fetch(nameURL).then(function (response) {
        return response.json();})
        .then(function (data) {
            console.log((data.results[0].name.first) + " " + (data.results[0].name.last));
            
      }
        
)} 

// story themes list in array
// 


// external js: masonry.pkgd.js, imagesloaded.pkgd.js

// init Masonry after all images have loaded
var $grid = $('.grid').imagesLoaded( function() {
    $grid.masonry({
      itemSelector: '.grid-item',
      percentPosition: true,
      columnWidth: '.grid-sizer'
    }); 
  });
  
  var $grid = $('.grid').masonry({
    columnWidth: 160,
    itemSelector: '.grid-item'
  });
  
  $('.append-button').on( 'click', function() {
    var elems = [ getItemElement(), getItemElement(), getItemElement() ];
    // make jQuery object
    var $elems = $( elems );
    $grid.append( $elems ).masonry( 'appended', $elems );
  });
  
  // create <div class="grid-item"></div>
  function getItemElement() {
    var elem = document.createElement('div');
    var wRand = Math.random();
    var hRand = Math.random();
    var widthClass = wRand > 0.8 ? 'grid-item--width3' : wRand > 0.6 ? 'grid-item--width2' : '';
    var heightClass = hRand > 0.85 ? 'grid-item--height4' : hRand > 0.6 ? 'grid-item--height3' : hRand > 0.35 ? 'grid-item--height2' : '';
    elem.className = 'grid-item ' + widthClass + ' ' + heightClass;
    return elem;
  }

  function getRandomPicture(){
    /* var accessKey = "vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE" */
    var personPicURL = `https://api.unsplash.com/search/photos?&query=person&client_id=vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE`

    // need to add Math.random and return multiple objects
    fetch(personPicURL).then(function (response) {
        return response.json();})
        .then(function (data) {
            for (i=1; i<2; i++) {
            console.log(data.results[i])

            var personURL = data.results[i].urls.small;
            $("#picture").attr("src", personURL);

            var elem = document.createElement('div');
            var wRand = Math.random();
            var hRand = Math.random();
            var widthClass = wRand > 0.8 ? 'grid-item--width3' : wRand > 0.6 ? 'grid-item--width2' : '';
            var heightClass = hRand > 0.85 ? 'grid-item--height4' : hRand > 0.6 ? 'grid-item--height3' : hRand > 0.35 ? 'grid-item--height2' : '';
            elem.className = 'grid-item ' + widthClass + ' ' + heightClass;
            elem.innerHTML(<img src="data.results[i].urls.small"></img>)
            return elem;

            }
            
        }
        
)}
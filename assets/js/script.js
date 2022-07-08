/*  if #nameCheck is true, run getName and display to label #name
    if #portraitCheck is true, run getPersonPicture and change src of #portrait
    if #settingsCHeck is true, run getSettingPicture and display to grid layout
    if adjCheck is true, run getAdjs and display to #adj1, #adj2, #adj3
    if nounsCheck is true, run getNouns and display to #noun1, #noun2, #noun3
 */

$("#generate").on("click"), getNouns();

var nameCheck = $("#nameCheck").val();
var portraitCheck = $("#portraitCheck").val();
var settingsCheck = $("#settingsCheck").val();
var adjCheck = $("#adjCheck").val();
var portraitnounsCheck = $("#nounsCheck").val();
var searchBtn = $("#search-btn");
var saveBtn = $("save-btn");
var settingsLinks
var nouns 
var adjs  
var storyThemes = ["Good vs Evil", "Love", "Redemption", "Courage & Perseverance", "Coming of Age", "Revenge"]




// Unsplash API request
// person

function getPersonPicture (){
    preventDefault;
    /* var accessKey = "vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE" */
    var personPicURL = `https://api.unsplash.com/search/photos?&query=person&client_id=vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE`

    // need to add Math.random and return multiple objects
    fetch(personPicURL).then(function (response) {
        return response.json();})
        .then(function (portraitdata) {
            for (i=1; i<2; i++) {
            
            console.log(portraitdata.results[i])
            var personURL = portraitdata.results[i].urls.small;
            $("#picture").attr("src", personURL);
            var portraitLink = portraitdata.results[i].urls.small;
            console.log(portraitLink);
            }
            
        }
        
)}

//WordsAPI request
// noun

function getNouns() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5310a4a30cmsh92d3fc3f3671101p143a11jsn790aeb586352',
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    };
    
    fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true&limit=3&partOfSpeech=noun', options)
    .then(function (response) {
        return response.json();})
        .then(function (noundata) {
            console.log(noundata);
        })
}


// NameFake API request

function getName () {
    var nameURL = "https://randomuser.me/api/?nat=us";
    fetch(nameURL).then(function (response) {
        return response.json();})
        .then(function (namedata) {
            var name = (namedata.results[0].name.first) + " " + (namedata.results[0].name.last);
            console.log((namedata.results[0].name.first) + " " + (namedata.results[0].name.last));
            console.log(name);
            
      }
        
)} 

// story themes list in array
// 
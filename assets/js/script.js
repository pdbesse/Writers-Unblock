// Unsplash API request
// person

function getPersonPicture (){
    /* var accessKey = "vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE" */
    var searchURL = `https://api.unsplash.com/search/photos?&query=person&client_id=vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE`

    // need to add Math.random and return multiple objects
    fetch(searchURL).then(function (response) {
        return response.json();})
        .then(function (data) {
            for (i=1; i<2; i++) {
            console.log(data.results[i])

            var personURL = data.results[i].urls.small;
            $("#picture").attr("src", personURL);
            }
            
        }
        
)}

$("#generate").on("click"), getNoun();

//WordsAPI request
// noun

function getNoun () {
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5310a4a30cmsh92d3fc3f3671101p143a11jsn790aeb586352',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};

fetch('https://wordsapiv1.p.rapidapi.com/words/hatchback/partOfSpeech=noun', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));


}

// story themes list in array
// 
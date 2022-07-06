// Unsplash API request
// person

function getPersonPicture (){
    /* var accessKey = "vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE" */
    var searchURL = `https://api.unsplash.com/search/photos?&query=person&client_id=vNp_yDUN4379mM9W7GXhDe7zPCQf4EFeAtidDbMYbEE`

    fetch(searchURL).then(function (response) {
        return response.json();})
        .then(function (data) {
            for (i=1; i<2; i++) {
            console.log("test")
            console.log(data.results[i])

            var personURL = data.results[i].urls.small;
            $("#picture").attr("src", personURL);
            }
            
        }
        
)}

$("#generate").on("click", getPersonPicture);
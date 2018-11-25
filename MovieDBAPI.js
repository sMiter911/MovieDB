const app = document.getElementById('root');

// This section creates a <div> tag with class container. After that it is appended as a child to the root element
// Only visble in the INSEPECT elements tab in dev tool and not HTML source code 
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);


// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.themoviedb.org/3/discover/movie?api_key=d293246a7990bbd867c056eee017f47a&sort_by=popularity.desc', true);

request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        data.results.forEach(movie => {
            // Log each movie's title
            console.log(movie.title);
            console.log(movie.overview);

            // create a div with a card class
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            // Create an h1 and set the text content to the film's title
            const h1 = document.createElement('h1');
            h1.textContent = movie.title;

            // Create a p tag and set the text content to the films descrition/overview
            const p = document.createElement('p');
            movie.overview = movie.overview.substring(0,300); // Limit the chars to 300
            p.textContent = `${movie.overview}...`;

            const img = document.createElement('img');
            img.src = "https://image.tmdb.org/t/p/w200/" +movie.poster_path;

            // Append the card to the container
            container.appendChild(card);
            // Each card will contain an h1 an a p element
            card.appendChild(h1);
            card.appendChild(p);
            card.appendChild(img);

        });
    }else{
        console.log('Connection to MovieDB error')
        const erroMessage = document.createElement('marquee');
        erroMessage.textContent = `Ewu what's cutting now?!?`
        app.appendChild(erroMessage);
    }
}

// Send request
request.send();
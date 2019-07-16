const baseUrl = "https://db.ygoprodeck.com/api/v4/cardinfo.php?";
var searchItem = "";

function getJSON(url) {
    console.log(baseUrl+url);// prints full url
    return fetch(baseUrl+url) //return concat on the baseUrl...
        .then(function(response) {
            if(!response.ok) {
                throw Error(response.statusText);
            } else {
                //console.log(response);
                return response.json();
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

function searchCards(newUrl) {
    // The value in the search bar is updated now
    searchItem = document.getElementById("textEntry").value;
    console.log(searchItem);
    showCards(newUrl + searchItem);
}

//MODEL
function getCards(url) {
    console.log(url);
    return getJSON(url);
}

//VIEW
function renderCardList(cards,cardListElement) {
    const list = cardListElement.children[1];
    list.innerHTML = '';
    // Cards is the second
    // 
    cards.forEach(function(card) {
        // this also opens each item of the array in the array passed in
        //create elements for list <tr>
        //console.log(card.image_url);
        let listItem = document.createElement('tr');
        listItem.innerHTML = `
        <td><img src="${card.image_url_small}"><a href="${card.image_url}">${card.name}</a></td>
        <td>${card.type}</td>
        <td>${card.desc}</td>
        <td>${card.attribute}</td>
        <td>${card.race}</td>
        `;
        // listItem.addEventListener('click', function(event){
        //     event.preventDefault();
        //     getCardDetails(card.image_url);
        // });
        //add card to cards
        list.appendChild(listItem);
    });
}
function renderCardDetails(cardData) {
    console.log(cardData);
}

//clears data from the screen
// function clearData(url) {
//     showCards(0);
// }

function showCards(url) {
    console.log(url);
    getCards(url).then(function(data) { //getCards called here passing in url to be concatted to the end of BaseUrl
        console.log(data); //if getCards returns values log that data to the console
        let results = data;// data is the JSON string
      
        //get the list elements
        const cardListElement = document.getElementById('cardList');
      
        if (results == undefined)
        {
            results = [];
            document.querySelector(".hidden").style.display = "block";
        }
        else 
        {
            // We must search the index of each arrray location bc it is a 
            // 2 dimensional array. results is an array of data in an array.
            for (let i = 0; i < results.length; i++)
            {
                renderCardList(results[i], cardListElement);
            }
            //console.log(results.length);
            // The length will always be 0 unless all data from the API is pulled.
            // A new array is created per 9,999+ and 99+
            
            //enable next and previous buttons
            if (results.next) {
                const next = document.getElementById('next');
                next.ontouchend = () => {
                    showCards(results.next);
                    console.log("Going to the next!");
                };
            }
            if (results.previous) {
                const prev = document.getElementById('prev');
                prev.ontouchend = () => {
                    showCards(results.previous);
                    console.log("Going to the previous!");
                };
            }
        }
        
    });
}

function getCardDetails(url) {
    getCards(url).then(function(data) {
        renderCardDetails(data);
    });
}

//clearData();

document.getElementById("keywordSearch").addEventListener("click", () => {
    console.log("Search By Card Name");
    let search = "name=";
    searchCards(search);
});

document.getElementById("archetypeSearch").addEventListener("click", ()=> {
    console.log("Search By Archetype");
    let search = "archetype=";
    searchCards(search);
});

document.getElementById("typeSearch").addEventListener("click", ()=> {
    console.log("Search By Type");
    let search = "type=";
    searchCards(search);
});

document.getElementById("raceSearch").addEventListener("click", ()=> {
    console.log("Search By Race");
    let search = "race=";
    searchCards(search);
});




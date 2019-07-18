const baseUrl = "https://db.ygoprodeck.com/api/v4/cardinfo.php?";
var searchItem = "";
var search = "";
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
    if (newUrl == null)
    {
        newUrl="";
    }
    searchItem = document.getElementById("textEntry").value;
    console.log(searchItem);
    showCards(newUrl + searchItem);
}


function getCards(url) {
    console.log(url);
    return getJSON(url);
}


function renderCardList(cards,cardListElement,count) {
    const list = cardListElement;
    list.innerHTML = '';
    // Cards is the second
    // 
    
    cards.forEach(function(card) {
        // this also opens each item of the array in the array passed in
        //create elements for list <tr>
        //console.log(card.image_url);

        let listItem = document.createElement('h2');
        listItem.innerHTML = `
        <img id="cardimg" src="${card.image_url}"> <br/>
        <a href="${card.image_url}">${card.name}</a> 
        <p>Type: ${card.type}</p><br/>
        <div id="desc"><p >Card Description: ${card.desc}</p></div><br/>
        <p class="attrib">Attribute: ${card.attribute}</p><br/>
        <p>Race: ${card.race}</p>
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
        var paginated = results; 
        if (results == undefined)
        {
            results = [];
            document.querySelector(".hidden").style.display = "block";
        }
        else 
        {
            // We must search the index of each arrray location bc it is a 
            // 2 dimensional array. results is an array of data in an array.
            var count = 0;
            for (let i = 0; i < results.length; i++)
            {
                count++;
                renderCardList(results[i], cardListElement,count);
                // The length will always be 0 unless all data from the API is pulled.
                // A new array is created per 9,999+ and 99+
                
                //enable next and previous buttons
                if (results[i].next) {
                    const next = document.getElementById('next');
                    next.ontouchend = () => {
                        showCards(results.next);
                        console.log("Going to the next!");
                    };
                }
                if (results[i].previous) {
                    const prev = document.getElementById('prev');
                    prev.ontouchend = () => {
                        showCards(results.previous);
                        console.log("Going to the previous!");
                    };
                }
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

//document.getElementById("")

document.getElementById("prev").addEventListener("click", () => {
    //window.history.back();
    console.log("Fetch previous 10 cards");
});

document.getElementById("next").addEventListener("click", () => {
    //window.history.forward();
    console.log("Fetch next 10 cards");
});

// search called here
document.getElementById("search").addEventListener("click", () => {
    console.log(search);
    searchCards(search);
});
/******************************************************************* */
//Search type declarations are the 4 listed below. 
document.querySelector("#keywordSearch").style.color = "";

document.getElementById("keywordSearch").addEventListener("click", () => {
    console.log("Search By Card Name");
    search = "name=";
    //searchCards(search);
    //Trying to alternate the colors of selected search types
    // let style = document.querySelector("#keywordSearch").style;
    // if (style.color == "red")
    // {
    //     style.color = "darkgoldenrod";
    // }
    // else if (style.color === "darkgoldenrod")
    // {
    //     style.color = "red";
    // }
    
});

document.getElementById("archetypeSearch").addEventListener("click", ()=> {
    console.log("Search By Archetype");
    search = "archetype=";
   // searchCards(search);
});

document.getElementById("typeSearch").addEventListener("click", ()=> {
    console.log("Search By Type");
    search = "type=";
    //searchCards(search);
});

document.getElementById("raceSearch").addEventListener("click", ()=> {
    console.log("Search By Race");
    search = "race=";
    //searchCards(search);
});




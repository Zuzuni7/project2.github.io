const baseUrl = "https://db.ygoprodeck.com/api/v4/cardinfo.php?";
//const url = "https://db.ygoprodeck.com/api/v4/cardinfo.php";
var searchItem = "Blue-Eyes";
function getJSON(url) {
    console.log(baseUrl+url);
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

function searchCards() {
    //console.log("we in da serch kard funkshun cuh")
    searchItem = document.getElementById("search").value;
    console.log(searchItem);
    showCards("archetype=" + searchItem);
}

//MODEL
function getCards(url) {
    return getJSON(url);
}

//VIEW
function renderCardList(cards,cardListElement) {
    const list = cardListElement.children[1];
    list.innerHTML = '';
    // Cards is the second?
    // 
    cards.forEach(function(card) {
        // this also opens the each item of the array in the array passed in
        //create elements for list <tr>
        //console.log(card.image_url);
        let listItem = document.createElement('tr');
        listItem.innerHTML = `
        <td><img src="${card.image_url_small}">${card.name}</td>
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

function showCards(url) {
    console.log(url);
    getCards(url).then(function(data) { //getCards called here passing in url to be concatted to the end of BaseUrl
        console.log(data); //if getCards returns values log that data to the console
        const results = data;
      
        //get the list elements
        const cardListElement = document.getElementById('cardList');
        //We must search the index of each arrray location bc it is a 
        // 2 dimensional array. 
        for (let i = 0; i < results.length; i++)
        {
            renderCardList(results[i], cardListElement);
        }
        //console.log(results.length);
        // This will always be 0 unless all data from the API is pulled.
        // A new array is created per 9,999+ and 99+
        
        //enable next and previous buttons
        if (data.next) {
            const next = document.getElementById('next');
            next.ontouchend = () => {
                showCards(data.next);
                console.log("Going to the next!");
            };
        }
        if (data.previous) {
            const prev = document.getElementById('prev');
            prev.ontouchend = () => {
                showCards(data.previous);
                console.log("Going to the previous!");
            };
        }
    });
}

function getCardDetails(url) {
    getCards(url).then(function(data) {
        renderCardDetails(data);
    });
}
showCards('archetype=' + searchItem);//This is called first
// fetching equip spell cards = 'type=spell%20card&race=equip'
// 


let searchButton = document.querySelector("button");
searchButton.addEventListener("click", () => {
    //console.log("gettin reddy tuh serch da cards my guy")
    searchCards();
});
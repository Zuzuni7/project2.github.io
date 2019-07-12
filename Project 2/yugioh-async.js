//helper function to fetch the data from an external source and return it in JSON format
async function getJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        const fetchJson = await response.json();
        return fetchJson;
      }
    } catch (error) {
      console.log(error);
    }
  }
  // model code...it is a bit redundant in this case...we could just call getJSON directly...but if our model became more complex this sets us up to accomodate that.
  function getCards(url) {
    return getJSON(url);
  }
  //  View code
  function renderCardList(cards, cardListElement) {
    // I decided to use a table to display my list of cards. The cardList Element is that table and it has 2 children: thead and tbody...we need to put our cards into tbody...so I reference the second child.
    const list = cardListElement.children[1];
    list.innerHTML = '';
    //loop through the cards
    cards.forEach(function(card) {
      //console.log(card);
      //create elements for list...tr
      let listItem = document.createElement('tr');
      listItem.innerHTML = `
          <td><a href="${card.url}">${card.name}</a></td>
          <td>${card.length}</td>
          <td>${card.crew}</td>
          `;
  
      listItem.addEventListener('click', function(event) {
        //when clicked the default link behavior should be stopped, and the card details function should be called...passing the value of the href attribute in
        event.preventDefault();
        getCardDetails(card.url);
      });
  
      //add the list item to the list
      list.appendChild(listItem);
    });
  }
  // need to write the code to render the details to HTML
  function renderCardDetails(cardData) {
    console.log(cardData);
  }
  
  // controller code
  async function showCards(url = 'https://swapi.co/api/starcards/') {
    const results = await getCards(url);
  
    //get the list element
    const cardListElement = document.getElementById('cardList');
    renderCardList(results.results, cardListElement);
  
    // enable the next and prev buttons.
    if (results.next) {
      const next = document.getElementById('next');
      // normally we would prefer the addEventListener method of adding a listener. Using something like 'element.onEvent = event_function' has the limitation of only being able to hold one listener of the type. In this case that is a good thing however. Because we are not re-creating the buttons each time we load a new batch of data we could end up with several listeners attached to each button by the last page. We won't have that issue here.
      next.ontouchend = () => {
        // notice to show the next page we just re-call the showcards function with a new URL
        showCards(data.next);
      };
    }
    if (results.previous) {
      const prev = document.getElementById('prev');
      // we need to set the once option on the listener since the buttons do not get recreated with each page load. If we don't we will end up with several listeners all trying to fire at once after a few pages
      prev.ontouchend = () => {
        showCards(data.previous);
      };
    }
  }
  
  async function getCardDetails(url) {
    //call getJSON functions for the provided url
    const card = await getCards(url);
    renderCardDetails(card);
    //with the results populate the elements in the #detailsbox
  }
  showCards();
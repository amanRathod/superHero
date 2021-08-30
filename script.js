
var search_input = document.getElementById('search');
var container = document.getElementById('container');

const AddToFavourite = (id) => {

  let current = localStorage.getItem('id');
  current = current ? current.split(',') : [];
  
  // Added Id and data of the favourite SuperHero on localStorage
  // Added Id to ensure that no duplicate data is stored
  
    
    current.push(id);

    // fetch data from current sessionStorage
    const storedData = JSON.parse(window.sessionStorage.getItem('hero'));

    let data = [];

    // Get SuperHero data according to superHero-ID
    for(let i = 0; i < storedData.length; ++i) {
      if(storedData[i].id === id.toString()) {
        data = storedData[i];
        break;
      }
    }

    let Favdatas = JSON.parse(localStorage.getItem('favourite') || "[]");
    // add Favourite SuperHero data into favourite-list
    Favdatas.push((data))
    localStorage.setItem('favourite', JSON.stringify(Favdatas)); 

  // add Favourite SUperhero Id
  localStorage.setItem('id', current.toString());
    
}

// function to display searched SuperHero Data
const displayCards = (fetchData) => {

  container.innerHTML = '';
  sessionStorage.clear();
  sessionStorage.setItem('hero', JSON.stringify(fetchData));

  fetchData.forEach((item, idx) => {
      
    const content=  `
    <div class="card-container">
      <div class="card-inner">
        <img src="${item.image.url}"/>
        <div class="card-text">
          <h1>${item.name}</h1>
          <p>${item.connections.relatives}</p>
        </div>
        <input type="button" class="btn" value="View" onclick="window.location.href='./details.html?id=${item.id}'">
        <input type="button" class="btn" value="Add to Favourite" onclick="AddToFavourite(${item.id})"/>
        </div>
      </div>
    `;
    container.innerHTML += content;
   
  });
}

// fetch Data from API
let fetchData = [];
const getSearchData = (superHero) => {
  axios.get(`https://superheroapi.com/api.php/3028057257475815/search/${superHero}`)
  .then(res => {
    fetchData = res.data.results;
    // function to display the fetched data into different cards
    displayCards(fetchData);
  })
  .catch(error => {
    console.error(error);
  });
}

const debounce = (func, wait) => {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

let search_term = '';
search_input.addEventListener('input', e => {
  search_term = e.target.value;
  if(search_term.length > 1) {

    let word = search_term.split(' ');
    
    // Capitalise the first letter of each word
    for(let i = 0; i < word.length; i++) {
        word[i] = word[i][0].toUpperCase() + word[i].substr(1);
    }
    // debounce
    debounce(getSearchData(word.join(' ')), 300);
  }
})



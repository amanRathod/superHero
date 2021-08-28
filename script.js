
var search_input = document.getElementById('search');
var container = document.getElementById('container');

const displayCards = (fetchData) => {
  container.innerHTML = '';
  sessionStorage.clear();
  sessionStorage.setItem('hero', JSON.stringify(fetchData));
  fetchData.forEach((item, idx) => {
    
      console.log('calledd')
      // localStorage.setItem('hero', JSON.stringify(item));
    
    // console.log('cont', container);
    const content=  `
    <div class="card-container">
      <div class="card-inner">
        <img src="${item.image.url}"/>
        <div class="card-text">
          <h1>${item.name}</h1>
          <p>${item.connections.relatives}</p>
        </div>
        <input type="button" class="btn" value="View" onclick="window.location.href='./details.html?id=${item.id}'">
      </div>
      </div>
    `;
    container.innerHTML += content;
   
  });
}

let fetchData = [];
const getSearchData = (superHero) => {
  axios.get(`https://superheroapi.com/api.php/3028057257475815/search/${superHero}`)
  .then(res => {
    fetchData = res.data.results;
    console.log('fet', fetchData)
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
    for(let i = 0; i < word.length; i++) {
        word[i] = word[i][0].toUpperCase() + word[i].substr(1);
    }
    // getSearchData(word.join(' '));
    debounce(getSearchData(word.join(' ')), 250);
  }
})
var search_input = document.getElementById('search');
var container = document.getElementById('container');

const displayCards = (fetchData) => {
  container.innerHTML = '';
  fetchData.forEach((item, idx) => {
    console.log('item', item.name);
    console.log('cont', container);
    const content=  `
    <div class="card-container">
      <div class="card-inner">
        <img src="${item.image.url}"/>
        <div class="card-text">
          <h1>${item.name}</h1>
          <p>${item.connections.relatives}</p>
        </div>
        <button class="btn">View</button>
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

let search_term = '';
search_input.addEventListener('input', e => {
  search_term = e.target.value;
  getSearchData(search_term);
})

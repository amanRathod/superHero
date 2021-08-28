
let container = document.getElementById('detail-container');

//  Fetch searched data from session-storage
const storedData = JSON.parse(window.sessionStorage.getItem('hero'));

// get the data stored on id from  search query-string
const superHeroId = window.location.search.split('=')[1];

let data = [];

// get the SuperHero data which User selected
for(let i = 0; i < storedData.length; ++i) {
  if(storedData[i].id === superHeroId) {
    data = storedData[i];
    break;
  }
}

// Display the Data of the selected SuperHero
const displayContent = () => {
  container.innerHTML = '';
  const content = `
<div class="row-1">
  <div>
  <img src="${data.image.url}" /> 
  </div>
  <div class="profile-container">

    <div><h1>${data.name}</h1></div>

    <div>
      <h2>Biography</h2>
      <ul>
      <li><strong>Full name :</strong> ${data.biography['full-name']}</li>
      <li>Place of birth : ${data.biography['place-of-birth']}</li>
      <li>First appearance : ${data.biography['first-appearance']}</li>
      <li>Alignment : ${data.biography.alignment}</li>
      </ul>
    </div>

    <div>
      <h2>Appearance</h2>
      <ul>
        <li><strong>Gender :</strong> ${data.appearance.gender}</li>
        <li>Race: ${data.appearance.race}</li>
        <li>Height : ${data.appearance.height[0]}</li>
        <li>weight : ${data.appearance.weight[1]}</li>
        <li>eye-color : ${data.appearance['eye-color']}</li>
      </ul>
    </div>
    
  </div>
</div>

<div class="row-2">

  <div class="row-2-left">

    <div>
      <h2>PowerStats</h2>
      <ul>
        <li><strong>Intelligence :</strong> ${data.powerstats.intelligence}</li>
        <li>Strength : ${data.powerstats.strength}</li>
        <li>Speed : ${data.powerstats.speed}</li>
        <li>Durability : ${data.powerstats.durability}</li>
        <li>Power : ${data.powerstats.power}</li>
      </ul>
    </div>

   
    <div>
      <h2>Connections</h2>
      <ul>
        <li><strong>Group affiliation :</strong> ${data.connections['group-affiliation']}</li>
        <li>Relatives : ${data.connections.relatives}</li>
      </ul>            
    </div>

  </div>
    
  <div class="row-2-right">
    <div>
      <h2>Work</h2>
      <ul>
        <li><strong>Occupation :</strong> ${data.work.occupation}</li>
        <li>Base : ${data.work.base}</li>
      </ul>
    </div>
  </div>

  </div>
    `;

  container.innerHTML += content;
}

displayContent();
let app = document.getElementById('app');

// remove favourite SuperHero
const removeItem = (id) => {

  let SuperHeroData = sessionStorage.getItem('favourite') ? JSON.parse(sessionStorage.getItem('favourite')) : [];
 
  for (let i = 0; i < SuperHeroData.length; i++) {

      if (SuperHeroData[i].id === id.toString()) {
        // remove data of selected index from favourite-list
        SuperHeroData.splice(i, 1);
        i--;
      }
    }

  // again store the updated data excluding the selected SuperHero
  sessionStorage.setItem('favourite', JSON.stringify(SuperHeroData));
  
  // display Updated SuperHero Data
  FavouriteHero();
}

const FavouriteHero = () => {
  app.innerHTML='';
  // fetch data from favourite-list on sessionStorage
  let FavouriteSuperHero = JSON.parse(sessionStorage.getItem('favourite'));

  // array to ensure that the data is not repeated
  let vector = [];

  FavouriteSuperHero.forEach((item, idx) => {
    if(!vector.includes(item.id)){
      vector.push(item.id);
      const content = `
      <div class="app-content">
      <div>
    
        <img src="${item.image.url}"/>
      </div>
      <div>
        <h1>${item.name}</h1>
        <input type="button" class="btn" value="Remove From Favourite" onclick="removeItem(${item.id})"/>
      </div>
    </div>
      `
      app.innerHTML += content;
    }
  })
}

FavouriteHero();

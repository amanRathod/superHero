let app = document.getElementById('app');

// remove favourite SuperHero
const removeItem = (id) => {

  let SuperHeroData = localStorage.getItem('favourite') ? JSON.parse(localStorage.getItem('favourite')) : [];
  let index;
  for (let i = 0; i < SuperHeroData.length; i++) {

      if (SuperHeroData[i].id === id.toString()) {
        console.log(id)
        index=i;
        break;
      }
    }
  if(index === undefined) return;

  // remove data of selected index from favourite-list
  SuperHeroData.splice(index, 1);
  
  // again store the updated data excluding the selected SuperHero
  localStorage.setItem('favourite', JSON.stringify(SuperHeroData));
  
  // display Updated SuperHero Data
  FavouriteHero();
}

const FavouriteHero = () => {
  app.innerHTML='';
  // fetch data from favourite-list on localStorage
  let FavouriteSuperHero = JSON.parse(localStorage.getItem('favourite'));

  FavouriteSuperHero.forEach((item, idx) => {
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
  })
}

FavouriteHero();

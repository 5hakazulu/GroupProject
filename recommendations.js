let gameArray = [];
let searchGenres = [];
let recsArray = [];

const recommendations = document.getElementById('recommendations');

async function setGenres(name) {
    /*try {*/
        let urlEncodedName = encodeURIComponent(name);
        const response = await fetch(`https://api.rawg.io/api/games?key=af7e101e581141af807cdaa1c3b8d83e&search=${urlEncodedName}&dates=2009-02-18`);
        const retData = await response.json();
        let myGame;
        let gameGenres;
        gameArray = retData.results;
        for(let i=0; i < gameArray.length; i++) {
            if(gameArray[i].name === name) {
                myGame = gameArray[i];
                gameGenres = myGame.genres;
                if(!(searchGenres.length)){
                    for(let j = 0; j < gameGenres.length; j++) {
                        if(gameGenres[j].id !== 31) {
                            searchGenres.push(gameGenres[j].id);
                        }
                    }
                } else {
                    let matchingGenres = [];
                    for(let k=0; k < gameGenres.length; k++) {
                        if(searchGenres.includes(gameGenres[k].id)) {
                            matchingGenres.push(gameGenres[k].id);
                        }
                    }
                    searchGenres = [...matchingGenres];
                }
                break;
            }
        }    

    /*} catch (e) {
        console.log("There was a problem fetching artwork data");
    }*/
}

async function findRecs() {
    await setGenres(myData.name);
    await setGenres(myData2.name);
    let recsString = searchGenres.join(',');
    const response = await fetch(`https://api.rawg.io/api/games?key=af7e101e581141af807cdaa1c3b8d83e&tags=31&genres=${recsString}&stores=1&ordering=-released&page_size=40`);
    const retData = await response.json();
    recsArray = [...retData.results];
    renderRecs();
}

function renderRecs() {
    recommendations.innerHTML = '';
    recsHTML = '';
    let imageArray = [];
    
    for(let i = 0; i < recsArray.length; i++) {
        imageArray = recsArray[i].short_screenshots;
        recsHTML += `<div class="card mx-5 my-3" style="width: 18rem;">`;
        recsHTML += `<div id="carouselExampleCaptions${i}" class="carousel slide" data-bs-interval="false"><div class="carousel-indicators">`;
        recsHTML += `<button type="button" data-bs-target="#carouselExampleCaptions${i}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`;
        for(let j=1; j < imageArray.length; j++) {
            recsHTML += `<button type="button" data-bs-target="#carouselExampleCaptions${i}" data-bs-slide-to="${j}" aria-label="Slide ${j+1}"></button>`;
        }
        recsHTML += `</div>`;
        recsHTML += `<div class="carousel-inner"><div class="carousel-item active"><img src="${imageArray[0].image}" class="d-block w-100"></div>`;
        for(let k=1; k < imageArray.length; k++) {
            recsHTML += `<div class="carousel-item"><img src="${imageArray[k].image}" class="d-block w-100"></div>`;
        }
        recsHTML += `</div><button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions${i}" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions${i}" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button></div>`;
        recsHTML += `<div class="card-body"><div class="d-flex flex-column justify-content-between"><span>${recsArray[i].name}</span><span>release date: ${recsArray[i].released}</span></div></div></div>`;
    }
    recommendations.innerHTML += recsHTML;
}

findRecs();



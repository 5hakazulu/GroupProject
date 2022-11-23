
userIDArray = ['76561198030960486', '76561198040612780', '76561198059023681']
let allPlayerGames = [];
let allGameData = [];
let multiplayerGames =[];


//with the proxy (this has a limit so i had to download an extension to run tests)

// fetch(`https://cors-anywhere.herokuapp.com/https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=B27BC9225D5D6ED28D03A46F6BEE4904&steamid=${userID}&include_appinfo=true`)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         let numOfGames = data.response.game_count
//         console.log(numOfGames);
//         let gameIDArray = []
//         for (let i = 0; i < numOfGames; i++) {
//             gameIDArray.push[data.response.games.appid];
//         }
//         console.log(gameIDArray)
//     })

async function getAllPlayerGames() {

    for (let j = 0; j < userIDArray.length; j++) {
        //This one requires an extension to make it past the cors error(https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc) install this in chrome. I wil chang back to the other one when i am no longer testing
        await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=B27BC9225D5D6ED28D03A46F6BEE4904&steamid=${userIDArray[j]}&include_appinfo=true`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                let numOfGames = data.response.game_count
                // console.log(numOfGames);
                // let gameIDArray = []
                for (let i = 0; i < numOfGames; i++) {
                    let gameID = data.response.games[i].appid;
                    if (allPlayerGames.includes(gameID)) {
                        return
                    } else {
                        allPlayerGames.push(gameID);
                    }


                }

            })

    }

}

async function getGameInfo(games) {

    for (let k = 0; k < games.length; k++) {
        // console.log('hi');
        await fetch(`http://store.steampowered.com/api/appdetails?key=B27BC9225D5D6ED28D03A46F6BEE4904&appids=${games[k]}`)
            .then(res => res.json())
            .then(data => {
                let currentId = games[k];
                const map = new Map(Object.entries(data));
                allGameData.push(map.get(currentId.toString()).data);
                // console.log(allGameData[k].categories);
            })
    }

}

function populateMultiplayerGames(arrayOfMultiGames){
    let data1 = ""
    for(let i =0; i< arrayOfMultiGames.length; i++){
        data1+= `
        <div class="col-sm-3">
            <div class="card" style="width: 18rem;">
                <img src="${arrayOfMultiGames[i].header_image}" class="card-img-top" alt="${arrayOfMultiGames[i].name}">
                <div class="card-body">
                    <h5>${arrayOfMultiGames[i].name}</h5>
                    <p>${arrayOfMultiGames[i].short_description}</p>
                </div>
            </div>    
        </div>
        
        
        `

    }

  document.getElementById("cards").innerHTML = data1;
}

getAllPlayerGames()
    .then(() => {
        getGameInfo(allPlayerGames.splice(0,50))
        .then(()=>{
            let arraylength = allPlayerGames.length;
            // console.log(arraylength);
            console.log(allGameData);
            console.log(allGameData.length);
            for (let m = 0; m < allGameData.length; m++) {
                // console.log(allGameData[m].categories.length);
                for(let g = 0; g< allGameData[m].categories.length; g++){
                    // console.log(allGameData[m].categories[g].id);
                    if (allGameData[m].categories[g].description === "Multi-player"){
                      
                        multiplayerGames.push(allGameData[m]);
                    }
                }
            }
            console.log(multiplayerGames)
        })
        .then(()=>{
            populateMultiplayerGames(multiplayerGames);
        })
        // console.log(allPlayerGames);

    })





// getGameInfo();

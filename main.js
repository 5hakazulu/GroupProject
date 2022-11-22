userID = '76561198030960486';
userIDArray = ['76561198030960486', '76561198040612780', '76561198059023681']
let allPlayerGames = [];
let allGameData = [];


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

function getGameInfo(games) {

    for (let k = 0; k < 2; k++) {
        // console.log('hi');
        fetch(`http://store.steampowered.com/api/appdetails?key=B27BC9225D5D6ED28D03A46F6BEE4904&appids=${games[k]}`)
            .then(res => res.json())
            .then(data => {
                let currentId = games[k];
                console.log(currentId);
                console.log(data);
                allGameData.push(data);

                // if (games[k].data.categories.description === 'multiplayer') {
                //     console.log('hi');
                // }
                console.log(allGameData);
            })
    }
    for (let m = 0; m < allGameData.length; m++) {
        console.log(allGameData[m])
    }


}

getAllPlayerGames()
    .then(() => {
        getGameInfo(allPlayerGames)
        console.log(allPlayerGames);
        let arraylength = allPlayerGames.length;
        console.log(arraylength);

    })




// getGameInfo();

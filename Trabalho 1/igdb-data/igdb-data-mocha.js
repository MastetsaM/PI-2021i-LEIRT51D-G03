'use strict'

let popularGames = [{
        "id": 139446,
        "name": "Mortal Kombat 11: Ultimate",
        "total_rating": 100.0
    },
    {
        "id": 131887,
        "name": "Project +",
        "rating": 100.0,
        "total_rating": 100.0
    },
    {
        "id": 26974,
        "name": "Heartbound",
        "rating": 100.0,
        "total_rating": 100.0
    },
    {
        "id": 24250,
        "name": "SuperPower 2",
        "total_rating": 100.0
    },
    {
        "id": 23809,
        "name": "Motor City Online",
        "total_rating": 100.0
    },
    {
        "id": 23754,
        "name": "Tony Hawk's Pro Skater 4 Street",
        "total_rating": 100.0
    },
    {
        "id": 23746,
        "name": "EverQuest: Evolution",
        "total_rating": 100.0
    },
    {
        "id": 23743,
        "name": "Journey to Wild Divine",
        "total_rating": 100.0
    },
    {
        "id": 23230,
        "name": "Playworld Superheroes",
        "total_rating": 100.0
    },
    {
        "id": 23227,
        "name": "After Burner II 3D",
        "total_rating": 100.0
    },
    {
        "id": 22060,
        "name": "Grand Prix 4",
        "total_rating": 100.0
    },
    {
        "id": 21896,
        "name": "GTDUPEA V Remastered",
        "total_rating": 100.0
    },
    {
        "id": 21862,
        "name": "Saints Row IV: Super Dangerous Wad Wad Edition (aka the Million Dollar Pack)",
        "total_rating": 100.0
    },
    {
        "id": 21639,
        "name": "Challenge Me: Math Workout",
        "total_rating": 100.0
    },
    {
        "id": 20921,
        "name": "Interwebs Troll Simulator",
        "total_rating": 100.0
    },
    {
        "id": 20860,
        "name": "Destiny Legendary Edition",
        "total_rating": 100.0
    },
    {
        "id": 20479,
        "name": "Rocket Riot",
        "total_rating": 100.0
    },
    {
        "id": 13271,
        "name": "3D Starstrike",
        "total_rating": 100.0
    },
    {
        "id": 12479,
        "name": "Starquake",
        "total_rating": 100.0
    },
    {
        "id": 11013,
        "name": "Trainz Railroad Simulator 2004",
        "total_rating": 100.0
    },
    {
        "id": 10250,
        "name": "Droplitz",
        "total_rating": 100.0
    },
    {
        "id": 9186,
        "name": "Robotron X",
        "total_rating": 100.0
    },
    {
        "id": 9150,
        "name": "Punch-Out!!",
        "total_rating": 100.0
    },
    {
        "id": 5024,
        "name": "The Munchables",
        "total_rating": 100.0
    },
    {
        "id": 4933,
        "name": "Indianapolis 500 Legends",
        "total_rating": 100.0
    },
    {
        "id": 1458,
        "name": "Ōkamiden",
        "total_rating": 100.0
    },
    {
        "id": 804,
        "name": "NASCAR Racing 2003 Season",
        "total_rating": 100.0
    },
    {
        "id": 712,
        "name": "Microsoft Flight Simulator 2004: A Century of Flight",
        "total_rating": 100.0
    },
    {
        "id": 80468,
        "name": "NieR RepliCant",
        "rating": 99.9256391401233,
        "total_rating": 99.9256391401233
    },
    {
        "id": 74878,
        "name": "Hitman: Game of the Year Edition",
        "rating": 99.8757763975155,
        "total_rating": 99.8757763975155
    },
    {
        "id": 30155,
        "name": "Rocksmith 2014 Edition - Remastered",
        "rating": 99.79565619147641,
        "total_rating": 99.79565619147641
    },
    {
        "id": 77378,
        "name": "Super Mario All-Stars + Super Mario World",
        "rating": 99.7846919201089,
        "total_rating": 99.7846919201089
    },
    {
        "id": 45181,
        "name": "Mass Effect Trilogy",
        "rating": 99.6563732203569,
        "total_rating": 99.6563732203569
    },
    {
        "id": 18808,
        "name": "Bucky O'Hare",
        "rating": 99.6491859962542,
        "total_rating": 99.6491859962542
    },
    {
        "id": 25358,
        "name": "Deus Ex: Game of the Year Edition",
        "rating": 99.3143996253756,
        "total_rating": 99.3143996253756
    },
    {
        "id": 22439,
        "name": "The Witcher 3: Wild Hunt - Game of the Year Edition",
        "rating": 99.06084637631601,
        "total_rating": 99.06084637631601
    },
    {
        "id": 24493,
        "name": "Fate/Grand Order",
        "rating": 98.93282040002781,
        "total_rating": 98.93282040002781
    },
    {
        "id": 139858,
        "name": "Action Taimanin",
        "rating": 98.3939774153074,
        "total_rating": 98.3939774153074
    },
    {
        "id": 138851,
        "name": "Not In The Groove",
        "rating": 98.1395348837209,
        "total_rating": 98.1395348837209
    },
    {
        "id": 132234,
        "name": "All Over",
        "rating": 98.0,
        "total_rating": 98.0
    },
    {
        "id": 119445,
        "name": "Rolling Gunner",
        "rating": 98.0,
        "total_rating": 98.0
    },
    {
        "id": 21765,
        "name": "Dragon Age: Origins Collector's Edition",
        "total_rating": 98.0
    },
    {
        "id": 10496,
        "name": "Wizardry: Bane of the Cosmic Forge",
        "rating": 97.9359130660449,
        "total_rating": 97.9359130660449
    },
    {
        "id": 12329,
        "name": "Fate/hollow ataraxia",
        "rating": 97.83583992510961,
        "total_rating": 97.83583992510961
    },
    {
        "id": 140204,
        "name": "BroodStar",
        "rating": 97.71428571428571,
        "total_rating": 97.71428571428571
    },
    {
        "id": 11270,
        "name": "The Cat Lady",
        "rating": 97.5247841053026,
        "total_rating": 97.5247841053026
    },
    {
        "id": 24930,
        "name": "OFF",
        "rating": 97.42083000765341,
        "total_rating": 97.42083000765341
    },
    {
        "id": 49875,
        "name": "Tetris DX",
        "rating": 97.40409538124061,
        "total_rating": 97.40409538124061
    },
    {
        "id": 11374,
        "name": "Creatures",
        "rating": 97.19527386767331,
        "total_rating": 97.19527386767331
    },
    {
        "id": 11885,
        "name": "Action Fighter",
        "rating": 97.1588129374123,
        "total_rating": 97.1588129374123
    }
]

module.exports = {
    getPopularGames: (resFunc) => {
        resFunc(null, popularGames)
    },

    getGameByName: (myName, resFunc) => {
        const myGames = popularGames.filter(game => game.name === myName);
        resFunc(null, myGames[0])
    }
}
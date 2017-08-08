function RosterService(endpointUri, callback) {

    var playersData = [];

    function loadPlayersData() {

        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            return callback(playersData);
        }

        var url = "http://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        return $.getJSON(apiUrl).then(function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            // console.log(playersData)
            callback()
        });
    }
    loadPlayersData(); //call the function above every time we create a new service



    //    PUBLIC PARTS

    this.getPlayersByName = function (playerName) {
        //return an array of all players who match the given teamName.        
        //  console.log(playersData)
        var players = playersData.filter(function (player) {
            if (player.firstname.toLowerCase() == playerName) {
                // console.log(player)
                return true
            }
        });
        return players
    }
}
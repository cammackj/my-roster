function RosterService(endpointUri, callback) {

    // PRIVATE PARTS

    var playersData = [];
    var myRoster = [];

    function loadPlayersData() {

        var localData = localStorage.getItem('playersData');
        var myData = localStorage.getItem('myRoster')

        if (localData) {
            playersData = JSON.parse(localData);
            return callback(playersData, myRoster);
        }
        if (myData) {
            myRoster = JSON.parse(myData);
        }

        var url = "http://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        return $.getJSON(apiUrl).then(function (data) {
            playersData = data.body.players;
            localStorage.setItem('playersData', JSON.stringify(playersData));
            callback()
        });
    }
    loadPlayersData();

    function savePlayers() {
        localStorage.setItem('myRoster', JSON.stringify(myRoster))
    }

    //    PUBLIC PARTS

    this.getPlayersByName = function (playerName) {
        var players = playersData.filter(function (player) {
            if (player.firstname.toLowerCase() == playerName) {
                return true
            }
            if (player.lastname.toLowerCase() == playerName) {
                return true
            }
            if (player.fullname.toLowerCase() == playerName) {
                return true
            }
        });
        return players
    }

    this.getPlayersByTeam = function (playerTeam) {
        var team = playersData.filter(function (player) {
            if (player.pro_team.toLowerCase() == playerTeam) {
                return true;
            }
        });
        return team
    }

    this.getPlayersByPosition = function (playerPosition) {
        var position = playersData.filter(function (player) {
            if (player.position.toLowerCase() == playerPosition) {
                return true;
            }
        });
        console.log(position)
        return position

    }

    this.addPlayer = function (id, callback) {
        var player = playersData.find(char => char.id == id)

        if (myRoster.indexOf(player) == -1) {
            myRoster.push(player)
            savePlayers()
            callback(myRoster)
        }
    }

    this.removePlayer = function (id, callback) {
        var player = myRoster.find(char => char.id == id)
        var pos = myRoster.indexOf(player)
        if (pos != -1) {
            myRoster.splice(pos, 1)
        }
        savePlayers()
        callback(myRoster)
    }
}
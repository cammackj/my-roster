function RosterController() {
    // var rosterService = new RosterService()
    var loading = true; //Start the spinner
    var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var rosterService = new RosterService(apiUrl, ready);

    function ready() {
        loading = false; //stop the spinner

        //Now that all of our player data is back we can safely setup our bindings for the rest of the view.

        $('some-button').on('click', function () {
            var teamSF = rosterService.getPlayersByTeam("SF");
        });
    }

    function drawResults(players) {
        var template = ''
        var resultElem = document.getElementById('playerResults')
        console.log(players)
        for (i = 0; i < players.length; i++) {
            var player = players[i]
            template += `
            <p>Player Name:${player.firstname}</p>
            <img src="${player.photo}" alt="" class="src">
            `
        }
        resultElem.innerHTML = template
    }

    this.getPlayersByName = function (e) {
        e.preventDefault()
        var name = e.target.inputName.value.toLowerCase()
        var playerData = rosterService.getPlayersByName(name)
        drawResults(playerData)
    }
















}
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
        // console.log(players)
        for (i = 0; i < players.length; i++) {
            var player = players[i]
            template += `            
            <div class="col-lg-2">
                <div class="player-card">
                    <p>Player Name:${player.firstname}</p>
                    <img src="${player.photo}" alt="">
                    <button class="btn btn-default" onclick="app.controllers.rosterCtrl.addPlayer(${player.id})">Add To Team</button>
                 </div>
            </div>
            `
        }
        resultElem.innerHTML = template
    }

    function drawTeam(players) {
        var myTemplate = ''
        var myElem = document.getElementById('my-team')
        for (i = 0; i < players.length; i++) {
            var player = players[i]
            myTemplate += `
             <div class="col-lg-2">
                 <div class="player-card">
                     <img src="${player.photo}" alt="">
                     <button class="btn btn-default" onclick="app.controllers.rosterCtrl.removePlayer(${player.id})">Remove From Team</button>
                  </div>
             </div>
             `
        }
        myElem.innerHTML = myTemplate
    }

    this.getPlayersByName = function (e) {
        e.preventDefault()
        var form = event.target
        var name = e.target.inputName.value.toLowerCase()
        var playerData = rosterService.getPlayersByName(name)
        console.log(playerData)
        drawResults(playerData)
        form.reset()
    }

    this.getPlayersByTeam = function(e){
        var form = event.target
        e.preventDefault()
        var team = e.target.inputTeam.value.toLowerCase()
        var teamData = rosterService.getPlayersByTeam(team)
        console.log(teamData)
        drawResults(teamData)
        form.reset()
    }

    this.getPlayersByPosition = function(e){
        e.preventDefault()
        var form = event.target
        var position = e.target.inputPosition.value.toLowerCase()
        var positionData = rosterService.getPlayersByPosition(position)
        drawResults(positionData)
        form.reset()
    }

    this.addPlayer = function (id) {
        rosterService.addPlayer(id, drawTeam)
    }

    this.removePlayer = function (id) {
        rosterService.removePlayer(id, drawTeam)
    }




}
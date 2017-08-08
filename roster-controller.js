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
    
    this.getPlayersByName = function(e){
        e.preventDefault()
        console.log(e)
        var name = e.target.inputName.value.toLowerCase()
        rosterService.getPlayersByName(name)   
    }
















}
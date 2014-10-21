angular.module("workshop", [])

	.filter("foo", function() {
	
	})
	
	.controller("AppCtrl", function AppCtrl($http) {
		var app = this;
		app.url = "http://localhost:3000/game";
		
		$http.get(app.url)
			.then(function(response) {
				console.log(response);
				app.data = response.data;
			});
			
		app.setOrder = function(order) {
			if (app.order === order) {
				app.order = "-"+order;
			} else {
				app.order = order;
			}
		};
		
		app.selectGame = function(id) {
			
			console.log(id);
			
			$http.get(app.url + "/" + id)
				.then(function(result) {
					app.selectedGame = result.data;
				});
		};
		
		app.updateSelectedGame = function(game) {
			$http.put(app.url + "/" + app.selectedGame.gameId, game)
				.then(function(result) {
					app.selectGame(game.gameId);
				});
		};
		
		app.deleteSelectedGame = function(game) {
			$http.delete(app.url + "/" + app.selectedGame.gameId)
				.then(function(result) {
					app.getGames();
					app.selectedGame = null;
				});		
		};
		
		app.getGames = function() {
			$http.get(app.url)
				.then(function(response) {
					console.log(response);
					app.data = response.data;
				});
		};
		
		
		
	})
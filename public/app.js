angular.module('coderFriends', ['ui.router'])
.config(($urlRouterProvider, $stateProvider) => {
  $urlRouterProvider.otherwise('/')

  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: './templates/home.html'
  })
  .state('friend/:gitUsername', {
    url: '/friends',
    templateUrl: './templates/friend.html'
  })
})

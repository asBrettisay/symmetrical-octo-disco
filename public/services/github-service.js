angular.module('coderFriends')
.factory(($http) => {
  function getFollowing() {
    return $http({
      method: 'GET',
      url: '/api/github/following'
    })
    .then(res => {
      if (res.status === 200) return res.data;
      else console.log(res)
    })
    .catch(error => console.log(error));
  }
})

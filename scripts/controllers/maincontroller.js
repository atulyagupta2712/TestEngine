app.controller("mainctrl",($scope,$location, $filter)=>{
    $scope.menus = [];
    $scope.message = "";
    $scope.username = "";
    console.log("hey")
    $scope.isLoggedIn = false;
    if(localStorage.username){
        
    }
    $scope.$on("loadroutes",(event, data)=>{

        if(data && localStorage.username){
            $scope.menus = data;
            $scope.isLoggedIn = true;
            $scope.message = "Welcome "+localStorage.username;
            $location.path('/');
        }
      

    });
    $scope.logout =()=>{
        alert("You are logged out!");
        $scope.isLoggedIn = false;
        $scope.menus = [];
        localStorage.clear();
        $location.path("/");
    }
})

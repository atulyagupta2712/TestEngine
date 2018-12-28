app.controller("userctrl", ($scope, $firebaseArray, $firebaseObject, roleservice)=>{
    $scope.user ={};
    $scope.message = "";
    var userRef = firebase.database().ref("/users");
    var groupRef = firebase.database().ref("/group");
    var group = $firebaseArray(groupRef);
   var users = $firebaseArray(userRef);
 
    $scope.register =()=>{
        var isNewUser = true;
        if($scope.user.username && $scope.user.password && $scope.user.role){
            var userObj = userRef.orderByChild("username").equalTo($scope.user.username);
            var obj = $firebaseObject(userObj);
            console.log(obj);
            obj.$loaded().then(data=>{
                console.log(data);
                for(let key in data){
                    console.log(key);
                    if(typeof(key)==='string' && key.startsWith("-L")){
                        isNewUser = false;
                        console.log("jey");
                        $scope.message = "This username is already taken.";
                        break;
                    }
                   
                }
                
            if(isNewUser){
                if($scope.user.password.length < 6){
                    $scope.message = "Length of password should be greater than 6";
                 
                }
                else{
                    users.$add({
                        username: $scope.user.username,
                        password: $scope.user.password,
                        role: $scope.user.role
                    }).then(ref=>{
                        alert("You are registered successfully now you may login.");
                    }, err=>{
                        console.log("error is ",err);
                       
                    })
                }
            }

               
            }, err=>{
           console.log(err);
            })

           
          
        }
        else{
            alert("Please fill in all the fields");
        }

        window.setTimeout(function(){
            $scope.$apply(function(){
                $scope.message = "";
            })
        }, 3500);
     
    }
    $scope.login =()=>{
        // $scope.user = {};
        // $scope.message = "";
        $scope.isLoggedIn = false;
        if($scope.user.username && $scope.user.password){
            var userObject = userRef.orderByChild("username").equalTo($scope.user.username);
      
           
                var object = $firebaseObject(userObject);
           
                    object.$loaded().then(data=>{
                        var obj = {};
                        for(let key in data){
                            if(typeof(key)==='string' && key.startsWith("-L")){
                                console.log("hey");
                                obj = data[key];
                                if(obj.password == $scope.user.password){
                                    
                                    var currentRole = roleservice[obj.role];
                                    localStorage.username = $scope.user.username;
                                    $scope.isLoggedIn = true;
                                    $scope.$emit("loadroutes", currentRole);
                                }
                               
                            }
                            else{
                                $scope.message = "Invalid username or password!";
                            }
                        }
                       
                    })
                }
       else{
           alert("Please fill in all the fields");
       }
        window.setTimeout(function(){
            $scope.$apply(function(){
                $scope.message = "";
            })
        }, 3500)

    }
    $scope.getUsers = ()=>{
        var studentUsers = [];
        for(let user in users){
            var userObject = users[user];
            if(userObject.role && userObject.role == 'S'){
                userObject.isSelected = false;
                studentUsers.push(userObject)
            }
        }
        $scope.students = studentUsers;
    }
//    $scope.getUsers();
    $scope.addGroup = ()=>{
        if($scope.students  && $scope.groupname){
            for(let student of  $scope.students){
           
                if(student.isSelected){
                  group.$add({
                      groupname: $scope.groupname,
                      username: student.username
                  }).then(ref=>{
                       $scope.msg = "Group Added";
                      
                  }, error=>{
                      alert("Cannot add group due to some error");
                  })
                }
            }
        }
        else{
            alert("Please fill in all the fields");
        }
                window.setTimeout(function(){
            $scope.$apply(function(){
                $scope.msg = "";
            })
        }, 3500)
      
    }
})

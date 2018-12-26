app.controller("usergroupctrl",($scope, $firebaseArray, groupservice)=>{
    var testGroupRef = firebase.database().ref("/testgroupassign");
    var testGroupObject = $firebaseArray(testGroupRef);
    $scope.add = ()=>{
        if($scope.group && $scope.test){
            testGroupObject.$add({
                group: $scope.group,
                test: $scope.test
            }).then(ref=>{
                $scope.message = "Test Assigned Successfully";
            }, error=>{
                $scope.message=" Test not assigned due to error ";
            }
            )
        }
        else{
            alert("Pleae fill in all the details");
        }
       
    }
    $scope.distinctTest = [];
    $scope.distinctGroup = [];
    var currentTest = "";
    var currentGroup = "";
    var tests = groupservice.getTest();
    var groups = groupservice.getGroup();
    tests.$loaded(data=>{
       for(let key in data){
           currentTest = data[key].testname;
           console.log(currentTest);
           if(currentTest){
               if($scope.distinctTest.filter(test=> test==currentTest).length == 0){
                $scope.distinctTest.push(currentTest);
               }
           }
       }
    })
    groups.$loaded(data=>{
        for(let key in data){
            currentGroup = data[key].groupname;
            console.log(currentGroup);
            if(currentGroup){
                if($scope.distinctGroup.filter(group=> group == currentGroup).length == 0){
                    $scope.distinctGroup.push(currentGroup);
                }
            }
        }
    })
})
app.controller("quesctrl",($scope, $firebaseArray)=>{
    $scope.message = "";
    $scope.question = {};
    var quesref = firebase.database().ref("/questions");
    $scope.questions = $firebaseArray(quesref);
    $scope.add = () =>{
        if( $scope.question.optiona &&  $scope.question.optionb &&  $scope.question.optionc &&  $scope.question.optiond &&  $scope.question.name &&  $scope.question.score &&  $scope.question.rightans ){
            if( $scope.question.rightans>0 &&  $scope.question.rightans<5){
                $scope.questions.$add($scope.question).then(ref=>{
                    $scope.message = "Question Added";
                    $scope.question.optiona = "";
                    $scope.question.optionb = "";
                    $scope.question.optionc = "";
                    $scope.question.optiond = "";
                    $scope.question.name = "";
                    $scope.question.score = "";
                    $scope.question.rightans = "";
        
                },
                err=>{
                    $scope.message = "Cannot add a question due to error";
                })
                }
                else{
                    alert("Please enter the correct range of correct answer");
                }
            }
            else{
                alert("Please fill in all the fields");
            }
        }
      
 
})
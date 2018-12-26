app.controller("studentctrl",($scope, $firebaseArray)=>{
    $scope.subjects = true;
    var assignref = firebase.database().ref("/testgroupassign");
    var assign = $firebaseArray(assignref);
    var groupRef = firebase.database().ref("/group");
    var groups = $firebaseArray(groupRef);
    var quesRef= firebase.database().ref("/questions");
    var questions = $firebaseArray(quesRef);
    var currentSubject = [];
    var questionsArray = [];
    var index = 0;
    var score;
    var pseudoanswer = 0;
    var answersarray = [];
    // $scope.totalscore;
    $scope.answers = [];
    groups.$loaded(data=>{
        for(let key in data){
            if(data[key].username && data[key].username == localStorage.username){
              assignSubject(data[key].groupname);
            }
        }
    })

    assignSubject = (groupname)=>{
        assign.$loaded(data =>{
            for(let key in data){
                if(groupname == data[key].group){
                 if(currentSubject.filter(subject=> subject == data[key].test).length == 0){
                     currentSubject.push(data[key].test);
                 }
                }
            }
        })
        $scope.distinctsubject = currentSubject;
    }
 
    $scope.submit = ()=>{
        score = 0;
        $scope.totalscore = 0;
        if($scope.studenttest){
            $scope.subjects = false;
          questions.$loaded(data=>{
              for(let key in data){
                  if(data[key].testname == $scope.studenttest){
                      questionsArray.push(data[key]);
                      $scope.question = data[key];
                  }
              }
              $scope.question = questionsArray[index];
             
          })
         
     
        }
    }
    $scope.nextQuestion =(option)=>{
        // score = 0;
        if(index < questionsArray.length){
            if($scope.options && questionsArray[index].rightans == $scope.options){
                console.log(questionsArray[index].score);
                score += questionsArray[index].score;
            }
            index++;
            $scope.question = questionsArray[index];
         
        }
        if(index == questionsArray.length){
            $scope.finish();
        }
    }
    $scope.finish = ()=>{
        $scope.question = false;
       
        $scope.result = true
       $scope.correctscore = score;

        for(i=0; i<questionsArray.length; i++){
            $scope.totalscore += questionsArray[i].score;
            pseudoanswer = parseInt(questionsArray[i].rightans);
           if(pseudoanswer == 1){
            answersarray.push(questionsArray[i].optiona);
           }
          else if(pseudoanswer == 2){
              answersarray.push(questionsArray[i].optionb);
          }
          else if(pseudoanswer == 3){
              answersarray.push(questionsArray[i].optionc);
          }
          else{
              answersarray.push(questionsArray[i].optiond);
          }
         
        }
        console.log($scope.correctscore);
        $scope.percentage = parseFloat(parseInt($scope.correctscore)/parseInt($scope.totalscore)).toFixed(2)+" %";
    }
    $scope.rightanswers = ()=>{
        $scope.result = false;
        $scope.answershow= true;
        $scope.answers = answersarray;
    }
   $scope.newTest = () =>{
       $scope.answershow = false;
       $scope.result = false;
       $scope.subjects = true;
   }
})
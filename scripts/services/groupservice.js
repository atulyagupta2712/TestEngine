app.factory("groupservice", ($firebaseArray)=>{
    var userGroupReference = firebase.database().ref("/group");
    var quesReference = firebase.database().ref("/questions");
    const object = {
        getTest(){
            return $firebaseArray(quesReference);
        },
        getGroup(){
            return $firebaseArray(userGroupReference);
        }
    }
    return object;
})
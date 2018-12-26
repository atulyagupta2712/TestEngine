app.config(($locationProvider, $routeProvider, HOME, LOGIN, REGISTER, CONTACTUS, SLIDER, ADDQUESTION, ADDGROUP, ASSIGNTEST, TAKETEST)=>{
$locationProvider.hashPrefix("");
$routeProvider.when(HOME, ({
    templateUrl: 'views/home.html'
})).when(LOGIN, ({
    templateUrl: 'views/login.html'
})).when(REGISTER, ({
    templateUrl: 'views/register.html'
})).when(CONTACTUS, ({
    templateUrl: 'views/contactus.html'
})).when(SLIDER, ({
    templateUrl: 'views/ui/slider.html'
})).when(ADDQUESTION, ({
    templateUrl: 'views/addques.html'
})).when(ADDGROUP, ({
    templateUrl: 'views/addgroup.html'
})).when(ASSIGNTEST, ({
    templateUrl: 'views/assigntest.html'
})).when(TAKETEST, ({
    templateUrl: 'views/taketest.html'
}))
})
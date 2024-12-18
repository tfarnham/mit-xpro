// Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    //add your firebaseConfig here
    const firebaseConfig = {
        apiKey: "AIzaSyCT8Lw0_zOYQaaMUwUNB8OEXVX1Ta74Nb4",
        authDomain: "courso-6cbce.firebaseapp.com",
        databaseURL: "https://courso-6cbce-default-rtdb.firebaseio.com",
        projectId: "courso-6cbce",
        storageBucket: "courso-6cbce.appspot.com",
        messagingSenderId: "652981200904",
        appId: "1:652981200904:web:3ec4b6610e5847621d89bd"
      };
    // Initialize Firebase

    (async () => {
        try {
            firebase.initializeApp(firebaseConfig);
            //if user is logged in, it persists through refreshes, this eliminates that issue
            await firebase.auth().signOut();
            const createUserResult = await firebase
                .auth()
                .createUserWithEmailAndPassword("example@mit.edu", "secret")
                console.log('createUserResult', createUserResult)
            firebase.auth().signOut();
        } catch(e) {
            console.log(e);
        }
    })();

    // get elements
    const email    = document.getElementById('email');
    const password = document.getElementById('password');
    const login    = document.getElementById('login');
    const logout   = document.getElementById('logout');
    const loginMsg = document.getElementById('loginMsg');
    const routeMsg = document.getElementById('routeMsg');

    // login & create token with signInWithEmailAndPassword
    login.addEventListener('click', e => {
        const auth  = firebase.auth();      
        const promise = auth.signInWithEmailAndPassword(email.value, password.value);
        promise.catch(e => console.log(e.message));
    });

    // logout
    logout.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    // login state
    firebase.auth().onAuthStateChanged(firebaseUser => {
        console.log("user", firebaseUser)
        if(firebaseUser){
         
            logout.style.display = 'inline';
            login.style.display  = 'none';
            loginMsg.innerHTML   = 'Authentication Success!';
        }
        else{
            console.log('User is not logged in');
            logout.style.display = 'none';          
            login.style.display  = 'inline';
            loginMsg.innerHTML   = 'Not Authenticated!';
        }
    });

    function callOpenRoute(){
        (async () => {
            let response = await fetch('/open');
            let text     = await response.text();
            console.log('response.text:', response);
            routeMsg.innerHTML = text;
        })();
    }

    function callAuthRoute(){
        // call server with token
    if (firebase.auth().currentUser) {
        firebase.auth().currentUser.getIdToken()
        .then(idToken => {
            console.log('idToken:', idToken);
            //async "iffe" function -> auto-executes
            (async () => {
                let response = await fetch('/auth', {
                    method: 'GET',
                    headers: {
                        'Authorization': idToken
                    }
                });
                let text = await response.text();
                console.log('response:', response);
                routeMsg.innerHTML = text;
            })();

        }).catch(e => console.log('e:', e));
    } else {
        console.warn('There is currently no logged in user. Unable to call Auth Route.');
    }
}
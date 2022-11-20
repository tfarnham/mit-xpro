(function() {

    const firebaseConfig = {
        apiKey: "AIzaSyCT8Lw0_zOYQaaMUwUNB8OEXVX1Ta74Nb4",
        authDomain: "courso-6cbce.firebaseapp.com",
        projectId: "courso-6cbce",
        storageBucket: "courso-6cbce.appspot.com",
        messagingSenderId: "652981200904",
        appId: "1:652981200904:web:3ec4b6610e5847621d89bd"
      };

      //Initialize
      firebase.initializeApp(firebaseConfig);

      // Handle on firebase db
      const db = firebase.database();

      // get elements
      const message = document.getElementById('message');
      const write = document.getElementById('write');
      const read = document.getElementById('read');
      const status = document.getElementById('status');

      // write
      write.addEventListener('click', e => {
        const messages = db.ref('messages');

        const id = (new Date).getTime();

        messages.child(id).set({'message': message.value})
        .then(function(){
            status.innerHTML = "Wrote to DB";
        })
      });

      // read
      read.addEventListener('click', e=> {
        status.innerHTML = "";
        const messages = db.ref('messages');

        messages.once('value')
        .then(function(dataSnapshot) {
            var data = dataSnapshot.val();
            var keys = Object.keys(data);

            keys.forEach(function(key){
                console.log(data[key]);
                status.innerHTML += JSON.stringify(data[key]) + '<br>';
            });
        });
      });


}());

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

      // Create a root reference
      var storage = firebase.storage();
      var storageRef = storage.ref();

      // get UI elements
      const file = document.getElementById('file');
      const upload = document.getElementById('upload');
      const download = document.getElementById('download');
      const status = document.getElementById('status');
      const image = document.getElementById('image');

      // upload file
      upload.addEventListener('click', e => {
        // create a file reference
        var ref = storageRef.child('globe');
        let photo = document.getElementById('file').files[0];

        // upload
        ref.put(photo).then(function(snapshot) {
            console.log("Uploaded a file or blob");
            status.innerHTML = "uploaded a file or blob"; 
        });
    });
        // download
        download.addEventListener('click', e => {
            // file reference
            var ref = storage.ref('globe');

            ref.getDownloadURL().then(function(url) {
                // insert url into an img tag to download
                image.src = url;
                status.innerHTML = "Downloaded a file or blob";


            }).catch(function(error){console.log(error)});
        });

      

}());

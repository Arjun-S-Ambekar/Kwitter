// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCXYUovwRLYaPwaPgC_Mp9cPwtMKVrFj00",
    authDomain: "kwitter-27441.firebaseapp.com",
    databaseURL: "https://kwitter-27441-default-rtdb.firebaseio.com",
    projectId: "kwitter-27441",
    storageBucket: "kwitter-27441.appspot.com",
    messagingSenderId: "1085102096841",
    appId: "1:1085102096841:web:73e92eebf1291b7069a818"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
  var welcome = localStorage.getItem("user_name");
  document.getElementById("user_name").innerHTML = "Welcome " + welcome + "!";

 function add_room(){
     room_name = document.getElementById("room_name").value;
     firebase.database().ref("/").child(room_name).update({
             purpose : "adding room name"
         });
     localStorage.setItem("room_name", room_name);
     window.location = "kwitter_page.html";
 }

 function get_data(){
     firebase.database().ref("/").on('value', function(snapshot){document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot){childKey= childSnapshot.key;
         room_names = childKey;
         console.log("room_name" + room_names);
         row = "<div class = 'room_name' id = "+ room_names +" onclick = 'redirect_to_room_name(this.id)'>"+ room_names + "</div> <hr>";
        document.getElementById("output").innerHTML+= row;
        });
    });
        
 }
 get_data();

 function redirect_to_room_name(name){
     console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
 }

 function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
 }

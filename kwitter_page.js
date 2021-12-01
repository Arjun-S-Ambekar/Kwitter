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

  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");

  function send(){
      text = document.getElementById("output").value;
      firebase.database().ref(room_name).push({
        name: user_name, 
        message: text,
        like: 0
      });
      document.getElementById("output").value = "";
  }
  function getData() {
     firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("empty_div").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
      message_id = childKey;
    message_data = childData; 
    //Start code 
     // console.log(message_id);
      console.log(message_data);
      name = message_data['name'];
      like = message_data['like'];
      message=message_data['message'];
      name_with_tag = "<h4>" + name + "<img class= 'user_tick' src= 'tick.png'></h4> ";
      messege_with_tag = "<h4 class='messege_h4'>" + message + "</h4>";
      like_button = "<button class='btn btn-info' id=" + message_id + "value=" +like+ "onclick='update_like(this.id)'";
      span_with_tag = "<span class= 'glyphicon glyphicon-thumbs-up'>Likes: "+ like +"</span></button><hr>";

      row = name_with_tag +  messege_with_tag + like_button + span_with_tag;
      document.getElementById("empty_div").innerHTML += row;
    //End code
   } }); }); }
   getData();
   function update_like(message_id){
      //console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
      });
   }
   function logout(){
     localStorage.removeItem("user_name");
     localStorage.removeItem("room_name");
     window.location.replace("index.html")
   }
   room = localStorage.getItem("room_name");
   document.getElementById("room").innerHTML = "Room name: " + room;
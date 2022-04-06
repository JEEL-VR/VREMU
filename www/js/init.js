(function($){
  $(function(){

    //$('.parallax').parallax();
    $('select').formSelect();
    

  }); // end of document ready
})(jQuery); // end of jQuery name space
document.addEventListener('deviceready', onDeviceReady, false);
function otherAPIDetector(){
  switch($("#selectAPI option:selected").val()){
    case "1":
        $("#customAPI").css("visibility","hidden");
        break;
    case "2":
      $("#customAPI").css("visibility","visible");
      break;
}
}
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
 
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    $("#selectAPI").change(otherAPIDetector);
    //LoginButton onclick function
    $("#loginButton").click(function(){
      let pinInput = $("#pin").val();
      //We identify the API to be used
      let usedAPI;
      switch($("#selectAPI option:selected").val()){
          case "1":
              usedAPI="https://classvr-room-api.herokuapp.com";
              break;
          case "2":
              usedAPI=$("#urlAPI").val();
              break;
      }
      let isValid= false;
      //Pin check with API
      $.ajax({
        method: "GET",
        url: usedAPI+"/api/start_vr_exercise",
        data: {pin:pinInput},
        dataType: "json",
      }).done(function (data) {
        console.log(data);
        //We check if the token is valid 
        if(data=="incorrect pin"){
          alert("Error: Introduce un PIN correcto");
        }
        else{
          //Setting localStorage with the id and pin
          localStorage.setItem("api",usedAPI);
          localStorage.setItem("pin",pinInput);
          localStorage.setItem("exerciseID",data["VRexerciseID"]);
          location.href = './app.html';
          
        }
      }).fail(function () {
        console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
        alert("ERROR: Los datos son incorrectos")
      });
      
      //Page reload prevention
      return false;
      });
}

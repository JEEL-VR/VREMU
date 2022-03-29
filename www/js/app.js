$( document ).ready(function() {
    $("#sendButton").click(function(){
      //Getting info
      let pinInput= String(localStorage.getItem("pin"));
      let vrexerciseid= parseInt(localStorage.getItem("exerciseID"));
      let passedInput = parseInt($("#passed_items").val());
      let failedInput = parseInt($("#failed_items").val());
      let scoreInput = parseInt($("#score").val());
      //Check if all fields are completed
      if(passedInput>0&&failedInput>0&&scoreInput>0){
        //Ajax call with POST method
        $.ajax({
          url: "https://classvr-room-api.herokuapp.com/api/finish_vr_exercise",
          type: "POST",
          dataType: "json",
          contentType: "application/json",
          data: JSON.stringify({"pin": pinInput,
                                "record": {"passed_items": passedInput,
                                            "failed_items": failedInput, 
                                            "grade":scoreInput},
                                            "VRexerciseID": vrexerciseid}),
        }).done(function (data) {
          //Info alert
          $('#titleModal').text("Informació");
          $('#descModal').text("S'han enviat les dades correctament");
          $('#modal1').modal();
          $('#modal1').modal('open');
        }).fail(function () {
          console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
          //Fail alert
          $('#titleModal').text("Error");
          $('#descModal').text("No s'han pogut enviar les dades.");
          $('#modal1').modal();
          $('#modal1').modal('open');
        });
      }else{
        //Fail alert
        $('#titleModal').text("Error");
        $('#descModal').text("Has d'omplir tots els camps.");
        $('#modal1').modal();
        $('#modal1').modal('open');
      }
      
      return false;
    });
});
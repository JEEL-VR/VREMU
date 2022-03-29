$( document ).ready(function() {
    //$("#pinText").text(localStorage.getItem("pin"));
    //$("#tIDText").text(localStorage.getItem("exerciseID"));
    $("#sendButton").click(function(){
        let pinInput=localStorage.getItem("pin");
        let vrexerciseid=localStorage.getItem("exerciseID");
        let passedInput = $("#passed_items").val();
        let failedInput = $("#failed_items").val();
        let scoreInput = $("#score").val();
          $.ajax({
            method: "POST",
            url: "https://classvr-room-api.herokuapp.com/api/finish_vr_exercise",
            data: {"pin": 7906,
            "record": {"passed_items":4, 
                       "failed_items":3, 
                       "grade":80},
            "VRexerciseID": 22},
            dataType: "json"
          }).done(function (data) {
            alert("Se ha enviado correctamente");
          }).fail(function () {
            console.log("ERROR: La peticion AJAX no ha salido como se esperaba");
            alert("ERROR: No se ha podido enviar")
            alert(localStorage.getItem("pin"));
            alert(localStorage.getItem("exerciseID"));
            alert(passedInput+" "+failedInput+" "+scoreInput);
          });
        return false;
    });
});
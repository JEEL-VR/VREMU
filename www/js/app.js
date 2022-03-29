$( document ).ready(function() {
    //$("#pinText").text(localStorage.getItem("pin"));
    //$("#tIDText").text(localStorage.getItem("exerciseID"));
    $("#sendButton").click(function(){
        let pinInput= String(localStorage.getItem("pin"));
        let vrexerciseid= parseInt(localStorage.getItem("exerciseID"));
        let passedInput = parseInt($("#passed_items").val());
        let failedInput = parseInt($("#failed_items").val());
        let scoreInput = parseInt($("#score").val());
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
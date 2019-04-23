// document.querySelector("#addNote").addEventListener("mouseup", function(event){
// 	event.preventDefault();
// 	var thisId = $(this).attr("data-id");
// 	console.log(thisId);
//     console.log("Note Button");
// var text = document.getElementById("noteText").value;
//     console.log("Value" , text);
//     $.ajax({ method: "POST", url: "/saveNote/" + thisId, data: { body: text }
//     }).then(function(data){ 
//         location.reload();
//     });
// });

$("#addNote").on("click", function(e) {
	e.preventDefault();
	var thisId = $(this).attr("data-id");
	console.log(thisId);
    console.log("Note Button");
var text = document.getElementById("noteText").value;
    console.log("Value" , text);
    $.ajax({ method: "POST", url: "/saveNote/" + thisId, data: { body: text }
    }).then(function(data){ 
        location.reload();
    });
  });


$(document).ready(function () {
  // Handler for .ready() called.
  console.log("Initializing Events");
  initEvents();
});
function onChange(obj){
  var id= $(obj).attr("id");
  switch(id){
     case "0":
      window.location.href = "http://localhost:5500/index.html";
     break;

     case "1":
      window.location.href = "http://localhost:5500/admin.html";
     break;

  }
}
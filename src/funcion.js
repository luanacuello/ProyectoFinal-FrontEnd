
// let a;



function ShowHide(){
//     if (a == false){
//         document.getElementsByClassName("pencil").style.display = "inline";
//         return a = true;
//     } else {
//         document.getElementsByClassName("pencil").style.display = "none";
//         return a = false;
//     }
     var x = document.getElementsByClassName("btns");

     for (var i = 0; i < x.length; i++) {
        if (window.getComputedStyle(x[i]).display == "none") {
            x[i].style.display = "inline";
        } else { 
            x[i].style.display = "none";
        }
    }
    return;
}
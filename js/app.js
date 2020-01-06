//js


//SIDE NAV BAR//////////////////////////////////
let navWidth = $(".navMenu").outerWidth(true);
$("#options-container").css("left", `-${navWidth}px`);

$("#toggleNav").click(function () {
    $(".fa-align-justify").toggleClass("fa-times");

    if ($("#options-container").css("left") == "0px") {
        $("#options-container").animate({ left: `-${navWidth}px` }, 500);
        $(".navMenu li").animate({ opacity: "0", marginTop: "500px" });
    }
    else {
        $("#options-container").animate({ left: `0px` }, 500);
        $(".navMenu .li1").animate({ opacity: "1", marginTop: "8px" }, 1200);
        $(".navMenu .li2").animate({ opacity: "1", marginTop: "8px" }, 1300);
        $(".navMenu .li3").animate({ opacity: "1", marginTop: "8px" }, 1400);
        $(".navMenu .li4").animate({ opacity: "1", marginTop: "8px" }, 1500);
        $(".navMenu .li5").animate({ opacity: "1", marginTop: "8px" }, 1600);
        $(".navMenu .li6").animate({ opacity: "1", marginTop: "8px" }, 1700);
    }
})
//END SIDE NAV BAR///////////////////////////////////////////////

//VALIDATE DATA ////////////////////////////////////////////////
function validateName(inputValue) {
    var nameRegex = /^[a-z][a-z ]{1,20}$/i;
    if (nameRegex.test(inputValue) == false) {
        $("#nameAlert").css("display", "block");
    }
    else {
        $("#nameAlert").css("display", "none");
    }
}

function validateEmail(inputValue) {
    var emailRegex = /^([a-zA-Z][a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (emailRegex.test(inputValue) == false) {
        $("#emailAlert").css("display", "block");
    }
    else {
        $("#emailAlert").css("display", "none");
    }
}

function validatePhone(inputValue) {
    var phoneRegex = /^(\+02)?(01)[0125][0-9]{8}$/;
    if (phoneRegex.test(inputValue) == false) {
        $("#phoneAlert").css("display", "block");
    }
    else {
        $("#phoneAlert").css("display", "none");
    }
}

function validateAge(inputValue) {
    var ageRegex = /([1-9][0-9]{1,2})$/;
    if (ageRegex.test(inputValue) == false) {
        $("#ageAlert").css("display", "block");
    }
    else {
        $("#ageAlert").css("display", "none");
    }
}

function validatePw(inputValue) {
    var pwRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    if (pwRegex.test(inputValue) == false) {
        $("#pwAlert").css("display", "block");
    }
    else {
        $("#pwAlert").css("display", "none");
    }
}

function validateRePw(inputValue) {
    let pw = $("#pwInp").val();
    let rePw = $("#rePwInp").val();
    if (pw != rePw) {
        $("#rePwAlert").css("display", "block");
        return false;
    }
    else {
        $("#rePwAlert").css("display", "none");
        return true;
    }
}

$("#nameAlert").css("marginTop", `-15px`);
$("#emailAlert").css("marginTop", `-15px`);
$("#phoneAlert").css("marginTop", `-15px`);
$("#ageAlert").css("marginTop", `-15px`);
$("#pwAlert").css("marginTop", `-15px`);
$("#rePwAlert").css("marginTop", `-15px`);

//END VALIDATION////////////////////////////////

// VALIDATE FORM ///////////////////////
function submit() {

    var userName = document.getElementById("nameInp").value;
    var email = document.getElementById("emailInp").value;
    var phone = document.getElementById("phoneInp").value;
    var age = document.getElementById("ageInp").value;
    var pw = document.getElementById("pwInp").value;
    var rePw = document.getElementById("rePwInp").value;

    if (validateName(userName) == true || validateEmail(email) == true || validatePhone(phone) == true || validateAge(age) == true || validatePw(pw) == true || validateRePw(rePw) == true) {

    }
    else {
        //window.alert("Not Valid Input")
    }
}

function clearForm() {
    let ips = $("input");
    for (let i = 0; i < ips.length; i++) {
        ips[i].value = "";
    }
}

// END VALIDATE FORM ///////////////////////

//GET MOVIES DATA/////////////////
var allData = [];
var httpReq = new XMLHttpRequest();
let pathMovie = "now_playing";
$(".navList .liEle").click(function () {
    pathMovie = $(this).attr('id');
    getData(pathMovie);
})

getData(pathMovie);

var links = document.querySelectorAll(".nav-link");

function getData(pathMovie) {
    // httpReq.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR1Es0Xl_Rp_okaNkNthYUTcOl0gaUmS6B60sbvHb1_zk-ps3j5p85aWKaY")

    httpReq.open("GET", "https://api.themoviedb.org/3/movie/" + pathMovie + "?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR1Es0Xl_Rp_okaNkNthYUTcOl0gaUmS6B60sbvHb1_zk-ps3j5p85aWKaY")
    httpReq.send();
    httpReq.onreadystatechange = function () {
        if (httpReq.readyState == 4 && httpReq.status == 200) {

            allData = JSON.parse(httpReq.response).results;
            displayData();
        }
    }

}
function displayData() {
    var temp = ``;

    for (var i = 0; i < allData.length; i++) {
        temp += `
        <div class="col-md-6 col-lg-4 my-3">
          <div class="movieShow ">
            <div class="onMovie">
                <img src="https://image.tmdb.org/t/p/w500`+ allData[i].poster_path + `" class="img-fluid"/>
                <div class="movieLayer d-flex align-items-center">
                    <div class="movieInfo">
                        <h5>`+ allData[i].original_title + `</h5>
                        <p>`+ allData[i].overview + `</p>
                        <p> Rate: `+ allData[i].vote_average + `</p>
                    </div>
                </div>
             </div>
          </div>
        </div>`;
    }

    document.getElementById("moviesRow").innerHTML = temp;
}
//END GET MOVIES DATA/////////////////


//SEARCH MOVIE////////////////////////////
function searchMovie(term) {
    var temp = ``;
    for (var i = 0; i < allData.length; i++) {
        if (allData[i].original_title.toLowerCase().includes(term.toLowerCase())) {
            temp += `
        <div class="col-md-6 col-lg-4 my-3">
          <div class="movieShow ">
            <div class="onMovie">
                <img src="https://image.tmdb.org/t/p/w500`+ allData[i].poster_path + `" class="img-fluid"/>
                <div class="movieLayer d-flex align-items-center">
                    <div class="movieInfo">
                        <h5>`+ allData[i].original_title + `</h5>
                        <p>`+ allData[i].overview + `</p>
                        <p> Rate: `+ allData[i].vote_average + `</p>
                    </div>
                </div>
             </div>
          </div>
        </div>`;
        }
    }
    document.getElementById("moviesRow").innerHTML = temp;
}

//END SEARCH MOVIE ////////////////////

//LOADING SCREEN///////////////////
$(window).on("load", function () {
    $("#loading").fadeOut(1000, function () {
        $("body").css("overflow", "auto");
        clearForm();
    })
})
//END LOADING SCREEN///////////////////

//BUTTON UP//////////////////////////////////////////////
let searchBarOffset = $("#searchMovieID").offset().top;

$(window).scroll(function () {

    let winScroll = $(window).scrollTop();

    if (winScroll > searchBarOffset) {

        $("#btnUp").fadeIn(500);
    }
    else {
        $("#btnUp").fadeOut(500);
    }
})
$("#btnUp").click(function () {

    $("html, body").animate({ scrollTop: '0' }, 1000);
})
//END BUTTON UP//////////////////////////////////////////////
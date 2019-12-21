//js


$(".drawerMenu").click(function () {
    $(".navMenu").toggleClass("closeNav")
    $(".drawer").toggleClass("openNav")
})
//VALIDATE DATA /////////////////////////////
function validateName(inputValue) {
    var nameRegex = /^[a-zA-Z][a-zA-z0-9-,._ ]{2,20}$/;
    if (nameRegex.test(inputValue) == false) {
        return false;
    }
    else {
        return true;
    }
}

function validateEmail(inputValue) {
    var categoryRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (categoryRegex.test(inputValue) == false) {
        return false;
    }
    else {
        return true;
    }
}

function validatePhone(inputValue) {
    var priceRegex = /^(01)[0125][0-9]{8}$/;
    if (priceRegex.test(inputValue) == false) {
        return false;
    }
    else {
        return true;
    }
}

function validateAge(inputValue) {
    var descRegex = /^$/;
    if (descRegex.test(inputValue) == false) {
        return false;
    }
    else {
        return true;
    }
}

function validatePw(inputValue) {
    var descRegex = /^$/;
    if (descRegex.test(inputValue) == false) {
        return false;
    }
    else {
        return true;
    }
}
//END VALIDATION////////////////////////////////




//GET MOVIES DATA/////////////////
var allData = [];
var httpReq = new XMLHttpRequest();
var category = "general";
getData(category);

var links = document.querySelectorAll(".nav-link");

for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
        category = e.target.text;
        getData(category);

    })
}

function getData(category) {
    //https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR1Es0Xl_Rp_okaNkNthYUTcOl0gaUmS6B60sbvHb1_zk-ps3j5p85aWKaY
    //httpReq.open("GET", "https://newsapi.org/v2/top-headlines?country=us&category=" + category + "&apiKey=31cf74b9d55a4b6780e02b8c74a4cf61")
    httpReq.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR1Es0Xl_Rp_okaNkNthYUTcOl0gaUmS6B60sbvHb1_zk-ps3j5p85aWKaY")
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
        <div class="col-md-4 my-3">
          <div class="movieShow ">
            <div class="onMovie">
                <img src="https://image.tmdb.org/t/p/w500`+ allData[i].poster_path + `" class="img-fluid rounded"/>
                <div class="movieLayer d-flex align-items-center">
                    <div class="movieInfo">
                        <h5>`+ allData[i].original_title + `</h5>
                        <p>`+ allData[i].overview + `</p>
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
        <div class="col-md-4 my-3">
          <div class="movieShow ">
            <div class="onMovie">
                <img src="https://image.tmdb.org/t/p/w500`+ allData[i].poster_path + `" class="img-fluid rounded"/>
                <div class="movieLayer d-flex align-items-center">
                    <div class="movieInfo">
                        <h5>`+ allData[i].original_title + `</h5>
                        <p>`+ allData[i].overview + `</p>
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

// VALIDATE FORM ///////////////////////
function submit() {

    var userName = document.getElementById("nameInp").value;
   

    if (validateName(userName) == true ) {
        
        // akml b2et l validation 
    }
    else {
        window.alert("Not Valid Input")
    }

}

// END VALIDATE FORM ///////////////////////

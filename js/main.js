document.addEventListener("DOMContentLoaded", init);

let url = "http://davidst.edumedia.ca/mad9014/formdata.php";
let digits = 0;
let max = 0;
//let url = "";
let pages = [];

function init() {
    document.getElementById("btnSend").addEventListener("click", serverData.init);


    pages = document.querySelectorAll(".page")


    document.getElementById("btnBack").addEventListener("click", function () {
        pages[0].classList.add("active");
        pages[1].classList.remove("active");
        document.getElementById("digits").value = null;
        document.getElementById("max").value = null;
    });
}


/*function gen() {
    //    console.log(url);
    //    console.log(max.value);
    //    console.log(digits.value);

    digits = document.getElementById("digits");
    max = document.getElementById("max");
//let url = "https://davidst.edumedia.ca/mad9014/nums.php?digits=" + digits.value + "&max=" + max.value;

    console.log(url);

    serverData.init();
}*/


//-*  SERVER DATA - GENERIC *-/
let serverData = {
    url: url,
    httpRequest: "POST",
    init: function () {
        let formData = new FormData();


        pages[1].classList.add("active");
        pages[0].classList.remove("active");



        digits = document.getElementById("digits").value;
        max = document.getElementById("max").value;  


        url = "https://davidst.edumedia.ca/mad9014/nums.php?digits=" + digits.value + "&max=" + max.value;


        formData.append("digits", digits);
        formData.append("max", max);


        console.log(url);

        let customSettings = new Request(url, {
            mode: "cors",
            method: "POST",
            body: formData
        });


        // let request = new Request(url, customSettings);

        //FETCH
        fetch(customSettings)
            .then((response) => { //Convert the data from json
                return response.json();
            })
            .then((jsonData) => { //Use the data
                if (jsonData.code == 0) {
                    jsonData.numbers.forEach(function (num) {
                        let e = document.createElement("li");
                        e.className = "box";
                        e.textContent = num;
                        document.querySelector(".num_list").appendChild(e);
                    })
                } else {
                    alert("Error: " + jsonData.code + " - " + jsonData.message);
                }
            })

            .catch((error) => { //treatment for errors
                alert(error);
            })
    }
}

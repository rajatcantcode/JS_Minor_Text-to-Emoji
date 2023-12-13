var encrypt = document.querySelector("#button-1");
var decrypt = document.querySelector("#button-2");

var sec1enc = document.querySelector("#section1");
var sec2enc = document.querySelector("#section2");
var sec3enc = document.querySelector("#section3");

var sec1dec = document.querySelector("#section1-decry");
var sec2dec = document.querySelector("#section2-decry");
var sec3dec = document.querySelector("#section3-decry");

var btnenc = document.querySelector("#button-encrypt");
var btndec = document.querySelector("#button-decrypt");

var arrow = document.querySelector("#main img");

var result = document.querySelector("#result");
//-------SWITCH BETWEEN BUTTON ENCRYPTION AND DECRYPTION-------
function switchbtn() {
  encrypt.addEventListener("click", function () {
    sec1enc.style.display = "block";
    sec2enc.style.display = "block";
    sec3enc.style.display = "block";
    arrow.style.rotate = "0deg";
    encrypt.style.backgroundColor = "#514C4C";
    decrypt.style.backgroundColor = "#1D1B1B";

    sec1dec.style.display = "none";
    sec2dec.style.display = "none";
    sec3dec.style.display = "none";

    result.style.display = "none";
  });

  decrypt.addEventListener("click", function () {
    sec1enc.style.display = "none";
    sec2enc.style.display = "none";
    sec3enc.style.display = "none";
    arrow.style.rotate = "180deg";
    encrypt.style.backgroundColor = "#1D1B1B";
    decrypt.style.backgroundColor = "#514C4C";

    sec1dec.style.display = "block";
    sec2dec.style.display = "block";
    sec3dec.style.display = "block";

    result.style.display = "none";
  });
}
switchbtn();

//-------SHOW RESULT WHEN ENCR BUTTON IS PRESSED-------
function clicken() {
  btnenc.addEventListener("click", function () {
    result.style.display = "block";
  });
}
clicken();

//-------SHOW RESULT WHEN DECR BUTTON IS PRESSED-------
function clickdec() {
  btndec.addEventListener("click", function () {
    result.style.display = "block";
  });
}
clickdec();

var input = document.querySelector("#textmsg");
var password = document.querySelector("#password");

var clutter = "";
//-----ACTUAL ENCRYPTION OF TEXT AND DISPLAYING IT ON RESULT AND STORING IT IN LOCAL STORAGE------
function encryption() {
  btnenc.addEventListener("click", function () {
    // console.log(input.value);
    // console.log(password.value);

    const str = input.value.split("");
    str.forEach((element) => {
      // all emoji have common ascii code starting code &#128XXX
      clutter += `&#128${element.charCodeAt()} `; //<-- not to give space after every element
    });
    // Now we will change this code into emojis and display
    result.innerHTML = clutter;

    // var dataarr = [];
    // array of objects
    // dataarr = [{ "pass": password, "input": input, "clutter": clutter }];

    // //store this data in local storage
    // // localStorage.setItem("yourKey", "yourValue");
    // localStorage.setItem("data1",JSON.stringify(dataarr));
    // // now this way we stored our data in the local storage

    // BUT WE ARE GOING TO CREATE A LOGIC FOR TO ADD CONSISTENTLY just do some changes for upper code
    // Initialize dataarr as an empty array
    input = input.value;
    password = password.value;

    // Create an empty array named dataarr
    var dataarr = [];

    // Check if there is already data stored in the "data1" key in local storage
    if (JSON.parse(localStorage.getItem("data1"))) {
      // If data exists, retrieve and parse it into the dataarr array
      dataarr = JSON.parse(localStorage.getItem("data1"));
      console.log(dataarr);
      // Log the existing dataarr to the console
      // Push a new object with password, input, and clutter properties into dataarr
      dataarr.push({ password: password, input: input, clutter: clutter });
    } else {
      // If no data exists, initialize dataarr with a new array containing a single object
      dataarr = [{ password: password, input: input, clutter: clutter }];
    }

    // Convert the updated dataarr to a JSON string and store it in the "data1" key in local storage
    localStorage.setItem(`data1`, JSON.stringify(dataarr));
  });
}
encryption();

var input2 = document.querySelector("#emojimsg");
var passwordcheck = document.querySelector("#finalpassword");

var clutter2 = "";
//-----EXTRACTING DATA FROM LOCAL STORAGE AND DECRYPTION AND DISPLAYING IT ON RESULT------
function decryption() {
  btndec.addEventListener("click", function () {
    var user = JSON.parse(localStorage.getItem("data1"));
    input2 = input2.value;
    passwordcheck = passwordcheck.value;
    var str2 = input2.split(" ");
    str2.forEach((element) => {
      clutter2 += `&#${element.codePointAt(0)} `;
      // console.log((element.charCodeAt()) * Math.floor(Math.random() * 10))
    });

    var found;
    // This will run the run for a particular user 
    for(let i of user){
        if(i.clutter == clutter2){
            found = i;
            console.log(i)
        }
    }

    if (found.clutter === clutter2) {
        console.log("SUCCESSFUL")
        result.style.display = `block`
        result.style.color = `#eee`

        result.innerHTML = found.input
        
    } else {
        result.style.display = `block`
        result.style.color = `red`
        result.innerHTML = "Wrong password!"
    }

  });
}
decryption();

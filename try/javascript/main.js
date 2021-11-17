// image

/*
let myImage = document.querySelector('img');

myImage.onclick = function(){

    let mySrc = myImage.getAttribute('src');

    if(mySrc == 'images/undraw_Developer_activity_re_39tg.svg'){
        myImage.setAttribute('src','images/undraw_programming_2svr.svg');
    }
    else{
        myImage.setAttribute('src','images/undraw_Developer_activity_re_39tg.svg');
    }
}

*/




// button 

/*
let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');

function setUserName(){
    let myName = prompt('Please enter your name. ');
    localStorage.setItem('name', myName);
    myHeading.textContent = 'mozila is cool, ' + myName;
}

if(!localStorage.getItem('name')){
    setUserName();
}
else{
    let storedName = localStorage.getItem('name');
    myHeading.textContent = 'mozila is cool, ' + storedName; 
}

myButton.onclick = function(){
    setUserName();
}

*/

let name = "mayur";

let fullname = `my name is ${name}`;

console.log(fullname);

var buttons = document.querySelectorAll(".dropdown-content"); 
var savebtns = document.querySelectorAll(".saveButtonDiv");  

var niche;
var hashtag;

var input = document.getElementById("searchInput"); 
var searchBtn = document.getElementById("searchBtn"); 

//this gets the value of search input, AKA the keyword 
searchBtn.addEventListener("click", function(event) {
    event.stopPropagation(); 
    event.preventDefault(); 
    console.log(input.value);  
}); 

//this grabs the hashtag that the user wants to save 
var getHashtag = (event) => {
    hashtag = event.target.dataset.hashtag;
    console.log("This is the hashtag: " + event.target.dataset.hashtag);
}; 

//this grabs the niche that the user choices to save to 
var chooseNiche = (event) => {
  event.stopPropagation(); 
  niche = event.target.textContent;
  console.log("This is the niche name: " + niche + "\nThis is the hashtag: " + hashtag);
}; 

buttons.forEach(function(button) {
  button.addEventListener("click", chooseNiche);
}); 

savebtns.forEach(function(button) {
button.addEventListener("click", getHashtag);
}); 
  

//This changes the colors of the backgrounds of each of the buttons
window.onload = () => {
  var colors = ['#B4A725', '#F6A421', '#FC4F50']; 

var randomColor = () => {
  return colors[Math.floor(Math.random()* colors.length)];
}; 

var elements = document.getElementsByClassName("niche_btn"); 

for (var i=0; i<elements.length; i++) {
  elements[i].style.backgroundColor = randomColor(); 
}; 

}; 
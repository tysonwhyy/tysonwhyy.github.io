// variables
const addBtn1 = document.getElementById("add-btn-1");
const confirmBtn1 = document.getElementById("confirm-btn-1");
const input1 = document.getElementById("input1");

const addBtn2 = document.getElementById("add-btn-2");
const confirmBtn2 = document.getElementById("confirm-btn-2");
const input2 = document.getElementById("input2");

const addBtn3 = document.getElementById("add-btn-3");
const confirmBtn3 = document.getElementById("confirm-btn-3");
const input3 = document.getElementById("input3");

// code to perform when the page is reloaded
if (localStorage.getItem("counter-1") && localStorage.getItem("counter-1") != 0) { // if counter 1 isn't null and isn't equal to 0, render the storage
	renderStorage(1);
}
else {
	localStorage.setItem("counter-1", 0); // else set the counter to 0
}

if (localStorage.getItem("counter-2") && localStorage.getItem("counter-2") != 0) { 
	renderStorage(2);
}
else {
	localStorage.setItem("counter-2", 0);
}

if (localStorage.getItem("counter-3") && localStorage.getItem("counter-3") != 0) { 
	renderStorage(3);
}
else {
	localStorage.setItem("counter-3", 0);
}

if (document.getElementById("table1").rows.length == 0) { // on refresh, if there is nothing in the table, set its counter
	localStorage.setItem("counter-1", 0);
}

if (document.getElementById("table2").rows.length == 0) {
	localStorage.setItem("counter-2", 0);
}

if (document.getElementById("table3").rows.length == 0) {
	localStorage.setItem("counter-3", 0);
}

// colors
let color;

if (localStorage.getItem("color")) { // if something exists for color in local storage
	color = localStorage.getItem("color"); // set variable color to whatever is stored in local storage

	if (color == "green") { // loads the default style sheet if color is set to green
	document.getElementById("pagestyle").setAttribute("href", "main.css"); 
	}
	else if (color == "pink") {
		document.getElementById("pagestyle").setAttribute("href", "style1.css");
	}
}
else { // if there is no color already present, keep the default style sheet and set the color to green
	localStorage.setItem("color", "green");
		color = localStorage.getItem("color"); // needs to be after the initialization of color
}

document.getElementById("title").ondblclick = function() {
	if (color == "pink") { // if current color is pink, switch to green
		localStorage.setItem("color", "green"); // sets the new color in local storage
		color = localStorage.getItem("color"); // reassigns the color variable to whatever is stored in local storage
		document.getElementById("pagestyle").setAttribute("href", "main.css");
	}
	else if (color == "green") { // if current color is green, switch to pink
		localStorage.setItem("color", "pink");
		color = localStorage.getItem("color");
		document.getElementById("pagestyle").setAttribute("href", "style1.css");
	}
}

// buttons
addBtn1.onclick = function() {

	showConfirmButton(1); // shows confirm button

	confirmBtn1.onclick = function() { // appends the input and makes the add button reappear
		if (input1.value) { // checks if there is a valid input
			addInput(1);
		}
		showAddButton(1);
	}
}

addBtn2.onclick = function() { 
	showConfirmButton(2);

	confirmBtn2.onclick = function() {
		if (input2.value) {
			addInput(2);
		}
		showAddButton(2);
	}
}

addBtn3.onclick = function() { 
	showConfirmButton(3);

	confirmBtn3.onclick = function() {
		if (input3.value) {
			addInput(3);
		}
		showAddButton(3);
	}
}

// event listeners for deleting td elements
document.ondblclick = function() {
	if (event.target.getAttribute("class") == "td1") { // checks to see if the targeted element is of the correct td class
		event.target.style.display = "none"; // makes targeted element disappear
		localStorage.removeItem(event.target.getAttribute("id"));
	}
	else if (event.target.getAttribute("class") == "td2") {
		event.target.style.display = "none";
		localStorage.removeItem(event.target.getAttribute("id"));
	} 
	else if (event.target.getAttribute("class") == "td3") {
		event.target.style.display = "none";
		localStorage.removeItem(event.target.getAttribute("id"));
	}
}

// functions
function addInput(idNum, counter) { // adds the input to 
	if (document.getElementById("input" + idNum).value) { // truthy statement; checks for user input

		localStorage.setItem("td" + idNum + "-" + localStorage.getItem("counter-" + idNum), document.getElementById("input" + idNum).value); // appends the input value to local storage

		localStorage.setItem("counter-" + idNum, parseInt(localStorage.getItem("counter-" + idNum)) + 1); // increments the counter

		document.getElementById("table" + idNum).innerHTML = ""; // clears table before reloading the local storage into the table

		renderStorage(idNum);
	}
}

function renderStorage(idNum) { // sets the innerHTML of the table to whatever is stored in local storage
	for (let i = 0; i < localStorage.getItem("counter-" + idNum); i++) { // loops for however many elements are in "td" + idNum
		if (localStorage.getItem("td" + idNum + "-" + i)) { // if the value exists (isn't deleted), append the value to the table
			document.getElementById("table" + idNum).innerHTML += `
				<td id="td${idNum}-${i}" class="td${idNum}">${localStorage.getItem("td" + idNum + "-" + i)}</td>
			`;
		}
	}
}

function showConfirmButton(idNum) {
	document.getElementById("confirm-btn-" + idNum).style.display = "inline";
	document.getElementById("input" + idNum).style.display = "inline";
	document.getElementById("add-btn-" + idNum).style.display = "none"
	document.getElementById("input" + idNum).focus(); // sets the cursor on the input box
}

function showAddButton(idNum) {
		document.getElementById("confirm-btn-" + idNum).style.display = "none";
		document.getElementById("input" + idNum).style.display = "none";
		document.getElementById("add-btn-" + idNum).style.display = "inline";
		document.getElementById("input" + idNum).value = ""; // clears the input field
}
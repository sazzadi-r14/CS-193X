# Lecture 4

DOM and Events

``` jsx
document.body
let b = document.body;

b.children
>> [h1, p]

b.children.legth
>> 2

b.children[0]
<h1>"Dom Events"</h1>

temp1

temp1.parentElement;
temp1.nextElementSibling;

temp1.textContent:
>> "Dom Events"

temp2
>> <a href="something">link</a>

// Adding a new element
el = document.createElement('p');
el.textContent = "new paragraph";
document.body.appendChild(el);

// Removing an element
el.remove();


// Add an event listener
<p id='clickme'>Click me!</p>

p = document.getElementById('clickme');
//or
p = document.body.children.clickme;

const handleClick = () =>{
    alert('clicked');
}
p.addEventListener('click', handleClick);

// Create a button

let nclicks = 0;
<form id='clickcount'>
  <button id='clickme'>Click me!</button>
</form>

const matin = () => {
    let form = document.forms.clickcount;
    
    let button = form.clickme;
    const handleClick = () => {
        nClicks++;
        button.textContent = `Clicked ${nClicks} times`;
        };
    button.addEventListener('click', handleClick);
}
;
main();

// The deafault behavior of a button is to submit the form, and refresh the page after sending the form data to the server. To prevent this, we can use the 

preventDefault() 

// method of the event object.

//We can also use this so that it works like a normal button



//On to the next part


let nclicks = 0;
<form id='clickcount'>
  <button type='button' id='clickme'>Click me!</button>
  <button type='button' id='clickme'>UnClick me!</button>
</form>

const matin = () => {
    let form = document.forms.clickcount;
    
    let clickme = form.clickme;
    let unclickme = form.unclickme;
    let nClicks = 0; // Initialize nClicks variable
    let button = document.querySelector("#buttonId"); // Add a button selector with a specific ID or class

    const handleClick = (event) => {
        let whichButton = event.currentTarget;
        if (whichButton === clickme){
            nClicks++;
        } else {
            nClicks--;
        }
        button.textContent = `Clicked ${nClicks} times`;
    };

    clickme.addEventListener('click', handleClick);
    unclickme.addEventListener('click', handleClick); // Add event listener to the unclickme button
};




// Implementing converter class
class Converter {
  constructor() {
    this._form = document.forms.converter;

    // Bind the handleClick method to the Converter class
    this.handleClick = this.handleClick.bind(this);

    this._form.convert.addEventListener('click', this.handleClick);
  }

  handleClick(event) {
    // If we used .value it would have returned string
    let usUnits = this._form.us.valueAsNumber;
    this._form.metric.value = usUnits * 2.54;
    console.log('Click!');
  }
}

```

# Lecture 5

### HTML


``` html


```

### JS

``` js
console.log('Hello World');

```
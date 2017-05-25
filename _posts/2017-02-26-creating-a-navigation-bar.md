---
title: "How to Create a Dynamic Navigation Bar"
image: "/assets/images/hamburger.png"
---

<img src="{{ page.image }}" alt="Image of the triple bar icon or, hamburger.">
If you've spent time on the Internet then chances are you've seen somewhere a site with a drop down menu or navigation menu. They are handy little things that allow more space on the page for content, this is especially useful for mobile views where you have less space to fit content. So, let's delve into and start typing one up.


### Setup

Go create a new folder, name it whatever you would like. Within that folder create a new file named *index.html*, another new file named *styles.css*, and lastly a file name *toggle-navbar.js*. The html file[^1] will dictate the page's content, our css file[^2] will deal with the styling of the pages content, and our JavaScript[^3] will make the navigation bar toggle on/off. Now let us begin with our html file.

### HTML

Starting with our html, open up the file with a text editor so we may begin. Right now we have a blank file and that will not yield content for our viewing pleasure. So lets start with a basic html tag[^4] setup.

```html
<!DOCTYPE html>
<html>

<head>
	
</head>

<body>

</body>

</html>
```
<span>Note:</span> This is the basic setup, in the head will go a link to our css file and in the body the actual things you'll see on the screen when you open up the .html file in your browser.
{:.callout}





Now we have an empty frame to fill with our navigation bar, but just saying add a nav-bar is just vague. So first we need to define what that is in simple terms such as shapes. A navigation bar is essentially just two boxes with stuff in them. Alright, that definition give us some direction to start. So, lets start basic with two boxes, or divs[^5], one for the always shown header part, and another for the actual navigation drop drown. Inside our body tags we will insert our two boxes.

```html
<body>
	<div>I'm the header box</div>
	<div>and I'm the drop down box</div>
</body>

```
We now have our two divs, each holding some text to help identify them but, lets say we wanted to color them differently. We wont yet but, we will need to name the divs so we can call on one of them rather than both. Using attributes[^6] will accomplish this, so lets give our divs names.

```html
<body>
	<div id="box_1">I'm the header box</div>
	<div id="box_2">and I'm the drop down box</div>
</body>
```
Perfect! Now we have named them box_1 and box_2 respectively. The last thing we need to add to our html is a link to our css file and our JavaScript. So in our head we will create a link tag with a rel[^7] attribute and a href[^8] attribute, and a script tag with a src tag.

```html
<head>
	<link rel="stylesheet" href="styles.css">
	<script src="toggle-navbar.js"></script>
</head>
```

Alright, now we have our html linked to our css file! Now we can hop over to our css file and open that up in our text editor.

### CSS

Déjà vu, its empty, lets change that. Lets first just color our boxes, that sounds nice and fun. Wait, how do you tell it what to color? Well in css we use selectors[^9] to select the thing, or element, from the html to stylize. So using one of the simple selectors we can select our divs using *"div{}"* but, that selects both. That why we assigned an id attribute to each div. To select using id we would use the pound(#) sign before the id name, so lets color.

```css
#box_1{
	background-color: blue;
}

#box_2{
	background-color: pink;
}
```

Cool, we got our two boxes colored using the *"background-color"* rule[^10], but they look a little short. Using another rule we'll fix that using the *"padding"* rule to add space between the text and the box boundaries.

```css
#box_1{
	padding: 50px;
	background-color: lightblue;
}

#box_2{
	padding: 20px;
	background-color: pink;
}
```

Now we have our two boxes looking good and we need to figure out how to get one behind the other. The page appears two-dimensional but, we can raise elements above others on a 3rd axis. To do this requires us to change an elements position rule in css. 

<span>Note: </span>Position is a powerful tool that allows us to manipulate the position of elements and can be used to change the flow of elements on a page. Position can be static, relative, absolute, or fixed.
{:.callout} 

Right now our boxes are in their default position(*static*) here they cannot move up to a higher layer. Let's use position relative to lift our header box up and the *"z-index"* rule to say which layer it is on. I choose relative because it will not interrupt the flow of elements but still allow us onto another layer.

```css
#box_1{
	position: relative;
	z-index: 2;
	padding: 50px;
	background-color: lightblue;
}

#box_2{
	padding: 20px;
	background-color: pink;
}
```

Box_1 is now on the second layer and we now need to get our other box to sit beneath box_1. Again we will change the position and z-index rule but, this time we will use position absolute so later we can easily move it to the top of the page. We also will put it on layer 1 so it's above the page but still below the header box.

```css
#box_1{
	position: relative;
	z-index: 2;
	padding: 50px;
	background-color: lightblue;
}

#box_2{
	top: 8px;
	position: absolute;
	z-index: 1;
	padding: 20px;
	background-color: pink;
}
```
Now if you reload the page you won't see our second box! It's still there it's just behind our header now thanks to our top rule being 8px, aka our box is 8 pixels below the top of the page. We've hidden our box, so how do we unhide it? Using JavaScript!


### JavaScript

Open up our .js file, like a child opening a present on Christmas morning, except it's not a present, just an empty file. In our script we need to accomplish a few things, first when we click the header show the other box and secondly if we click again hide it. To do this we will use the DOM and event listeners to do things when we click on the header.

Let's start by defining our header and nav elements in our script, actually before we can do that we need to tell the computer to wait for the page to load or else we'll get an error. How? you ask, simple we add a load event listener to the window and once it loads we start execution. Follow along.

```javascript
window.addEventListener("load", function(){
	
	// Our code here!

});
```
Alright now we're good to continue with our work flow. So we need to define our header div, the nav div, and some sort of on/off variable.

```javascript
window.addEventListener("load", function(){
	
	header = document.getElementById("box_1");
	navbar = document.getElementById("box_2");
	onoff = 0;

});
```

Now when ever the header is clicked we want to toggle the navigation on or off. So, using an event listener we can tell it to do something whenever a specified event occurs on a element.

```javascript
window.addEventListener("load", function(){
	
	header = document.getElementById("box_1");
	navbar = document.getElementById("box_2");
	onoff = 0;

	header.addEventListener("click", toggleNavbar)

});
```

Now, whenever the header is clicked it will run the *'toggleNavbar'* function! Except that function doesn't innately exist in JavaScript but, we can make it exist. What do we want toggleNavbar to do exactly? Well, we want it to show the navbar if it's not showing, and to hide the navbar if it is showing.

```javascript
function toggleNavbar(){
	if (onoff == 0){
		showNav();
		onoff = 1;
	}
	else{
		hideNav();
		onoff = 0;
	};
};
```

So if our onoff toggle is 0, then the nav is hidden, we execute showNav, and set our toggle to 1. If our toggle isn't 0, then the nav is showing, we hideNav, and set our toggle to 0. Perfect! Except yet again we have non-existent functions( hideNav and showNav). Time to define them.

```javascript
function showNav(){
	bottomOfHeader = header.offsetHeight + header.offsetTop + "px";
	navbar.style.top = bottomOfHeader;
};

function hideNav(){
	navbar.style.top = header.offsetTop + "px";
};
```
Okay so the functions names tell us what they do but, some of the stuff inside may look foreign and strange. 

So inside of showNav we first define a variable bottomOfHeader and set it equal to the header.offsetHeight + "px". Header.offsetHeight returns the elements height of pixels as a number and header.offsetTop returns the number of pixels between it and the top of the screen. So if we add these together we have the number of pixels from the top of the page to the bottom of our header element and then we add the "px" string to specify the units. On the line below we set the navbar.style.top to the bottomOfHeader variable, thus moving the navbar to the bottom of the header.

Now in hideNav we set the navbar's pixels from top to be the number of pixels between the header and the top of the page. Thus, putting it right behind the header. If we had just set it to 0px some of the box would end up peaking over the top of the header.

### Conclusion 

Alright, we have built a working navbar, albeit very minimal. There is plenty of room to build upon this for example, you could add a transition to the drop down, add links in the divs, create different parts of the header with different drop downs, and so much more. So play around with it and enjoy your custom built navigation.

<hr>
### Footnotes

[^1]: Html stands for Hypertext Markup Language, and is the standard markup language for creating web pages and applications.
[^2]: Stands for Cascading Style Sheet, and is used for visually styling a web page.
[^3]: JavaScript is a scripting language used to make a web page act dynamically.
[^4]: Tags are a identifier in HTML that define how the content will act or be rendered, not to be confused with elements, which are rendered from tags.
[^5]: Div is a HTML tag whose job is grouping a collection of elements together.
[^6]: An attribute is a modifier of an HTML element used to modify the default functionality
[^7]: The required rel attribute specifies the relationship between the current document and the linked document/resource.
[^8]: The href attribute specifies the location of a linked document.
[^9]: Css selectors are patterns used to identify elements you want to style.
[^10]: Css rules consist of a declaration and a selector. Rules are used to change the styling of the element.
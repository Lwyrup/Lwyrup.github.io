---
title: "Creating a search app using AngularJS"
image: "/assets/images/angular.png"
---
<img src="{{ page.image }}" alt="Logo for AngularJS.">
AngularJS what is it? If you're a dev you either know it or have heard about it, and if you're not a dev you probably are wondering what in the world is Angular? Well, AngularJS is a front-end JavaScript framework used for creating single-page web applications. Using custom tag attributes, AngularJS allows you to do all the templating in HTML. In short it lets you link your JS to your HTML and vice-versa, and is great for creating user interfaces. Enough explaining lets get coding. <a href="/2017/06/02/search-app-angular.html#demo">See the app we will be building.</a>

### Setup

First we will create our workspace by creating a folder named 'angularJS-search' and within a HTML named 'index.html'. Now, while still within the angularJS-search folder create a 'scripts' folder to hold our scripts. We will create two file in scripts the first being 'myApp.js' and the second 'myController.js'. Lastly we'll need AngularJS, of course, there are many ways to get AngularJS. You can visit their (website)[https://angularjs.org/] and download a zip, use a CDN[^1], or one of the other methods they specify. For this tutorial I will be using AnulgarJS via a CDN.

### Laying the Plan

So our app will be a pseudo search engine that searches for people, as creepy as that sounds. We'll define a person as 3 simple things a first name, last name, and a short bio about that person. The page will have a input box where you type in characters, and it'll filter out people who don't match the filter. Lastly when clicking on a person from the results list it will show us their bio.

Now that we have a plan we'll start with the HTML templating.

### HTML

We start by dream coding[^2] the ideal structure we want for our search application. At this point we'll focus on the HTML and HTML only, forget everything else.

```html
<!DOCTYPE html>
<html>
<head>
	<title>Peeple Findr &mdash; All your creepy needs in one place</title>
</head>
<body>

	<header>
		<h1>Peeple Findr</h1>
		<small>All your creeping needs</small>
	</header>

	<input value="Jo">

	<div style="float:right; width:500px;">
		<h2>About &mdash; John Smith</h2>
		<p>John Smith is a nobody, he is a placeholder name, and is often confused with Adam Smith.</p>
		<a href='#'>Close</a>
	</div>

	<p>People found matching Jo</p>
	<table>
		<thead>
			<tr>
				<th>First Name</th>
				<th>Last Name</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>John</td>
				<td>Smith</td>
			</tr>
		</tbody>
	</table>

</body>
</html>
```
This provides us with this basic layout with our static values. Now that we have our basic structure we'll now move onto using AngularJS to bring it to life.

### The Scripts and AngularJS

To get AngularJS all we need to do is add a script tag referencing the file, whether that be a url for a CDN or if it is saved within your scripts folder. We will add the tag along with tags for our other JavaScript files.

```html
<!DOCTYPE html>
<html>
<head>
	<title>Peeple Findr &mdash; All your creepy needs in one place</title>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
	<script type="text/javascript" src="scripts/myApp.js"></script>
	<script type="text/javascript" src="scripts/myController.js"></script>
</head>
<body>
	...
</body>
</html>
```

Now we're all set to start with AngularJS. For our first task we will link the value of the search with the 'People found matching __' p tag. We will use three AngularJS directives[^3] to accomplish this. These directives are ng-app, ng-model, and ng-bind. ng-app defines an AngularJS application, ng-model binds the value of an HTML element to a piece of application data, and ng-bind binds application data to an element. To use these directives just treat them as HTML attributes.

```html
<body>

	<header>
		<h1>Peeple Findr</h1>
		<small>All your creeping needs</small>
	</header>

	<div ng-app="">
		<input ng-model="search">

		<div style="float:right; width:500px;">
			<h2>About &mdash; John Smith</h2>
			<p>John Smith is a nobody, he is a placeholder name, and is often confused with Adam Smith.</p>
			<a href='#'>Close</a>
		</div>

		<p>People found matching <span ng-bind="search"></span></p>
		<table>
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>John</td>
					<td>Smith</td>
				</tr>
			</tbody>
		</table>
	</div>

</body>
</html>
```

<div class="HTMLExample"></div>

Now when we type into our input element the text in the p tag updates and displays our search! Next we'll make the search results display dynamically. We'll need to initialize our app in myApp.js before we can feed it any sort of data. So, lets initialize.

```javascript
var app = angular.module('searchApp',[]);
```

<span>Note: </span>angular.module is the method used to create an application. It takes two parameters the name of the application and an empty array, which is actually the $scope object. The $scope object is where AngularJS stores all the variables and functions for the application and, cannot be used outside the application.
{:.callout}

Now we need to update our ng-app directive to match up the names.
```html
	...
	<div ng-app="searchApp">
		<input ng-model="search">
		...
```

With our app linked in the HTML view and our myApp file we can now add a controller. The controller is used to define functions and data for our application. So open up the myController.js and create the controller.

```javascript
app.controller('myCtrl', function($scope){
	// Define app variables and functions in here
});
```

We use the app variable we defined in the myApp.js to add a controller for our searchApp but, just like adding the app to JavaScript we need to define the controller in our HTML with the ng-controller directive.

```html
	...
	<div ng-app="searchApp" ng-controller="myCtrl">
		<input ng-model="search">
		...
```

With the controller and app defined and connected we can start making magic. Remember when you wrote ng-model="search" and ng-bind="search"? How does it work? It works by creating a variable search in our apps $scope, mapping the value of the input to the variable, and then inserting the variables value into the bound element. Since search is actually a variable that means we can define it in our JavaScript. In our controller lets try it.

```javascript
app.controller('myCtrl', function($scope){
	$scope.search = "Stan";
});
```

Now when you refresh the input and the p tag will both already have Stan set as their values. This is how we will store our people. We'll create an array of people objects and stick in into a $scope variable.

```javascript
app.controller('myCtrl', function($scope){
	$scope.people = [
	    {fname:"Steve", lname:"Austin", 
		    bio:"Steve Austin (born Steven James Anderson on December 18, 1964, later Steven James Williams), better known by the ring name \"Stone Cold\" Steve Austin, is an American actor, media personality, producer, and retired professional wrestler who is signed to a Legends contract with WWE. Veteran pro wrestling journalist Wade Keller remarked that Austin is \"in every conversation for the greatest wrestling act of all time\", as well as for \"the most profitable and the most influential\"."
		},
	    {fname:"Mark", lname:"Hamill", 
		    bio:"Mark Richard Hamill (born September 25, 1951) is an American actor, voice actor, producer and writer. He is best known for playing Luke Skywalker in the Star Wars film series. His other works include Corvette Summer (1978) and The Big Red One (1980), among other television shows and movies. Hamill has also appeared on stage in several theater productions, primarily during the 1980s."
		},
	    {fname:"Mark", lname:"Zuckerberg", 
		    bio:"Mark Elliot Zuckerberg (born May 14, 1984) is an American computer programmer and Internet entrepreneur. He is a co-founder of Facebook, and currently operates as its chairman and chief executive officer. His net worth is estimated to be US$63.3 billion as of May 2017, and he is ranked by Forbes as the fifth richest person in the world."
		},
	    {fname:"Jeff", lname:"Kaplan", 
		    bio:"Jeff Kaplan is a video game developer and currently serves as Vice President of Blizzard Entertainment. He is known for his work in designing elements of World of Warcraft and is the lead designer on Overwatch."
		},
	    {fname:"John", lname:"Smith", 
		    bio:"John Smith (1825–1910) was a Scottish dentist, philanthropist and pioneering educator. The founder of the Edinburgh school of dentistry, he served as president of the Royal College of Surgeons of Edinburgh (1883) and president of the British Dental Association."
		},
	    {fname:"Fred", lname:"Durst", 
		    bio:"William Frederick \"Fred\" Durst (born August 20, 1970) is an American musician and film director. Durst is best known as the vocalist of the band Limp Bizkit, formed in 1994, with whom he has released six studio albums."
		},
	    {fname:"Demetri", lname:"Martin", 
		    bio:"Demetri Martin (born May 25, 1973) is an American comedian, actor, artist, musician, writer, and humorist. He is best known for his work as a stand-up comedian, being a contributor on The Daily Show, and his Comedy Central show Important Things with Demetri Martin."
		}
	];
});
```

People are now defined and have our 3 properties of a person. Say goodbye to the hard coded row search result and say hello to ng-repeat. ng-repeat will allow us to iterate through an array and is how we'll display our people.

```html
...
		<table>
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="person in people">
					<td ng-bind="person.fname"></td>
					<td ng-bind="person.lname"></td>
				</tr>
			</tbody>
		</table>
	</div>

</body>
</html>
```

ng-repeat iterates over people and stores the current person being iterated over into the person variable before the 'in'. Within the tags using ng-repeat we have access to the person variable and can call on the various properties we defined.

<span>Note:</span> you can use \<p ng-bind="search">\</p> or \<p>\{\{ search \}\}\</p> to bind values to elements. Use what feels more natural to you.
{:.callout}

Upon refreshing your browser you should see the table body filled with our people. Now we can search! Start typing into the input and... it doesn't work yet. To quickly get our search functional we will make use of AngularJS's filters specifically the filter filter... naming conventions can be confusing as hell sometimes. Well, the filter filter is used on arrays and returns an array with items matching the filter, or in our case search.

```html
...
		<table>
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="person in people | filter:search">
					<td ng-bind="person.fname"></td>
					<td ng-bind="person.lname"></td>
				</tr>
			</tbody>
		</table>
	</div>

</body>
</html>
```

Thats all it takes, no convoluted long method to match, check, and so on. It's actually really cool how easy the filter filter makes this. So the filter looks at our person objects and checks if the properties contain the value of our search variable. It looks at the first name, last name, and the bio! So you can search 'wwe' and stone cold will show up!

The last functionality we'll add will be dynamically generating the selected person. Deja vu, we're using another directive. This directive is ng-click, and can be essentially acts as click event listener. When an element with the ng-click directive is clicked it will execute the expression defined.

For example.
```html
<button ng-click="count += 1" ng-init="0">Up count</button>
<p>The count is at: \{\{ count \}\}</p>
```

Rather than putting an expression in-line we can store our expression in the $scope and simply refer to it by the variable in the HTML. So lets add our expression to the $scope.

```javascript
app.controller('myCtrl', function($scope){
	$scope.people = [
		...
		...
		...
	];

	$scope.selectPerson = function(x){
		$scope.selected = x;
	}
});
```

The selectPerson variable, when called on, will execute the function. x in the function is the data/person that we clicked on in our table. Then the selected variable is created and set to hold our lucky person. Now we'll add our click function to our rows.

```html
...
		<table>
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="person in people | filter:search" ng-click="selectPerson(person)">
					<td ng-bind="person.fname"></td>
					<td ng-bind="person.lname"></td>
				</tr>
			</tbody>
		</table>
	</div>

</body>
</html>
```

So, we now have a person object stored in the selected variable, have complete access to all of its properties in our HTML view, and can change the selected with a click. All we need to do is bind our HTML with our data.

```html
		...
		<input ng-model="search">

		<div style="float:right; width:500px;">
			<h2>About &mdash; {{ selected.fname + ' ' + selected.lname }}</h2>
			<p ng-bind="selected.bio"></p>
			<a href='#'>Close</a>
		</div>
		...
```

Our app now has all the functionally we set out to define. The last couple of things I'm going to go over are how to define your own directives, and the ng-show directive to make our app cleaner.

### Creating Directives

AngularJS has great built in directives but you can also create your own. Lets create our own directive for the \<p>People found matching \<span ng-bind="search">\</span>\</p> tags. We start in our myApp.js file. 

```javascript
var app = angular.module('searchApp',[]);

app.directive("searchStatus", function(){
	return{
		template: "<p>People found matching<span ng-bind="search"></span></p>"
	}
});
```

Now we can replace the old p tag in our HTML with the directive. Either as an element

```html
	...
	<search-status></search-status>
	<table>
	...
```

or as an attribute.

```html
	...
	<div search-status></div search-status>
	<table>
	...
```

<span>Note: </span>When creating directives in the JavaScript file you must name the directive using camelCase[^4] and when calling the directive in the HTML use lisp-case[^5].
{:.callout}

Now upon refreshing it still works and the search variable is still updated as the program runs.



### ng-show

Now we'll make our application look more professional using the ng-show directive. The ng-show directive allows the element to be shown or hidden depending on the truthy-ness or flasey-ness? of an expression or variable.

When our application first loads we are greeted with an empty search. Yet we see all the people and 'People found matching' with nothing behind it. If there's no search then there should be no search results shown, or a 'People found matching' search status. To remedy this we'll wrap the p tag and the table in a div. On that div we'll use the ng-show directive and point it at the search variable.

```html
	...
	<div ng-show="search">
		<p>People found matching <span ng-bind="search"></span></p>
		<table>
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="person in people | filter:search" ng-click="selectPerson(person)">
					<td ng-bind="person.fname"></td>
					<td ng-bind="person.lname"></td>
				</tr>
			</tbody>
		</table>
	<div>
	...
```

So as long as search contains a non-empty string we will see these elements but, once empty the search var turns falsey and ng-show hides our elements. Much better, except we still have a 'About &mdash;' and 'close' sitting off to the right... looks like another job for ng-show! We'll apply an ng-show to the container for these elements and use the selected variable to toggle the display.

```html
	<div style="float:right; width:500px;" ng-show="selected">
		<h2>About &mdash; 
			<span ng-bind="selected.fname"></span> <span ng-bind="selected.lname"></span>
		</h2>
		<p ng-bind="selected.bio"></p>
		<a href='#'>Close</a>
	</div>
```

Perfect! It works like a charm. The last thing I'll add the the close button functionality, don't worry it uses nothing new. We'll define a clearSelected method in our controller file and use ng-click to bind the function to our close a tag.

```javascript
app.controller('myCtrl', function($scope){
	$scope.people = [
		...
		...
		...
	];

	$scope.selectPerson = function(x){
		$scope.selected = x;
	};

	$scope.clearSelected = function(){
		$scope.selected = null;
	};
});
```

```html
	<div style="float:right; width:500px;" ng-show="selected">
		<h2>About &mdash; 
			<span ng-bind="selected.fname"></span> <span ng-bind="selected.lname"></span>
		</h2>
		<p ng-bind="selected.bio"></p>
		<a href='#' ng-click="clearSelected()">Close</a>
	</div>
```

Viola! Now you can close the about info box if and when you please. If you were just following along at home don't fear because the finished application is right here! Tada!

<div class="HTMLDemo clearFix"  id="demo" style="border: 1px solid black; padding: 10px; min-height: 350px;">
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
	<script type="text/javascript" src="/assets/scripts/angular-demo-app.js"></script>
	<script type="text/javascript" src="/assets/scripts/angular-demo-ctrl.js"></script>

	<header>
		<h1>Peeple Findr</h1>
		<small>All your creeping needs</small>
	</header>

	<div ng-app="demoApp" ng-controller="demoCtrl">
		<input ng-model="search">

		<div style="float:right; width:600px;" ng-show="selected">
			<h2>About &mdash; 
				<span ng-bind="selected.fname"></span> <span ng-bind="selected.lname"></span>
			</h2>
			<p ng-bind="selected.bio"></p>
			<button ng-click="clearSelected()">Close</button>
		</div>

		<div ng-show="search">
		<p>People found matching <span ng-bind="search"></span></p>
			<table>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
					</tr>
				</thead>
				<tbody>
					<tr ng-repeat="person in people | filter:search" ng-click="selectPerson(person)">
						<td ng-bind="person.fname"></td>
						<td ng-bind="person.lname"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

### Conclusion

Wow, if you followed along I congratulate you. If this takes as long to read as it did to type then, I am sorry. In all seriousness though this was a bit more than a simple search app using AngularJS and covered a majority of the basics. I really do hope that you enjoyed this tutorial and found it helpful. Have a great day!

<hr>
### Footnotes

[^1]:CDN stands for Content Delivery Network and is a network of servers that distribute content or web pages.
[^2]:The practice of coding what you wish existed.
[^3]:Directives are extended HTML attributes.
[^4]:camelCase is the practices of writing words compounded together without spaces and only capitalizing the first letter of words that aren't the first word. In short: thisIs camelCase andHowIt looksWrittenOut.
[^5]:lisp-case is practice of writing compounded words together in all lower case and using hyphens for spaces. In short: this-is lisp-case and-how-it looks-written-out.
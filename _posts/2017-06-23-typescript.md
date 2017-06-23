---
title: "TypeScript, what and why?"
image: "/assets/images/"
---
<img src="{{ page.image }}" alt="">
JavaScript is the client-side scripting language king, but it, like anything else, is not perfect. Hence the creation of various libraries, frameworks, and mini-languages that compile to normal JavaScript. TypeScript is one of these mini-languages. It extends features to JavaScript, gives all the benefits of ES6, and offers a C# like syntax. So, lets get into the specifics of what TypeScript extends to JavaScript. 


### Getting started with TypeScript

Getting up and running is fairly simple, you can get TypeScript installed using Visual Studio's plug-ins, or using npm[^1]. For npm you'll want to run 'npm install -g typescript' to install, and 'tsc {{filename}}.ts' to compile your TypeScript to JavaScript. 

<span>Note:</span> TypeScript files use the file extension .ts and when referencing your TypeScript files in HTML, refer to the compiled .js file, not the .ts file.


### Type Annotations

Type annotations allow you to quickly define the type of variables or functions. To use type annotations find a variable declaration and right after the variable's name place a colon ': ' and then the desired type 'string'. For example here is both the JavaScript and TypeScript.

```javascript
var mealName = "Pizza";
var price = 8.99;

function listMeal() {
    console.log(mealName + " costs " + price);
}
```

In our JS you can see there are no type constraints.

```typescript
var mealName: string = "Pizza";
var price: number = 8.99;

function listMeal(): void {
	console.log(`${mealName} costs ${price}`)
}
```

See we can define the types of our variable and even define what functions will return, in this example nothing or void. We also can type function parameters, just like C#

```typescript
var mealName: string = "Pizza";
var mealPrice: number = 8.99;

function listMeal(meal: string, price: number): void {
	console.log(`${meal} costs ${price}`)
}
```


### Interfaces

Interfaces allow us to describe objects, and in TypeScript two types can be compatible if they have matching structure. Which is why there is no error in passing the untyped var into our type function.

```typescript
interface Meal {
	name: string;
	price: number;
}

var meal = { name: "Pizza", price: 8.99 };

function listMeal(meal: Meal): void {
	console.log(`${meal.name} costs ${meal.price}`)
}

listMeal(meal);
```


### Classes

TypeScript changes the way you use classes in JavaScript. While you can create classes in standard JS, TypeScript makes class declaration a breeze. For example, this is a JavaScript class.

```javascript
function Animal(name) {
	this.name = name;
	this.growl = function(){
		console.log(this.name + " growls");
	};
}
```

and now the class in TypeScript

```typescript
class Animal {
	public name: string;
	public constructor(name: string) { this.name = name; }
	public growl() {
		console.log(`${this.name} growls`);
	}
}
```

As you can see class declaration now becomes clearer, and the growl function is much cleaner when using TypeScript. The TypeScript declaration also highly resembles C# class syntax.


### Inheritance

Not only do you get cleaner classes but you can easily inherit from other classes. You also can use the 'super' method to access your base class, just like base in C#.

```typescript
class Animal {
	public name: string;
	public constructor(name: string) { this.name = name; }
	public growl() {
		console.log(`${this.name} growls`);
	}
}

class Snake extends Animal {
	constructor(name: string) { super(name); }
	public shed() {
		console.log(`${this.name} sheds`);
	}
}

var slithers = new Snake("Slithers the snake");
slithers.growl();
slithers.shed();
```





### Footnotes

[^1]: Stands for Node Package Manager, and allows you to install, update, and remove node packages.
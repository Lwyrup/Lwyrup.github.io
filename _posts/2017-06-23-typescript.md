---
title: "TypeScript, what and why?"
image: "/assets/images/typescript.png"
---
<img src="{{ page.image }}" alt="TypeScript's logo.">
JavaScript is the client-side scripting language king, but it, like anything else, is not perfect. Hence the creation of various libraries, frameworks, and mini-languages that compile to normal JavaScript. TypeScript is one of these mini-languages. It extends features to JavaScript and gives all the benefits of ES6. 


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
	public speak() {
		console.log("Grrrr...");
	}
}

class Snake extends Animal {
	constructor(name: string) { super(name); }
	public shed() {
		console.log(`${this.name} sheds`);
	}
	public speak() {
		console.log("Hiss");
	}
}

class Dog extends Animal {
	constructor(name: string) { super(name); }
	public bark() {
		console.log("Yipp!");
	}
}

var slithers = new Snake("Slithers the snake");
slithers.speak();
slithers.shed();

var chance = new Dog("Chance the dog");
chance.speak();
chance.bark();
```

By using the keyword 'extends' we can have classes inherit from our Animal class. In our derived class we can define the class's constructor and use 'super' to call the base class constructor. In our Snake class we inherited the speak method but, by defining a speak method within the snake class we effectively override the base class functionality. With this override our snake will now hiss instead of the standard growl. We also implement Snake class exclusive functionality with our shed method.

With our Dog class we again implement unique functionality but, in this case we don't override speak. So, our dog can still call on speak to go grrr.


### Access modifiers

The last bit of TypeScript I want to go over is access modifiers. Access modifiers affect how and if you can access something, that something usually being a variable or function. By default TypeScript assigns the public modifier but, you can still explicitly state it. Public allows access from anywhere in our program, such as outside the class.

The next modifier is the private modifier. With this modifier, the marked item can only be access from its containing class. For example

```typescript
class Animal {
	private name: string;
	public constructor(name: string) { this.name = name; }
	public speak() {
		console.log("Grrrr...");
	}
	public getName() {
		console.log(name);
	}
}

var x = new Animal("Sam");

var x.name = "Stan";
console.log(x.name);
```

the last two lines will cause an error because they're trying to assign and access the private property from outside the class. However if you called getName() then it would be able to get the value of 'name'.

The last modifier is protected and functions similarly to private. When using private and then deriving classes from the private using base class it causes problems. For instance,

```typescript
class Animal {
	private name: string;
	public constructor(name: string) { this.name = name; }
	public speak() {
		console.log("Grrrr...");
	}
}

class Snake extends Animal {
	constructor(name: string) { super(name); }
	public shed() {
		console.log(`${this.name} sheds`);
	}
	public speak() {
		console.log("Hiss");
	}
}
```

by changing the name property in Animal to private, it then causes an error in the Snake class. When the shed method goes to get the name, it will be unable to because the name is only accessible to the Animal class. Here is when protected comes into play, because it allows superclass properties to act as private while still being accessible within subclasses deriving from it.

```typescript
class Animal {
	protected name: string;
	public constructor(name: string) { this.name = name; }
	public speak() {
		console.log("Grrrr...");
	}
}

class Snake extends Animal {
	constructor(name: string) { super(name); }
	public shed() {
		console.log(`${this.name} sheds`);
	}
	public speak() {
		console.log("Hiss");
	}
}
```

Now the shed method will work correctly.


### Final notes

So as you can see TypeScript extends JavaScript and allows clean object oriented code that compiles to JavaScript. It has more features than just these and makes scripting interesting. It also amazingly allows you to write less, I mean just look at this code.

Here is the TypeScript

```typescript
class Animal {
	protected name: string;
	public constructor(name: string) { this.name = name; }
	public speak() {
		console.log("Grrrr...");
	}
}

class Snake extends Animal {
	constructor(name: string) { super(name); }
	public shed() {
		console.log(`${this.name} sheds`);
	}
	public speak() {
		console.log("Hiss");
	}
}

class Dog extends Animal {
	constructor(name: string) { super(name); }
	public bark() {
		console.log("Yipp!");
	}
}

var slithers = new Snake("Slithers the snake");
slithers.speak();
slithers.shed();

var chance = new Dog("Chance the dog");
chance.speak();
chance.bark(); 
```

and here is the JavaScript equivalent.

```javascript
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Animal = (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.speak = function () {
        console.log("Grrrr...");
    };
    return Animal;
}());
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.shed = function () {
        console.log(this.name + " sheds");
    };
    Snake.prototype.speak = function () {
        console.log("Hiss");
    };
    return Snake;
}(Animal));
var Dog = (function (_super) {
    __extends(Dog, _super);
    function Dog(name) {
        return _super.call(this, name) || this;
    }
    Dog.prototype.bark = function () {
        console.log("Yipp!");
    };
    return Dog;
}(Animal));
var slithers = new Snake("Slithers the snake");
slithers.speak();
slithers.shed();
var chance = new Dog("Chance the dog");
chance.speak();
chance.bark();
```

In writing 28 line of simple TypeScript you end up with 48 lines of JavaScript. Now if I had to pick I'd go with the TypeScript.


### Footnotes

[^1]: Stands for Node Package Manager, and allows you to install, update, and remove node packages.
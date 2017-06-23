---
title: "TypeScript, what and why?"
image: "/assets/images/"
---
<img src="{{ page.image }}" alt="">
JavaScript is the client-side scripting language king, but it, like anything else, is not perfect. Hence the creation of various libraries, frameworks, and mini-languages that compile to normal JavaScript. TypeScript is one of these mini-languages. It extends features to JavaScript, gives all the benefits of ES6, and offers a C# like syntax. So, lets get into the specifics of what TypeScript extends to JavaScript. 


### Getting started with TypeScript

Getting up and running is fairly simple, you can get TypeScript installed using Visual Studio's plug-ins, or using npm[^1]


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






### Footnotes

[^1]: Stands for Node Package Manager, and allows you to install, update, and remove node packages.
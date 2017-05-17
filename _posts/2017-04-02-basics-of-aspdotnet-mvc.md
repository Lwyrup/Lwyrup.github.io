---
title: Basic structure of ASP .NET MVC
---
<img src="/assets/images/mvc_role_diagram.png">
ASP .NET MVC, looks intimidating doesn't it? Despite the acronyms, if you know about models, views, and controllers, then you can easily find out ASP .NET does. If you didn't catch that I just gave away what the MVC stands for, models, views, and controllers. So that being said lets dive into an shallow overview of ASP .NET.

For the last two weeks I've been messing with ASP .NET and have come a long way from struggling to understand routing patterns, but I digress. You already know MVC but, what is ASP and .NET?

### What is ASP .NET?

Well, ASP stands for [Active Server Pages](https://en.wikipedia.org/wiki/Active_Server_Pages), which is a early server-side script engine developed by Microsoft for dynamically generated web pages. .NET then is a server-side web app framework and is written with CIL's[^1] and coverted by the CLR[^2]. Okay, so that was a bit technical, but basically with the .NET framework you can write code using a language that falls under the Common Intermediate Language umbrella. This typically is C#[^3] or VB[^4].

Okay the confusing part is over now. To understand the idea of how ASP .NET works were going to describe it more abstractly.

### ASP .NET flow

Lets say we have a basic web site with a home page and a users page. We go to our websites home page in the browser and we see our home page. Now lets re analyze from the back-end perspective.

The program is  sitting around and then receives a home page request that looks like this '/'. It is reluctant to do any real work so, it checks if its worth his time to pass it to a controller. He checks this using a routing pattern[^5] that looks like this.

```csharp
Route.MapRoute(
	name: "Basic Route",
	url: "/{controller}/{action}",
	default new { controller = "Home", action = "Index" }
);
```

The url:... is what the pattern is and, below is the deafults if one of the slugs is empty.
{:.callout}

The '/' is generic enough and fits the url pattern but, oh no there's no controller or action specify in '/'. The program sees this and fits the defaults into the empty slots so, the users request for '/' actually acts as if it were '/home/index'. 

If we were to request '/books' then the routing would assume the missing action to be index and call the index method with the books controller.

Back on track now. So, now the program knows the controller and action that should be used. With this knowledge he pawns off the work to the controller. Our home controller gets the message and runs his index method. In this case the method just renders a static view and is finished.

Static web pages are simple and by default will render the .cshtml[^6] view file with the same name as the action. For example: '/food/index' would get the view at 'Views/Food/Index.cshtml'.

### ASP .NET models

So our previous example had a controller and a view but, where's the model? Well, it didn't have any model so, lets run through a request that uses a model.

Lets say we go to '/users' or, as the program with see it '/users/index'. So our request gets sent to the users controller and its index method. Within the controller the index action is called and looks like

```csharp
public ActionResult Index()
{
	var allUsers = Users.All();
	return View( allUsers );
}
```

Here we see it defines a variable and assigns the value of Users.All(), here is our model. So the controller calls on a public static method All for the User model and stores it in a var. Then we see that within view the controller passes that variable into the view.

This is the basic flow of ASP .NET. The controller issues commands to the model, the model stores data and transforms data, and the view generates output of the model.

<hr>
### Footnotes

[^1]: CIL stands for Common Intermediate Language, and means languages that use a compatible runtime environment.
[^2]: CLR stands for Common Language Runtime, the virtual machine component of Microsoft's .NET framework that converts compiled code into machine instructions.
[^3]: C# or C Sharp, is a object oriented language similar to Java.
[^4]: VB is Visual Basic, is another object oriented language.
[^5]: Routing patterns map to request-handler files, but do not necessarily include the names of those files in the Route.
[^6]: cshtml is the file extension for files with C Sharp and HTMl using the Razor syntax. 
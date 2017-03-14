---
title: "Dynamic Development"
---

Web-pages nowadays tend to change while your viewing the page. Whether that change is a menu dropping in front of you, or when you hit the bottom of your twitter feed and more appear. Many pages use these dynamic elements to insert, show, or remove elements on the page. Large sites embrace dynamic development as it allows them to avoid writing every page by hand. How do they do this, you may ask? The building blocks consist of the DOM, events, and usually a server component.

### The DOM, what and why?

The DOM stands for: document object model. It is a way to organize the many parts of a web page and a great way to help programs navigate through the page. The web-page under the DOM is organized in a tree structure with the ‘document’ being the root of the entire page. Under document are two things ‘head’ and ‘body’. These are called ‘nodes’ and are like the branches of the ‘document’ tree. Nodes can come from the ‘document’ and then nodes can come from those nodes for as long as the developer wants. These ‘branches’ are helpful for web development because they allow navigation up and down the tree relative to a selected position. For instance if you have two exact some branches, that are children of the same parent branch, but you want one to lose all of its leaves and the other to not. Rather than starting at the root and going all the way through the tree, you can instead start at the parent branch and move from there instead. Another reason for its prevalence in web development is it allows the developer choose a trait and then the DOM will select all branches with that trait.

### Client side

Client side is the end most people are familiar with, whether they know it or not. It's the part the client sees, the design, what the server's response is, and its all in the browser to see. Client side development is all about the web-page after the server has sent it and the page's interaction with the user. JavaScript, html, and css, are the holy trinity of client side development and allow for dynamic pages without consulting the server, but rather relying on your browser for dynamic elements.

### Server side

Server side development though is about what happens to the page before the page is even sent client side. It can be used to take a simple html file with a paragraph and then with a server side script stitch it together with a header and a footer. Or, it could take a html template and insert data from a database into the html, all before the client even gets a response.

### Events

Events are objects containing the details of what is happening on the client's side. They can be user events, such as clicking, or events like the page loading. They can concern the entire window of the browser, or just a small button on the website. So when you click-down, scroll, mouse over, hit the space bar, etc… it is an event. Events are constantly occurring whether you know it, loading, moving the mouse, scrolling, it’s truly inescapable.

### JavaScript event listeners

So, we know something about events and I’d bet you could guess what event listeners are. Well they listen for events but, how is this useful in developing websites? and how do they work? First off when you add an event listener you need to tell it three key things, where to listen, what to listen for, and what to do when it hears it. Okay so, where to listen is the ‘thing’ that will have an event happen to it, for example we could have a picture, and when it is clicked, it disappears. In that case the picture is ‘where’ and the ‘click’ is the event, or what to listen for. So the event listener listens for when the picture is clicked and once it is, it does something. Again in this case the ‘something’ it does is simply hiding the image, but this is the framework of how event listeners work. They wait for a event on a specified thing, and then when they hear it, do a chunk of code.

### Window.event

Window.event contains many properties of an event, like if event’s default action is prevented, and the most important part the target. The target being what triggered the event. So window.event’s value is an event, but which event? All of them. The window.event is constantly changing. So, if it’s so finicky how is it useful? Its like an electron, you can know its speed or its position but never both, so if we ‘stop’ the window.event we can know its details/position. To do this we can grab it when the eventListener is doing the last part of its role, executing code, and then we have it stored along with all of its data. Then we can see if the user was holding down the spacebar while clicking, and if so we can augment what happens based on the details of that click. Window.event allows a developer to get properties of a particular event.

### Tying it together

Those are the basics of dynamic web-pages and how they are dynamic. Lets take a look at all of them in use in the twitter example.

1. The user goes to the site
- Server receives a request for the homepage.
- Server searches for the user in the database and finds them.
- Then finds the first 20-ish posts of who they're following.
- Taking the homepage template it populates the 'feed' area with the posts.
- Finally the response is sent.
2. The page has loaded for the User.
- JavaScript adds a scroll event listener to the page.
3. Now they scroll to the bottom of their tweets.
- The event listener is triggered.
- Listener executes the code which asks the server for more tweets.
- JavaScript receives a response with the new tweets.
- Using the DOM the JavaScript then injects the new tweets below the old tweets.
4. User is now reading the new tweets and is happy.

Using events, the DOM, and both client and server side scripting, makes the example above possible. What I have covered are the bare basics and yet there are some more things I've not mentioned yet. Those things being AJAX and JSON, which are present in the above example and allow for the amazing dynamic pages with content appearing right before your eyes! I'll cover these two things in a future article but, for now enjoy your foundation for dynamic web-pages.

---
title: How to fill text with an image
---
<img src="/assets/images/knockout.png" alt="The word hello using a background as its color.">
Sure solid colors fulfill the basic needs of styling text but, its quite boring. Homogeneous, bland, and with no real emphasis. If you need to really emphasize and grab attention using plain text a great option is using CSS to create a knockout effect. You get to choose an image with intricate details and stimulating patterns to color the text. Let me show you how.

We'll start with creating a HTML and, CSS file. From there go into the HTML head and put a link to our style sheet. Let's also add the text we want to style into our body and give it a class.

```html
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<p class="knockout">Innovative</p>
</body>
</html>
```

Good! This is all the HTML we need to do so now we can start the beautification process. First I'll add some basic styles to make the text stand out a bit.

```css
.knockout{
	font-size: 300px;
	font-weight: bold;
	text-align: center;
	margin: 50px auto;
}
```

Now we will specify the image we want to color our text with.

```css
.knockout{
	font-size: 300px;
	font-weight: bold;
	text-align: center;
	margin: 50px auto;
	background: url(https://lwyrup.github.io/assets/images/paint.jpg) 0px 0px;
}
```

<span>Note:</span> The '0px 0px' after the url control the images position. Feel free to change these if you want a certain part of the image shown.
{:.callout}

Now we have a background but, the text is a solid color and now the surrounding area is just all image. In order the create the desired effect we will make use of two properties. The first is -webkit-text-fill-color. This will allow us to set the text color, while allowing for a fall back color.

<span>Note:</span> This effect, while cool, can have browser compatibility issues. So, provide fall backs and be careful in using this effect.
{:.callout}

Our second property is the magic maker, it is the -webkit-background-clip property. This allows use to specify when the background clips with something then show it. In our case we want to background to appear when we clip into the text.

Lets add our properties but also provide a fall back color for our text.

```css
.knockout{
	font-size: 300px;
	font-weight: bold;
	text-align: center;
	margin: 50px auto;
	background: url(https://lwyrup.github.io/assets/images/paint.jpg) 0px 0px;
	/* fall back color */
	color: aqua;
	-webkit-text-fill-color: transparent;
	-webkit-background-clip: text;
}
```

It should come out looking like this.

<p style="font-size: 8em;
	font-weight: bold;
	text-align: center;
	margin: 50px auto;
	background: url(/assets/images/paint.jpg) 0px -200px;
	/* fall back color */
	color: aqua;
	-webkit-text-fill-color: transparent;
	-webkit-background-clip: text;">
	Think
</p>

Tada! Now you have some nifty looking text that is sure to grab some eyes. Just be sure that you account for browser compatibility issues and you'll be golden.

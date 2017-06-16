---
title: "Simple iOS development using Xamarin"
image: "/assets/images/.png"
---
What is Xamarin.

In todays world almost everyone has a smart phone of sorts, be it an Apple, Android, or Windows device. Its a large part of our everyday lives, from alarm clocks, to planners, to e-mail, and much more. These applications on our phones range from banking to gaming, and I'm going to teach you how to build a simple comic book store app using Xamarin.

What is Xamarin? Xamarin is a mobile app development platform that allows you to write native iOS, Android, and Windows applications using a C#/.NET code base. This code base allows developers to reuse code when creating one app for different mobile platforms, as opposed to rewriting the entire app three times. All while allowing you access to the underlying platform's APIs and build native user interfaces. This is how we're going to create our app.

### What you'll need to get started
To get the ball rolling you'll need [Visual Studio](https://www.visualstudio.com/vs/mobile-app-development/), now you have your IDE and Xamarin. That's right Xamarin comes with all editions of Visual Studio for free now!

<span>Note: </span>If you're not developing on a Mac, you'll need a networked Mac to provide the build. Admittedly I know little about the solutions, but [this](https://www.google.com/search?q=xamarin+ios+using+vm&rlz=1C5CHFA_enUS740US740&oq=xamarin+ios+using+vm&aqs=chrome..69i57j0j69i60.6301j0j4&sourceid=chrome&ie=UTF-8#q=xamarin+ios+without+mac) should give some helpful direction.

Last thing you'll need is Xcode for the simulator and the snazzy storyboard editor.

### Getting started

So let's say we're creating an app for a comic shop, called Comical Delights. The app, upon opening, will show a main menu with two options; browse comics, and find Comical Delights. When the user clicks the browse option he'll be taken to a list page of the comics, and when a single comic in that list is clicked it will show a detail page. The detail page will show the name, issue number, issue description, and the store's price. When find Comical Delights is clicked it will bring up a map for the user, showing the location of the store. With our app now briefly laid out we can begin. 

### Creating a PCL

Before we touch the ios application we're going to start easy with a portable class library. What is a portable class library? Well a PCL allows you to write assemblies that work on more that one .NET platform and create classes that you want to share across projects. So if we were to make an Android version we could just reuse our PCL instead of rewriting the business layer. Lets get cracking.

Now in Visual Studio create a new solution using the Portable Library template, this will be the project that houses our business logic. Name the project 'ComicalDelights.Core' and the solution 'ComicalDelights'. Now delete the MyClass class and create the Models folder, here we'll house data layout details for our Comic and ComicSeries classes. On the models folder add a new file using the empty class template, and name it Comic.cs.

Now we'll define all the properties of a comic we're going to be using. So we'll need a comicId, imagePath, title, issue number, issue description, and a price.

```csharp
using System;

namespace ComicalDelights.Core.Models
{
    public class Comic
    {
        public int comicId
        {
            get;
            set;
        }

        public string imagePath
        {
            get;
            set;
        }

        public string title
        {
            get;
            set;
        }

        public int issueNumber
        {
            get;
            set;
        }

        public string issueDescription
        {
            get;
            set;
        }

        public double price
        {
            get;
            set;
        }

        public Comic()
        {
        }
    }
}
```

With the properties of a comic defined we'll now define the properties of a ComicSeries. We'll need a unique identifier, a series title, and a list of comics in that series.

```csharp
using System;
using System.Collections.Generic;

namespace ComicalDelights.Core.Models
{
    public class ComicSeries
    {
        public int comicSeriesId
        {
            get;
            set;
        }

        public string seriesName
        {
            get;
            set;
        }

        public List<Comic> comics
        {
            get;
            set;
        }

        public ComicSeries()
        {
        }
    }
}

```

Presto we have our simple models defined! For the sake of simplicity we are going to store our Comic and ComicSeries data into our code. Make a folder called 'Repository' and inside that a new csharp class called ComicRepository.cs. This will be our database layer, responsible for getting our data. This class is going to have a collection of methods that we use to query our data, and a single variable to act as our database. We will want methods for getting all comics, one comic by id, all series, and one series by id.

```csharp

```


### Creating the first app view

### The comic details view

### Table views

### Sending data from one view to another


### Footnotes
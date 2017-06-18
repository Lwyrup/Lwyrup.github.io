---
title: "Simple iOS development using Xamarin"
image: "/assets/images/.png"
---
In todays world almost everyone has a smart phone of sorts, be it an Apple, Android, or Windows device. Its a large part of our everyday lives, from alarm clocks, to planners, to e-mail, and much more. These applications on our phones range from banking to gaming, and I'm going to teach you how to build a simple comic book store app using Xamarin.

What is Xamarin? Xamarin is a mobile app development platform that allows you to write native iOS, Android, and Windows applications using a C#/.NET code base. This code base allows developers to reuse code when creating one app for different mobile platforms, as opposed to rewriting the entire app three times. All while allowing you access to the underlying platform's APIs and build native user interfaces. This is how we're going to create our app.



### What you'll need to get started

To get the ball rolling you'll need [Visual Studio](https://www.visualstudio.com/vs/mobile-app-development/), now you have your IDE and Xamarin. That's right Xamarin comes with all editions of Visual Studio for free now!

<span>Note: </span>If you're not developing on a Mac, you'll need a networked Mac to provide the build. Admittedly I know little about the solutions, but [this](https://www.google.com/search?q=xamarin+ios+using+vm&rlz=1C5CHFA_enUS740US740&oq=xamarin+ios+using+vm&aqs=chrome..69i57j0j69i60.6301j0j4&sourceid=chrome&ie=UTF-8#q=xamarin+ios+without+mac) should give some helpful direction.

Last thing you'll need is Xcode for the simulator and the snazzy storyboard editor.



### Getting started

So let's say we're creating an app for a comic shop, called Comical Delights. The app, upon opening, will show a list page of the comics, and when a single comic in that list is clicked it will show the detail page for that comic. The detail page will show the name, issue number, issue description, and the store's price. With our app now briefly laid out we can begin. 



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

Presto we have our simple models defined! For the sake of simplicity we are going to store our Comic and ComicSeries data into our code. Make a folder called 'Repository' and inside that a new csharp class called ComicRepository.cs. This will be our database layer, responsible for getting our data. This class is going to have a collection of methods that we use to query our data, and a single variable to act as our database. We will want methods for getting all comics, one comic by id, all series, and comics of a single series.

```csharp
using System;
using ComicalDelights.Core.Models;
using System.Collections.Generic;
using System.Linq;

namespace ComicalDelights.Core.Repository
{
    public class ComicRepository
    {
        public ComicRepository()
        {
        }

        public List<Comic> getAllComics()
        {
			IEnumerable<Comic> comics =
			 from comicSeries in comicDatabase
			 from comic in comicSeries.comics
			 select comic;
			return comics.ToList<Comic>();
        }

        public Comic getComicById( int id )
        {
			IEnumerable<Comic> comics =
			 from comicSeries in comicDatabase
			 from comic in comicSeries.comics
             where comic.comicId == id
             select comic;
            return comics.FirstOrDefault();
        }

        public List<ComicSeries> getAllComicSeries()
        {
            return comicDatabase;
        }

        public List<Comic> getComicsBySeries(int id)
        {
            var group = comicDatabase.Where(s => s.comicSeriesId == id).FirstOrDefault();
            if (group != null)
            {
                return group.comics;
            }
            return null;
        }

        public List<ComicSeries> comicDatabase = new List<ComicSeries>()
        {
            new ComicSeries()
            {
                comicSeriesId = 1,
                seriesName = "X-Men",
                comics = new List<Comic>()
                {
                    new Comic()
                    {
                        comicId = 1,
                        imagePath = "comic1",
                        title = "If Iceman should fail..!",
                        issueNumber = 18,
                        issueDescription = "Professor X, Angel, Cyclops, and Marvel Girl have all been defeated by Magneto, who put the team into a high altitude hot-air balloon, hoping that his hated foes would perish once it reaches its destination of 100,000 feet. Magneto revels over the victory, magnetically lifting the mansion out of its foundation. He then decides to use the mansion as his own base of power then sets the house back down to the ground. Entering the residence of his hated foes, he then uses his magnetic powers to destroy Cerebro. However, his destruction is interrupted when the Worthingtons -- Warren's parents -- arrive for a visit. Magneto confronts them at the front door and uses magnetic hypnotism to put them under his thrall, ordering them to go sleep upstairs in the upper bedrooms. Magneto then comes to realize that one of the X-Men -- Iceman -- is missing, and waits for him to return to the mansion so that his revenge can be complete. Magneto boasts how Iceman is the weakest of all the X-Men.",
                        price = 4.00
                    },
					new Comic()
					{
						comicId = 2,
						imagePath = "comic2",
						title = "The End of the X-Men!",
						issueNumber = 46,
						issueDescription = "The X-Men have returned to the grave of the late Professor Xavier to pay their respects, each member lost in thought over what the Professor meant to them and what the future of the X-Men will be. Their vigil is interrupted by FBI agent Duncan, who has come to speak with the X-Men. Returning to the Professor's mansion, Nelson & Murdock co-partner Foggy Nelson is on site to read Xavier's will. To everyone's surprise, all of the Professor's assets have been willed over to Scott for the operation of a special charitable fund, also naming the other students as trustees, leaving behind all his possessions to them. After the will reading is completed, Foggy leaves to put the will through probate, allowing for the X-Men to return their attention to Agent Duncan who wishes to discuss an important matter with them.",
						price = 3.50
					},
					new Comic()
					{
						comicId = 3,
						imagePath = "comic3",
						title = "City of Mutants",
						issueNumber = 50,
						issueDescription = "With Iceman and Lorna Dane captured, Mesmero takes them to his secret \"City of Mutants\", the staging ground for his mutant militia. There, Iceman is imprisoned while Mesmero's scientists work to awaken Lorna's latent mutant powers. Meanwhile, the other X-Men have stormed Mesmero's San Francisco mansion to find opposition from his Demi-Men who easily defeat the group with a special gas apparently created by Magneto himself. With the X-Men downed, the squad leader of the Demi-Men orders them taken to the Mutant City.",
						price = 3.30
					}
                }
            },
            new ComicSeries()
            {
                comicSeriesId = 2,
                seriesName = "The Walking Dead",
                comics = new List<Comic>()
                {
                    new Comic()
                    {
                        comicId = 4,
                        imagePath = "comic4",
                        title = "The Whisperer War part 1 of 6",
                        issueNumber = 157,
                        issueDescription = "The survivors have set up checkpoints that different subgroups guard and keep clear. A week has passed since Negan went missing. Dwight, Laura, Magna, and Heath are monitoring a checkpoint when they spot Negan, who has a bit of stubble growing on his face. Dwight wants Magna to shoot him immediately, but she refuses. When it is clear that he is unarmed and not hostile, they agree to take him back to Rick.",
                        price = 7.88
                    },
					new Comic()
					{
						comicId = 5,
						imagePath = "comic5",
						title = "The Whisperer War part 4 of 6",
						issueNumber = 160,
						issueDescription = "Vincent is still making his way back from the Sanctuary when he comes across a roamer. Too tired to fight, he begins to panic until Heath arrives on horseback and kills the roamer. Vincent climbs on the horse and they ride off.",
						price = 7.88
					}
                }
            },
            new ComicSeries()
            {
                comicSeriesId = 3,
                seriesName = "Batman 2016",
                comics = new List<Comic>()
                {
					new Comic()
					{
						comicId = 6,
						imagePath = "comic6",
						title = "NIGHT OF THE MONSTER MEN part 4",
						issueNumber = 8,
						issueDescription = "The giant monsters might be bad, but Gotham’s heroes encounter a whole new threat level when two of their own start terrorizing the city! Batman must face the horrifying possibility of losing two of his closest allies to Hugo Strange’s vicious attack.",
						price = 2.99
					},
					new Comic()
					{
						comicId = 7,
						imagePath = "comic7",
						title = "STREETS AND SWAMPS",
						issueNumber = 15,
						issueDescription = "Swamp Thing comes to Gotham City with a mysterious request for Batman—but these longtime allies will have to make up for lost time and work together in order to confront a growing threat that only they can stop!",
						price = 2.99
					}
                }
            }
        };
    }
}
```

Now we have our data and methods by which to access, and filter our data. Last thing we're going to do is create a service to further abstract our database layer and make specific methods. Our service methods will be simple and clear methods for data retrieval. So start with a service folder and in there create the ComicService.cs file. Now let's create our methods.

```csharp
using System;
using System.Collections.Generic;
using ComicalDelights.Core.Models;
using ComicalDelights.Core.Repository;

namespace ComicalDelights.Core.Service
{
    public class ComicService
    {
        ComicRepository comicRepository = new ComicRepository();
        public ComicService()
        {
        }

        public List<Comic> getAllComics()
        {
            return comicRepository.getAllComics();
        }

        public Comic getComicById(int id)
        {
            return comicRepository.getComicById(id);
        }

        public List<ComicSeries> getAllComicSeries()
        {
            return comicRepository.getAllComicSeries();
        }

        public List<Comic> getComicsBySeries(int id)
        {
            return comicRepository.getComicsBySeries(id);
        }

        public List<Comic> getSeriesX_Men()
        {
            return comicRepository.getComicsBySeries(1);
        }

        public List<Comic> getSeriesWalkingDead()
        {
            return comicRepository.getComicsBySeries(2);
        }

        public List<Comic> getSeriesBatman2016()
        {
            return comicRepository.getComicsBySeries(3);
        }
    }
}

```

As you can see most of the methods are similar to the methods in the repository, except a few. The last three are specific and make things easy on us. Rather than relying on memorizing the ids we can write a method, name it specifically, write the method call with the id once, and be done with that number forever.

Alright, so now we've got our PCL written and all that is left is to bring it together in our iOS application.



### Setting up our iOS application

Now in your solution explorer close the ComicalDelights.Core project, you won't need to be in there anymore. Now we'll add the actual iOS project to our solution by left-clicking the solution and adding a new project. Select the Single View App template, name it ComicalDelightsIOS, deselect the iPad under devices, and keep everything else the same.

Now once the project is generated you'll have a number of files there. There are plist files named info and entitlements, these are settings about your app. Info is information about the app's name, icons, build number, and so on. Entitlements are various additional services you can use in you application. The main.cs file is the application entry point, calls the app delegate, which lives in AppDelegate.cs, and uses UIKit. UIKit is a namespace found under Xamarin.iOS which is an API that is used to generate user interfaces in our app. Responding to application events is the primary purpose of the app delegate and as you can see there are some overridden methods with descriptions in them. Then there are the .storyboard files, these are the actual view you'll see on the device running the application. We have a ViewController.cs file which is a class that controls the view it's connected to. In that ViewController.cs there is a ViewController.designer and this is how the view from the story board links to the code in our view controller, this file is auto generated by Xamarin.

With all that out of the way lets see the app working. Press fn + f6 to build and run the solution, if it worked correctly the simulator should have opened up to our blank app. Alright, now that we have our blank application canvas let's create our first view, the Comic details screen!



### Creating the first app view

Before we start we need to add a reference to the business logic we wrote, we do this by clicking on References and selecting edit. Search for our applications .Core project, select it, and press ok to add our PCL.

Now open up the Main.storyboard and look around. In the editor area we have a blank white screen, this a view. There is also a black bar at the bottom that says ViewController, this is the view controller and it contains our view. The entire box with both view and ViewController together is called a scene. A storyboard file allows many scenes and is much like a flow cart of scenes. To the left of the scene theres a gray flag pointer, this indicates the initial scene to be shown. Off to the right of the editor you have your Toolbox and Properties. The tool box is used to add new elements, such as buttons, text, etcetera, and new scenes. Properties allows you to edit the properties of the selected element, whether it be color, font, or the view controller class for a scene. With this basic explanation lets start editing our scene.

First, let's change the color from white by selecting the view and changing Background in the properties. We'll use a light gray hex(#CCCCCC) for the background. Now lets add a image view for the comic, to do this go into your toolbox and find the image view. Drag from the tool box onto your scene, now you can select the image view, resize it, edit properties, and move it around the scene.

<!-- TODO image of scene here -->

Let's give our image view an identifier using the properties. Under identity in properties change the name of the element to comicImage, and now if you open the ViewController.designer file you'll see it created a UIImageView property with the name we just gave our image.

Now back to our storyboard, let's add the rest of the elements to our scene. We'll need three label elements, found in the toolbox, these will be the comic title, issue number, and price. Change the text via properties to 'comic title', 'issue number', and 'price', respectively. Then we'll issue names to the labels comicTitle, issueNumber, and comicPrice. Now we'll add the text view element; this will be the scrollable comic description. Give this text view the name 'issueDescription'.

Lastly we'll add some buttons to the bottom. Change the first buttons text to Cancel, and name it cancelButton. The other will be our Add to cart button, change the text, and name it addToCartButton. With everything present the last thing I'm going to do is use a more descriptive view controller.

Delete the default view controller file, as we won't be needing it, and select the view controller in our scene. Under identity focus on the class field, change the text to ComicDetailViewController, hit enter, and then Visual Studio will create that view controller file for you.

<span>Note: </span>you may have to change something in your scene to update the ComicDetailViewController.designer.



### View meets logic

Now that we have our view, with placeholder values, we can integrate our business logic to replace the placeholders with actual values. Real quick let's add our images folder for our comic covers, we'll do this within the iOS project. Now 'add files from folder' to add the images in visual studio <!-- TODO Feel free to use the images I used here -->. Okay, now we add our logic to our app but, where? Inside our view controller where all scene logic lives.

Open up the ComicDetailsViewController.cs and we first will define a property. This property will be the selectedComic property, where we store the comic instance to be shown in our view. Notice that our ComicDetailViewController inherits from the UIViewController class, that means we have access to the base functionality of that class as well as any additional functionality we define. We can also change the inherited functionality using overrides, we will now use an override to change the ViewDidLoad method we've inherited.

```csharp
using Foundation;
using System;
using UIKit;
using ComicalDelights.Core.Models;

namespace ComicalDelightsIOS
{
    public partial class ComicDetailViewController : UIViewController
    {
        public Comic selectedComic
        {
            get;
            set;
        }

        public ComicDetailViewController (IntPtr handle) : base (handle)
        {
        }

        public override void ViewDidLoad()
        {
            base.ViewDidLoad();
            DatabindUI();
        }
    }
}
```

Now when the view loads, it executes the ViewDidLoad of the base class (the class from which we've inherited) and makes a call to a DatabindUI method. Except DatabindUI is not a method yet, so lets write the method.

```csharp
public override void ViewDidLoad()
{
    base.ViewDidLoad();
    ComicService service = new ComicService();
    selectedComic = service.getComicById(2);
    DatabindUI();
}

public void DatabindUI()
{
    UIImage img = UIImage.FromFile("Images/" + selectedComic.imagePath + ".jpg");
    comicImage.Image = img;
    comicTitle.Text = selectedComic.title;
    issueNumber.Text = selectedComic.issueNumber.ToString();
    comicPrice.Text = selectedComic.price.ToString();
    issueDescription.Text = selectedComic.issueDescription;
}
```

Thanks to our designer file we can simply reference the elements in the scene using their names as variables, and change their properties. I also added an instance of our ComicService in the ViewDidLoad method, and used it to set our selected comic. Now if you run the solution you'll see that the view's placeholders are now actual comic information.

Now that we have relevant information, let's see how we can respond to user events. So in our view controller we need to know how to tell if a button was clicked. Start by creating an AddButtonEvents method, now we can access our buttons via name here. If you look into the buttons you'll see properties, methods, and event handlers, which is what we need. We'll use the TouchUpInside listener for our event. Then all we need is to use a lambda[^1] expression to define the code we want to run upon the click.

```csharp
public void AddButtonEvents()
{
    addToCartButton.TouchUpInside += (sender, e) => 
    {
        // Event code here
    };

    cancelButton.TouchUpInside += (sender, e) => 
    {
        // Event code here  
    };
}
```

Let's say when the user clicks add to cart we want a message to pop up saying 'item(s) added to cart', and when the user clicks the 'ok' button for the message the message then closes.

```csharp
addToCartButton.TouchUpInside += (sender, e) => 
{
    var alert = UIAlertController.Create("Comical Delights", "Comic added to cart.", UIAlertControllerStyle.Alert);
    alert.AddAction(UIAlertAction.Create("Ok", UIAlertActionStyle.Default, null));
	PresentViewController(alert, true, null);
};
```

Call the AddButtonEvents in the ViewDidLoad, and then boot up the app and test it out. When add to cart is clicked the event handler creates a new alert with a title and message, adds an 'ok' action, and then presents the alert to the user. For now we'll only define the addToCart button's event.

Congrats! Our detail view is looking good now. Now we somewhere and someway to list all the comics, this will be done using a new view called a table view.



### Table views

What is a table view? A table view is basically a list with each item in the list being a row or cell. Using a table view we can display all of our comics on a table as a sort of menu. So lets get started.

First you want to add a table view controller from the toolbox into the storyboard. Select the dock of the table and change the view controller to 'ComicTableViewController'. Now click on the cell, the white box towards the top of the scene, and in properties give the cell an identifier of comicCell. Now find the entry flag and ctrl + hold to drag it onto the table. Now our app will start on the table view but, our table is blank currently. To populate our table we'll need a data source.
Let's define our data source class.

### Data source

Begin with a new 'Datasource' folder, and within that folder a new class called 'ComicDatasource'. This will be our custom data source class and we'll start with the bare bones.

```csharp
using System;
using ComicalDelights.Core.Models;
using UIKit;
using System.Collections.Generic;

namespace ComicalDelightsIOS.Datasource
{
    public class ComicDatasource: UITableViewDataSource
    {
        public List<Comic> Comics;
        string CellIdentifier = "comicCell";

        public ComicDatasource(List<Comic> comics)
        {
            Comics = comics;
        }

        public override nint RowsInSection(UITableView tableView, nint section)
        {
            throw new NotImplementedException();
        }

        public override UITableViewCell GetCell(UITableView tableView, Foundation.NSIndexPath indexPath)
        {
            throw new NotImplementedException();
        }
    }
}

```

So, our data source has an array of comics, the cell identifier that we set in our storyboard, and two overrides that we need to define. Currently the overrides are just going to throw an exception, so we'll define those methods. RowInSection will need to return the number of rows, and GetCell should return a cell for a row index.

```csharp
public override nint RowsInSection(UITableView tableView, nint section)
{
    return Comics.Count;
}

public override UITableViewCell GetCell(UITableView tableView, Foundation.NSIndexPath indexPath)
{
    UITableViewCell cell = tableView.DequeueReusableCell(CellIdentifier);
    Comic comic = Comics[indexPath.Row];

    if (cell == null)
    {
        cell = new UITableViewCell(UITableViewCellStyle.Default, CellIdentifier);
    }
    cell.TextLabel.Text = comic.title;
    cell.ImageView.Image = UIImage.FromFile("Images/" + comic.imagePath + ".jpg");
    return cell;
}
```

RowsInSection is understandable but in GetCell it begins by checking if the cell was already created and tries loading it. If it doesn't exist then it creates a new cell. Lastly we define the title and image to view in the table and return the cell.

To get our table working we need to define the source and pass in our comics.

```csharp
using Foundation;
using System;
using UIKit;
using ComicalDelightsIOS.Datasource;
using ComicalDelights.Core.Service;

namespace ComicalDelightsIOS
{
    public partial class ComicTableViewController : UITableViewController
    {
        ComicService comicService = new ComicService();
        public ComicTableViewController (IntPtr handle) : base (handle)
        {
        }

        public override void ViewDidLoad()
        {
            base.ViewDidLoad();
            var comics = comicService.getAllComics();
            var datasource = new ComicDatasource(comics);
            TableView.DataSource = datasource;
        }
    }
}
```

Run the application now and you'll see the table is filled with our comics.



### Segues

Segues are how you move from one scene to another, and will be how we move around our app. Enter the storyboard and select the cell in the table view. Hold ctrl and drag, a line should appear place it on the detail view and let go. Now you've created a segue leading from our cells to the detail view. Add a segue from our cancel button to the table view, and run the application. When running the app click a row and you'll be taken to the detail view. Then test the cancel button just to be sure. The segues work except the rows info doesn't transfer over, thats our next goal. Real quick select the gray segue bubble on the first segue and in properties give it the identifier 'ComicDetailSegue'. This will come into play in a bit.



### Sending data from one view to another

So we need to pass the selected comic into our detail view, or more simply put, we need to define the selectedComic in our detail view controller. This is where the method PrepareForSegue comes into play, this method fires right before the segue occurs. So, what we're going to do is check if the segue is the segue we want, and if so we'll set the selected comic. Open up the table view controller.

```csharp
public override void PrepareForSegue(UIStoryboardSegue segue, NSObject sender)
{
    if (segue.Identifier == "ComicDetailSegue")
    {
        var comicDetailViewController = segue.DestinationViewController as ComicDetailViewController;
        if (comicDetailViewController != null)
        {
            var source = TableView.Source as ComicDatasource;
            var rowPath = TableView.IndexPathForSelectedRow;
            var item = source.Comics[rowPath.Row];
            comicDetailViewController.selectedComic = item;
        }
    }
}
```

Before testing don't forget to remove the following line from your ComicDetailViewController ViewDidLoad method.

```csharp
ComicService service = new ComicService();
selectedComic = service.getComicById(2);
```

Now if you run your app you should see the comic you clicked on is the same shown in the view.

### Summary 

Great! We've accomplished our basic application. We've gone over Xamarin, PCLs, creating views and scenes, using table views, and passing data between views. There are many more things you could do to continue this project some ideas would be adding a navigation controller, adding constraints to your element, or using a modal view for the details view. Those are the few ideas I had. I hope this tutorial was somewhat helpful and not just ramblings of a madman, and thank you for reading.


### Footnotes

[^1]: A lambda expression is an anonymous function that you can use to create delegates or expression tree types.
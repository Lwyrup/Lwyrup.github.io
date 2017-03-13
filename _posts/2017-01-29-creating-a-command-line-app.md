---
title: "Creating a Command Line App with Ruby"
---

Writing a command line application is a great way to add custom functionality to your terminal. I'll show you how to write a command line app using ruby. By the end the program will be able to write things down and then read them from the command line using the application.

### Setup

Begin by entering the terminal and enter 'mkdir notepad' to create the directory for you to work in. 'cd' into the directory and create two files. Make a ruby file named 'take-notes.rb' and then a text file named 'notes.txt'. The ruby file will act as our pen and will write down things into the notepad text file. Now we have a ruby program and a text file and we can begin writing. Open up the ruby file and our text file with the text-editor of your choice and we can begin.

### Reading from a file

Before we write, we should be able to read what we're writing. Well, actually we already know how to read and write (I hope) but, our program has no notion of either. So lets isolate the problem to the reading part and begin in the text file. In the text file write some lines to a poem and then save it, this is what our ruby program will learn to read.

Switching over to the ruby file now we'll read our poem using the 'open' method of the 'File' class and then use 'puts' to output the text to the screen.

```ruby
File.open("notes.txt", "r") do |fileLine|
	while line = fileLine.gets
		puts line
	end
end
```

On the first line we begin by opening the file 'notes.txt' with the 'r' aka the read permission. This reads each line of the text file every time storing the lines text into the variable 'fileLine'. Then on the next line we assign the 'line' variable to the text of the line. This assignment happens for every line read in the text file. If the 'line' is true then it proceeds down to the next line and 'puts' it out to the screen.

<span>Note:</span> Conditionals such as while and if will execute the next line of code as long as they are followed by a truthy value. They skip if the value is instead falsey. In ruby the falsey things are the boolean false and the nil object and everything else is true.
{:.callout}

Now if you head back to the terminal you can enter 'ruby take-notes.rb' to execute the program and your poem should appear in the terminal for you to read.

### Writing to a file

Let's say you were reading your poem and then you realized you'd forgotten the last stanza! While yes you could manually add the stanza lets add write functionality into our program. It begins the same way as the reading with the open method but now we'll use the 'a' permission, a standing for append. This will allow the program to add to the end of the poem. Above our reading code block, let's add the write block, that way we can read after we've written the last line.

```ruby
File.open("notes.txt", "a") do |f|
	f.puts "Walk the deck my Captian lies,\nFallen cold and dead."
end
```

Perfect! Now if you run the ruby program again you should see the new line added to the poem! Viola your magnum opus is complete. But, if you run it again just to read the file you'll see it added a new line again and its the same. Let's program it to only write new lines when we give it new lines. We can do this using the argument vector when calling on the program. For example if you were to enter "ruby take-notes.rb 'yellow lemons'", the string of 'yellow lemons' would then be a argument to the program, and we could access it within our ruby using ARGV[0]. So lets write it then!

```ruby
if ARGV[0]
	File.open("notes.txt", "a") do |f|
		f.puts ARGV[0]
	end
end
```

Now when we run the program it will check the first argument, stored in ARGV[0], and if the argument exists it will continue to the writing block of code. Also it will use the argument and write that into the text file. It works just like this 'ruby take-notes.rb "last line of haiku"' and then my haiku is finished in the notes.txt file.

### Turning your program into a utility

Now we have a perfect program to take notes that you can use from anywher... well, right now you can only use this program in _this_ folder. Don't believe me? Try going up to the parent folder with 'cd ..' and when you try to run the program you'll get an load error.

The first step to achieving a universal application is pretty simple. Whenever you run the program it always starts with 'ruby' this is how you tell the computer to use the .rb file. In our program we can write on the first line 

```ruby
#!/usr/bin/env ruby
```

to specify what (ruby) to use to read the file. Now we need to change the files permissions to allow it to run where ever.

Make sure you are within the 'notepad' directory before proceeding.
{:.callout}

So, enter in the terminal, 'chmod 755 take-notes.rb'[^1] to change its permissions to a more open state. Now, we still have that little .rb hanging on but, simply input 'mv take-notes.rb take-notes' to change to 'take-notes'. Lastly, we need to create a wormhole, so to speak, so when 'take-notes' is called it finds the program. Enter 'ln -s $PWD/take-notes /usr/local/bin/'[^2] and now you can just type 'take-notes' to run it regardless of where you are.

The last thing you'll need is to specify the absolute path[^3] to the text file. Open up the ruby file and change 'notes.txt' to '/users/your-name/notepad/notes.txt'. Now just like the ruby program the text file will be locatable within the ruby program.

### Conclusions

So, O Captain! my Captain! our fearful trip is done, and you've learned how to write a program with ruby, make that program into a command line app, read a file, and write to a file. As always you can improve upon this, you could make it remove a single line, remove all the lines, or program it to write to multiple files. The sky is the limit!

[^1]:Chmod 755 sets the permissions for the file owner, the group, and other users. Permission 7 for the file owner allows the program to read write and execute and is the highest permission. Permission 5 for the group and other users, allows the program to read and execute.

[^2]:Ln creates a link that refers to another file and the -s flag makes the link symbolic.

[^3]:The absolute path contains the root directory and all other subdirectories in which a file or folder is contained.

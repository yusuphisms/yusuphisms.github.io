---
layout: post
title: Setting Persistent Virtual Environment Variables
date: 2019-06-25 05:33
author: Yusuph Mkangara
comments: true
categories: [Python]
---
Reviving ye ole blog with a non-analytical piece. Summer of Data Science is back again -- follow along and join us on Twitter <a href="https://twitter.com/hashtag/SoDS19?src=hash" target="_blank" rel="noopener">#SoDS19</a>

<strong>TL;DR</strong>

In the virtual environment scripts (<em>bin</em> or <em>Scripts</em> directory), find the <em>activate</em> (Linux/macOS) and <em>activate.bat</em> (Windows) files. Toward the bottom of the files, (but before :END line in .bat file) add the lines in these formats:
<ul>
	<li>For <em>activate</em> file: export ENV_VARIABLE="s7r1n9"</li>
	<li>For <em>activate.bat</em> file: set "ENV_VARIABLE=s7r1n9"</li>
</ul>
<!--more-->

<strong>Prose</strong>

I started off #SoDS19 pretty excited and I think I still am roughly 3-4 weeks in so that's super encouraging. I was writing a Python wrapper for a Java package but it may have a bug with native C++ code and I'm having some trouble fixing it. I sent in a request to the SDK providers to see if they can help me debug what might be going on under the hood.

Since that's on pause, I decided to do something else on my list and that was to finish a Flask App. While trying to write a wrapper for Java, I had to Google and learn quite a bit about Java and although I know I should have documented those things for future me, I've been making out the unwritten post to be bigger than it is. So as a way of pushing myself to do simple short pieces, here's something that came up today that I thought I could write future me a concise note that I might edit again later.

My Flask app uses some sensitive arguments and I'm trying to set them up as environment variables to make sure I don't accidentally push them to GitHub. I have a virtual environment set up for the app and wanted to set these sensitive variables once and not have to worry about them unless I needed to make some edits. In the spirit of transparency about the learning process, I didn't magically Google once and immediately find the right answer.

I tried a couple of resources (<a href="https://help.pythonanywhere.com/pages/environment-variables-for-web-apps/" target="_blank" rel="noopener">this</a> and <a href="https://pybit.es/persistent-environment-variables.html" target="_blank" rel="noopener">this</a>) that suggest python-dotenv. Directions seem short and sweet. It just wasn't working for some reason. Normally, I'd tinker with it some more to see what I was missing, but honestly I wasn't happy with this solution. I'm working off the Flask Web Development book and Grinberg suggests that we can set persistent environment variables using bash (albeit Grinberg's solution seems to have a more global scope than preferable). I've never written a bash script but even the python-dotenv sources hint at bash being a good solution. So I hit up Google again and searched "set up <em>persistent</em> environment variables in virtual environment python".

I'm liking the answers I'm finding here. A couple more keyword scrambling ("initializing", etc.) and I find <a href="https://stackoverflow.com/a/39056653" target="_blank" rel="noopener">this StackOverflow answer</a> which leads me to editing the activate file. Editing the activate file felt like a good idea because I know it's the file I use to activate the virtual environment in the terminal. If I can get my environment variables set up at the same time that I'm opening my virtual environment, every time, then this is exactly what I'm looking for to save myself a few steps down the line. I do the editing, I make sure I'm not trying anything fancy with the syntax, and I go through the process of activating my environment and the environment variables don't get set as expected. Something is missing but it's unclear what. A little more sleuth Googling and I find this <a href="https://stackoverflow.com/a/27536692" target="_blank" rel="noopener">StackOverflow answer</a> which mentions activate<em>.bat</em>. Apparently, you have to set the variables in the activate.bat file (and maybe only that file?) for them to be set in the environment. This appears to be a step that is uniquely Windows and to confirm my understanding, I'd have to run on another OS. In addition, I try to take a quick glance at the <a href="https://virtualenv.pypa.io/en/stable/userguide/" target="_blank" rel="noopener">documentation for virtualenv.</a> And ah, there was my knowledge gap. Although I call the path to activate to set up my environment, the script that gets run on Windows is actually the .bat file: <em>"Based on your active shell (CMD.exe or Powershell.exe), Windows will use either activate.bat or activate.ps1 (as appropriate) to activate the virtual environment"</em>.

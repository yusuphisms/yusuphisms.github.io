---
layout: post
title: Running Running and Running Running
date: 2018-07-06 16:23
author: Yusuph Mkangara
comments: true
categories: [garmin, Hardware, R, running]
---
One semester in college, I walked past the basement where unwanted goods are often stored. I am definitely always in need of more unwanted tech much to the dismay of family and friends. However, one time I walked by and saw a <a href="https://www.amazon.com/Garmin-Forerunner-Receiver-Discontinued-Manufacturer/dp/B000CSWCQA/ref=sr_1_2?ie=UTF8&amp;qid=1530841957&amp;sr=8-2&amp;keywords=forerunner+305">Garmin Forerunner 305</a> - a GPS enabled exercise watch. It's clunky, but almost in mint condition. I charged it back up and strapped on the heart rate monitor (the real prize here!). I only lamented that due to its age, the Forerunner was not compatible with Garmin's mobile data sync technology. I thought I'd be forced to just use the desktop version of the software with very little customization. Happy to say that I've since re-engaged with R and Python, and have now freed the data and got it running for me.<!--more-->

As always, I'll be talking in more details about the process for <a href="https://github.com/yo-my-bard/R-Analyses/blob/master/Garmin/GarminRun.R">this code in my GitHub account.</a>

This will be a short one since the script is short and I just want to talk overall about the process as there is not much analysis going on here. I was inspired by this older package <a href="https://cran.r-project.org/web/packages/cycleRtools/cycleRtools.pdf">cycleRtools</a>. When you first download the Garmin file, it offers file types that I had never seen before, namely .tcx. I quickly Googled it - learned it was kind of like an XML file which gave me hope, but then I Googled it to see if an R package for handling such data already existed and cycleRtools was the closest that I found. I tried its read_tcx() function and it did mostly well, but returned NA for crucial data and data that I was sure was contained in the file (BPM, Lat, Lon, etc.)

I had not worked with XML files before (definitely #teamJSON), but luckily R has a nice XML wrangling package in XML2. From here in, it was pretty much a data structure game. I went through many of the functions in XML2 to get a better understanding of terminology: node sets, parents, children, attributes, etc. None were wildly new having worked slightly with Javascript and the DOM, but orientation to this new idea took some experimentation. Truthfully, I probably got frustrated that I was finding imperfect solutions, because surely someone out there had a much better solution from my problem that they already implemented. It took a while before I paused from skipping ahead, and considered what a possible solution could be and how I can implement that. While imperfect, the current solution works and I was able to extract the data from XML to tibble format making it ready for more complex data wrangling and analysis.

<img class=" size-full wp-image-77 aligncenter" src="https://elimumwalimu.files.wordpress.com/2018/07/july4.png" alt="july4" width="500" height="525" />

In conclusion, here are some wins:
<ol>
	<li>Unlocked a potential source of data from third party software/hardware "the long way".</li>
	<li>Wrangled from XML to tibble</li>
	<li>Explored two packages' functionality and adapted to my needs</li>
</ol>
And my favorite part, some great potential growth areas:
<ol>
	<li>Coming from Python, for loops are more natural than purrr's suite of functions. Using map() to grab the values in the same position of the list of lists felt good, but the for loop here suggests I'd benefit by progressing through <a href="http://r4ds.had.co.nz/introduction.html">R4DS</a> and finding comfort with purrr.</li>
	<li>The script could potentially grow into a set of functions for analysis, plotting, etc. A great opportunity to try and create a package around it. Turns out, however, updated and great alternatives already exist: <a href="https://cran.r-project.org/web/packages/trackeR/index.html">trackeR</a> and maybe <a href="https://github.com/jmackie/elpatron">elpatron</a> (by the <a href="https://github.com/jmackie">same author</a> of cycleRtools) to name only two! It might still be a good learning experience to do a lightweight version without the bells and whistles and use their packages as learning tools.</li>
</ol>

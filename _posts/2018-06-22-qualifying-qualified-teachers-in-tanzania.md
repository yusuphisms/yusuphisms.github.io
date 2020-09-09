---
layout: post
title: Qualifying Qualified Teachers in Tanzania
date: 2018-06-22 03:19
author: Yusuph Mkangara
comments: true
tags: [Education, R, teachers]
---
It's been longer than I expected since my last post (I try to do one per month). But I promise, I've been hustling and have some "unpublished" (read: unblogged) work in the works. For this analysis, I downloaded data from <a href="http://opendata.go.tz">opendata.go.tz</a> related to secondary education. I wanted to employ some concepts from <a href="http://r4ds.had.co.nz/">R for Data Science's</a> first section - mainly piping and visualizations! I didn't really have a preference for the data I worked with, but I chose to stick to my love of education statistics from Tanzania. For this post, we'll look at a relatively <a href="http://opendata.go.tz/dataset/29a40037-74a7-4c75-ab07-0ecf6e26e32a/resource/f5cd790c-49db-4dfc-bc44-3ced67c6975a/download/Consolidated-Secondary-Data-with-grade.csv">small data set</a> that offers some insight on secondary school pass rates and the teacher population. <!--more-->

As always, please find the full R code on my <a href="https://github.com/yo-my-bard/R-Analyses/tree/master/Qualified_Teachers">GitHub account here</a>.

To preface this post, I was first introduced to R as a Freshman in an undergraduate statistics course. In short and to save a lot of tears: it was tough. Nothing really clicked when it came to programming with the language. It reared its head again my Junior year in a sociological context, and it still wasn't clicking even though I loved the subject matter and was excited to give it another try. I think this deserves its own post so I will say here only that the combination of statistics (math) and not giving myself the proper time to really struggle with it ultimately did me in.

The number one thing that drew me to learn R again is its powerful visualization toolkit and the flood of <a href="https://twitter.com/hashtag/rstats?src=hash">#rstats</a> love on Twitter. I confess to avoiding visualizations in Python because matplotlib just isn't as intuitive for me even though I feel good about where I am with wrangling data in Python. But with R things are different. With just 5 lines of very readable-to-me code, here's a quick bar chart showing number of schools that had less than 40 or more than 40 candidates at the school. (I will post images, but refer to the GitHub account for the actual R script!)

<img class=" size-full wp-image-64 aligncenter" src="https://elimumwalimu.files.wordpress.com/2018/06/blog1.png" alt="blog1" width="500" height="492" />

It's beautiful, it's functional. Nothing fancy, but an effective visual aid. I cannot say it enough, but I owe it to Python that coding in R isn't as daunting anymore. It took me months to work through things in Python (still does kinda?). I understood the syntax needed to create this plot in a matter of one read-through of the section of the book.

Let's get to the meat of this post. This data claims to have a metric for "qualified teachers". I spoke with <a href="https://twitter.com/e_nkunga">@e_nkunga</a> and we both agreed that we don't really know what it means to be a qualified teacher in Tanzania. More research will need to be done to get a sense for what this could possibly mean. Initial thoughts include having a specific diploma.

We can add some more complexity to our visualization. Tanzanian schools are either run by the national government or privately. With just a few lines of R code, we can create a powerful visualization that showcases the effect of increasing the proportion of unqualified teachers in a school with the passing rate in 2016.

<img class=" size-full wp-image-65 aligncenter" src="https://elimumwalimu.files.wordpress.com/2018/06/blog2.png" alt="blog2" width="600" height="589" />

A lot of the data was concentrated on the extreme - that is many schools reported 0% unqualified teachers. We'll return to that momentarily. This plot gets us close to answering whether having more unqualified teachers affects student pass rates. It doesn't seem like there is any clear trend between these variables (One could argue that government schools are trending down). The average pass rate for private schools was much higher than public schools, but the proportion of unqualified male or female teachers had no real effect on how well the students did.

Similar inconclusive trends exist when considering the proportion of all teachers (below). For private schools, the trend appears to be negative, but overall no crazy drop offs in performance despite an increasingly "unqualified" teacher population at a school.

<img class=" size-full wp-image-66 aligncenter" src="https://elimumwalimu.files.wordpress.com/2018/06/blog3.png" alt="blog3" width="600" height="590" />

Now I previously mentioned the reported 0% unqualified teachers - let's return to this phenomenon. What if we wanted to know, on average, how is the proportion of unqualified teachers different for government vs. non-government schools?

<img class=" size-full wp-image-67 aligncenter" src="https://elimumwalimu.files.wordpress.com/2018/06/blog4.png" alt="blog4" width="550" height="541" />

On average, private schools have almost 4 times more unqualified female teachers, and almost 5 times unqualified male teachers. When using medians, a statistically more robust measure, things get kinda strange.

<img class=" size-full wp-image-68 aligncenter" src="https://elimumwalimu.files.wordpress.com/2018/06/blog5.png" alt="blog5" width="550" height="541" />

There are far more 0s in the vectors than one would reasonably expect! But we can make sense of this strangeness. Part of the survey design was that schools self-reported their numbers of qualified teachers. When counting the distribution of answers you can begin to suspect a human's hand in the data (note the 0, 1, .25, .33, .5, etc. in the <em>prop</em> column).

<container style="display:flex;flex-wrap:wrap;justify-content:space-between;align-content:space-between">
	<img class=" size-full wp-image-68 aligncenter" src="https://elimumwalimu.files.wordpress.com/2018/06/blog6.png" alt="blog6"/>
	<img class=" size-full wp-image-68 aligncenter" src="https://elimumwalimu.files.wordpress.com/2018/06/blog7.png" alt="blog7"/>
</container>

Many schools reported that all their teachers are "qualified". With no clear sense of what it means to be qualified and likely no validation/confirmation process by the government, there is a hidden incentive to claim all of the school's teachers are qualified
even if this may not be true. On the topic of inaccurate data, note how high the number of NaNs are for female teachers. Several explanations could hold water for these missing values and none are particularly encouraging:
<ul>
	<li>There are actually no female teachers at this school (NaNs == 0),</li>
	<li>Female teachers are purposefully unaccounted for (invisible women?), or</li>
	<li>Poor data collection.</li>
</ul>
<h3><strong><em>Conclusion</em></strong></h3>
It could be encouraging to think that in a typical Tanzanian secondary school classroom, teachers are more often than not qualified. Alternatively, if we assume these numbers are accurate and that teachers are qualified as reported, then the current means of qualifying teachers is not an effective barometer for the quality of teaching. I find the latter conclusion to be unnecessarily cynical. A more optimistic, though still challenging conclusion, is that placing good teachers in the classroom is not enough. There are still uncaptured challenges for schools to overcome in order to close achievement gaps. We don't have enough data (here) to describe how students in private vs. public schools differ, but one can imagine that those differences may account for a good portion of the notable difference in average passing rate in 2016 between the two types of schools. In short, we have more work to do and I hope to contribute to the process someday.

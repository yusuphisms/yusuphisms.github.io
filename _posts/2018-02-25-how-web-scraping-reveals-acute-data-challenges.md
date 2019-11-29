---
layout: post
title: How Web Scraping Reveals Acute Data Challenges
date: 2018-02-25 07:08
author: Yusuph Mkangara
comments: true
categories: [data, development, Education, Python, scraping, tanzania]
---
Needing a centralized location for Tanzanian education data and national exams data, I built a web scraper in Python to collect the data. I describe my experience in this post as well as future steps. <a href="https://github.com/yo-my-bard/Scraping-NECTA">Here is the scraper's GitHub repository</a>.

One of the first challenges I had while trying to understand the education landscape in Tanzania is the lack of organized data. I recently read <a href="https://medium.com/data-zetu/the-african-data-story-8527d6daadf9">an article on DataZetu's Blog</a> by <a href="https://twitter.com/J4Mtambalike">Jumanne Rajabu Mtambalike</a> that succinctly describes my sentiment:
<blockquote>Those who need data don’t have it. Those who have it don’t use it.</blockquote>
I might even add that "those who have it are not making access to it as friendly as possible". <!--more-->In this regard, I think the efforts of the government could drastically improve. This does not necessarily mean creating complex APIs for developers (à la <a href="https://developer.whereismytransport.com/">WhereIsMyTransport</a>). It could mean something as simple as switching out PDFs for CSVs early and often. It is a drain on time and resources to have to take data out of PDFs. CSVs and other data-friendly formats can improve the data usage experience for all. It certainly would make the subject of this post no longer relevant.
<h3><strong>NECTA and Student Test Results</strong></h3>
In the page for <a href="https://elimumwalimu.wordpress.com/home/education-resources/">Education Resources</a>, I noted that one could find <a href="http://www.necta.go.tz/psle_results">NECTA Results</a> for national examinations on their webpage. Although the data exists, it is embedded into HTML pages - for every single school in Tanzania. I get it - the use case for this website is families needing access to their students' grades (hence why the data is not anonymized). I would appreciate another option for analysts.

[caption id="attachment_44" align="aligncenter" width="730"]<img class="wp-image-44 size-large" src="https://elimumwalimu.files.wordpress.com/2018/02/screen-shot-2018-02-25-at-1-31-55-am.png?w=730" alt="" width="730" height="134" /> NECTA PSLE Data as it Appears on Webpage[/caption]

My original idea was to go through and copy-paste everything. Not kidding. And I did that once for about 20 schools for a college paper. Needless to say, past me's analysis could be much stronger knowing what I know now. Perhaps, I'll dig that paper up and revisit the analysis soon. I cringe at the thought of someone copy-pasting values for over 1000 schools and to have to reformat the document. Thank goodness for Python.
<h3><strong>Using Python to Automate and Collate Data</strong></h3>
I learned Python due to its ease syntactically and open-source availability. I was first introduced to coding using C# and .NET Framework actually. While I remember very little of it since then, I was happy to jump back into programming recently. When I did that aforementioned college paper, we were using R and not having quality data to maximize R was a real bummer.

Lately, my work has focused on preparing and cleaning the data more than analyzing it for insights. I am letting my questions and interests guide me. To that end, with this particular project I had these goals in mind:
<ol>
	<li>A practical use for Python - what can I make using my skills in Python?</li>
	<li>How can I make the NECTA data accessible and analysis friendly?</li>
</ol>
With the first goal, I was able to put the skills I learned from Udacity's introductory computer science course on display. Loops, data structures, functions to name a few. I could not, however, complete the goal to the extent that I did without also learning how to comb through Google/StackOverflow/edX/Lynda/DataCamp and ask the questions that have been answered in the past. I found neat solutions that I could understand and then implement.

The second goal is deceptively multi-tiered. The data was fragmented into separate webpages and so I created a crawler to go to every webpage and find the data. Luckily, all the data was in a table HTML tag with the same column structure and largely the same cell format. Even though this data is not in a preferable format, it could surprisingly have been worse (I will note the Health data that has presented this issue in a future post).

[caption id="attachment_45" align="aligncenter" width="652"]<img class="wp-image-45 size-full" src="https://elimumwalimu.files.wordpress.com/2018/02/screen-shot-2018-02-25-at-1-32-23-am.png" alt="" width="652" height="183" /> Transformed Data in CSV[/caption]

Using pandas, I combined the dataframes and substituted letter grades for numerical grades. The <a href="https://github.com/yo-my-bard/Scraping-NECTA/tree/master/CompleteDatasets">resultant data</a> is now prepped for simple data exploration tools like histograms and calculations like correlations.

[caption id="attachment_41" align="aligncenter" width="414"]<img class="wp-image-41 size-full" src="https://elimumwalimu.files.wordpress.com/2018/02/hist_calcavg.png" alt="" width="414" height="252" /> Histogram of the Calculated Grade Averages for each student[/caption]

&nbsp;

[caption id="attachment_40" align="aligncenter" width="414"]<img class="wp-image-40 size-full" src="https://elimumwalimu.files.wordpress.com/2018/02/hist_subjects.png" alt="" width="414" height="252" /> Histogram of all the Exam Subjects for PSLE 2014[/caption]
<h3></h3>
<h3><strong>Future Steps</strong></h3>
Ideally, I would present some analyses of the data myself. However, I realize that doing so is a longer process and impedes me from publishing my current work. Ultimately, I want to improve my programming and data analysis skills. I also think about the college kid that did not have readily available data. Knowing that this data could save someone else time and also allow others to build better products is exciting stuff. I originally thought I might want to build something like <a href="http://shulewiki.com/tz">ShuleWiki</a>, but ShuleWiki already exists.

I will explore <a href="https://blog.seanssmith.com/posts/pywren-web-scraping.html">improving the speed of my web scraper</a>. It does the job, but takes too long (not as long as copy-pasting, but there are still gains to be made!) The slowest part of the program is the wait time so that the server isn't overloaded by my IP. I am open to suggestions on ways to increase the speed in an ethically responsible manner.

Look out for the addition of more dimensions in the repository - districts and perhaps latitude and longitude.

If you have other suggestions, questions, or concerns, please comment!

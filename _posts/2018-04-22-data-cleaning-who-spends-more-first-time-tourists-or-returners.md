---
layout: post
title: "Data Cleaning: Who Spends More? First Time Tourists or Returners?"
date: 2018-04-22 18:48
author: Yusuph Mkangara
comments: true
tags: [Python, Tourism]
---
Deviating from my usual focus on education and some health analyses on the side, I wanted to find an interesting-to-me dataset in the government open data portal that I might dive into. In the past, I have been somewhat curious about tourism in the country and whether that market is ripe for innovation. My last grand idea was a one-stop shop for all tourists prior to and during their stay in Tanzania. Turns out <a href="https://itunes.apple.com/us/app/triposo/id467053028?mt=8">Triposo</a> pretty much has that covered. So for now, I tried a more humble approach of asking questions.
<blockquote>Based on the 2014 Tourism Survey, can we determine who spends more while in Tanzania: first time tourists or returners?</blockquote>
<!--more-->

As always, please find <a href="https://github.com/yo-my-bard/TZ-Tourism">my GitHub repository on this here</a>. Go <a href="https://github.com/yo-my-bard/TZ-Tourism/blob/master/TZ_Tourism.ipynb">here for the Jupyter notebook.</a>

Now, this question in itself is not difficult (in fact, it's incredibly easy in one line of Python).  Who spends more? It turns out that <strong>on average, returners spend 2.5 times more money than than first-timers while in Tanzania</strong>. This post will be more about how I approached the cleaning process for this messy dataset before arriving at this conclusion.

Here are the different ways in which this dataset needed to be cleaned before we can answer this question:
<ol>
	<li><strong>Nonsense (Inconsistent) Responses to Unclear Questions?</strong>
<ul>
	<li>When I first took a cursory look at some of the answers in the data, I noticed that some answers did not align or didn't make sense given the answers on other columns. A person who said they travelled with a group did not list the age ranges of other members in the group. So, did they travel alone? Another person who said they travelled alone, listed people in their group. So what gives? Even with the questionnaire in hand, there is no way to make sense of this data with any assumptions. so I dropped most of those columns.</li>
</ul>
</li>
	<li><strong>Clean Responses, But No Variation</strong>
<ul>
	<li>Some columns had clean responses, but all values were the same thus producing zero variation. It added no real value to the dataset for me and I dropped it. (For clarity, these were things like 0s or NaNs, so couldn't even be used to generate new columns).</li>
</ul>
</li>
	<li><a href="https://twitter.com/ElimuMwalimu/status/987965449479606272"><strong>Did Someone Accidentally Find and Replace all 8s with "Others (please specify)"?</strong></a>
<ul>
	<li>This was the wildest experience of my data cleaning life to date. I can understand if all integer values of 8 were turned to a specific value but values like 808 were spared. However, what actually happened is that no 8s were spared. As per my linked tweet example, something like 808s -&gt; "Others (please specify)0Others (please specify)s". Nothing was spared. It was pretty impressive. I wrote functions to correct these errors using some list comprehensions and changing them all to numeric values again instead of strings.</li>
</ul>
</li>
	<li><strong>Lambda Currencies</strong>
<ul>
	<li>Survey asks people to report how much they spent and allows them to use the currency of their choice. Some mark the currency, others do not. Nonetheless, kudos to the survey design, but the actual dataset should use a single currency for calculations. If I were a true Ujamaaist, I would probably advocate using TZS, but realistically USD is a typical convention and the numbers are nicer for it as opposed to being in the millions. I wanted to use the classical switch/case statements here: change the value of this new column to its USD equivalent using this formula if the currency is X or that formula for currency Y. Alas, Python still doesn't support switch/case. Suggestions on StackOverflow were to use a dictionary of currency as the key and the lambda function as the value. A tricky land to survey in the sleep-deprived state I was in, but I managed to brute force through it and was so happy. Functional programming is fun, they said.</li>
</ul>
</li>
	<li><strong>Useful Helper Columns and Dummies</strong>
<ul>
	<li>Hinted a little bit in the previous bullet, but I found that I needed to make some helper columns using (but not deleting) the original features. Norming to USD and counting the total number of travelers based on number of female and number of male were one such example. The latter turns out to have its own 'problems' that will need to be fixed. Sometimes the total is 0 or otherwise inconsistent with other answers. At some point you just have to trust some inconsistencies over others I guess? It could also be by design that some survey participants did not identify their gender as either of the options. Finally, a note on dummies. Columns with binary answers were immediately dummied (this question actually uses one of my dummied features!). My convention for dummying is affirmatives are 1s and negatives 0s. There are still some categorical variables that I have not elected to dummy yet - will do so in the next analyses!</li>
</ul>
</li>
</ol>
And that's about all of the steps I took! I did not really address NaNs or some of the messy string free-responses (my preference was to drop them, but others may find them useful) and this was already quite a labor of love. I am happy that I knew how I wanted to approach most of my cleaning and have learned how I might approach future cleaning processes as well (re: switch/case for instance). As always, I have posted my <a href="https://github.com/yo-my-bard/TZ-Tourism/blob/master/2014TourismSurvey_clean.csv">conservatively cleaned final dataset on GitHub</a> in hopes of saving someone else some time!

&nbsp;

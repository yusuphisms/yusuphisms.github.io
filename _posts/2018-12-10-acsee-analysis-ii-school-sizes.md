---
layout: post
title: "ACSEE Analysis II: School Sizes"
date: 2018-12-10 09:16
author: Yusuph Mkangara
comments: true
categories: [Education, Python]
---
In this second installment, I spent some time digging deeper into school sizes. Having spent a year working in a charter school in New York, I noticed the attention to regulating class sizes and the sheer number of small schools that share buildings in the city. As it turns out, the lived experiences of millions of students have historical precedence, both <a href="http://www.edlawcenter.org/assets/files/pdfs/publications/Reducing%20Class%20Size%20in%20NYC%20-%20Promise%20vs.%20Practice.pdf" target="_blank" rel="noopener">legal</a> and <a href="https://www.gatesfoundation.org/Media-Center/Press-Releases/2003/09/New-York-City-Department-of-Education-Receives-Grant" target="_blank" rel="noopener">financial/philanthropic</a>.  I don't plan to dive deeply into the merits or lack thereof of smaller classroom sizes and smaller schools in general, but it's clear that there is a belief that smaller schools/classrooms ought to do better than crowded educational institutions. I'm not sure whether there is a clear cut answer there. However, to a layman, a smaller classroom should mean more focus on individual students and a more manageable workload for a teacher in supporting students. With this assumption in mind, I sought to check if school sizes matter in the performance of the ACSEE in Tanzania.

<!--more-->As always, my Python notebook for this analysis is <a href="https://github.com/yo-my-bard/Scraping-NECTA/blob/master/School_Size_Tiers_Analysis.ipynb" target="_blank" rel="noopener">up on GitHub</a>.

Officially, the Tanzanian government groups schools into two sizes: "Schools with 30 or more candidates" and "Schools with less than 30 candidates" taking the exam. I compared how many candidates/students passed the exam (earned a Div I or Div II) and the former had 55%, the latter 56%. Not seeing a noticeable difference between the two was perplexing to me, and granted, more than 74,000 students were in schools with 30 or more candidates and only about 2,300 students were in the less than 30 group. Perhaps this lends some weight to some who argue class sizes or school sizes do not matter. However, I thought maybe we could unpack these two categories a little more and checked the frequency distribution of different school sizes.

<img class="alignnone size-full wp-image-118" src="https://elimumwalimu.files.wordpress.com/2018/11/school_size_dist.png" alt="school_size_dist" width="581" height="635" />

Unsurprisingly, the 30 or More group was skewed with a range of ~800. There is a large variety of school sizes within that category, certainly far more than the Less than 30 group. Without using a very scientific approach outside of trying to get a decent number of schools in each bucket, I arbitrarily set new interval size tiers within the 30 or more candidates group. Below are the tiers and the number of schools within each tier:
<ul>
	<li>30-50 candidates testing at the school, 135 schools</li>
	<li>50-75 candidates,  127 schools</li>
	<li>75-100 candidates, 81 schools</li>
	<li>100-200 candidates, 186 schools</li>
	<li>200-300 candidates, 59 schools</li>
	<li>300-900 candidates, 53 schools</li>
</ul>
Though imperfect and arbitrary, the new tiers suggest that the schools within each tier should be more comparable on the basis of size.

<img class="alignnone  wp-image-119" src="https://elimumwalimu.files.wordpress.com/2018/11/new_sizes_dist.png" alt="new_sizes_dist" width="494" height="1482" />

Even with these new size tiers, there are no substantial differences in passing rates. The largest size schools tier, 300-900, did present with a higher percentage of Div III results than Div II results which is a reversal from the other tiers suggesting some adverse effects as size increases. However, even there, the sole school with more than 600 candidates (~830) is likely an outlier and is affecting the distribution. The highest share of passing rates seems to be within the 75-100 group suggesting that it may be the most optimal size for being a successful school.

<img class="alignnone size-full wp-image-120" src="https://elimumwalimu.files.wordpress.com/2018/11/new_tiers_div_percentage_dist.png" alt="new_tiers_div_percentage_dist" width="720" height="1440" /> 

_% of Students in Each Division_

To round out this post, I wanted to connect back to what's been driving this analysis. The three top performing regions (Mtwara, Lindi, Geita in that order) were a surprise to me. Moreover, it's not clear to me what the ingredient for success is from 2018's results. Had Dar es Salaam or Mwanza performed well, I might think that money and urbanization matters, but the commonly thought-of as urbanized regions did not perform well. At this point, it seems that 75-100 tier schools performed slightly better than others. I performed a chi-squared test and found statistically significant results showing 75-100 performs differently than the larger tiers (the passing rate suggests that they perform better on average). However, against smaller schools the results were mixed and we failed to reject the hypothesis that they perform equally as well as smaller schools.

Given this, I thought, perhaps this tier is the driving force behind the top performers' success. I checked if the top performers had a high concentration of the 75-100 tier schools and found it was not the case. For Mtwara: only 5% of its students were in this 75-100 tier (12% and 6% for Lindi and Geita respectively). The highest concentration of students in the 75-100 tier schools was in Kaskazini Pemba, the third <em>worst</em> performing region. When we look at the passing rates of the 75-100 tier schools across all the regions: 97% of Mtwara's students in that tier passed the exam, 80% and 97% for Lindi and Geita respectively. For Kaskazini Pemba? Only 25% of their students in that tier passed. Performing well in your 75-100 tier schools may be a key barometer for how well you perform across the other tiers.

I'll end with the featured image of this post:

<img class="alignnone size-full wp-image-121" src="https://elimumwalimu.files.wordpress.com/2018/11/passing_rates_size_tier_increase.jpg" alt="passing_rates_size_tier_increase" width="1150" height="720" /> 

_Candidate Passing Rates as School Tier Size Increases_

Each line represents a region in Tanzania. There is a small peak at 75-100 for a lot of regions and a downward slope toward either end. I interpret this as suggesting that student performance does not benefit from having too few students nor too many students. There are other factors at play here, ones that particularly correlate with school size such as smaller schools likely having fewer resources. However, a functional interpretation might be about how students adapt to high stakes testing among each other. Having too few students means it is harder to find another student that can help one study the material, and having too many students may have a similar effect on getting help in general (either from the teacher or other students). The 75-100 tier schools fall somewhere in the middle. Granted, not all 75-100 tier schools are created equal. Nonetheless, this exercise illustrates some of the challenges for managing schools across diverse regions.

<em>Edit 12/10/2018</em>: Received feedback about clarifying the last plot. Here's a plot that draws attention to individual regions:

<img class=" size-full wp-image-126 aligncenter" src="https://elimumwalimu.files.wordpress.com/2018/12/passing_rate_tier_size_2.jpg" alt="passing_rate_tier_size_2" width="1400" height="1620" />

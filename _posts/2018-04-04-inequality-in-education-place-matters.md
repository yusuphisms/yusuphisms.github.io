---
layout: post
title: "Inequality in Education: Place Matters"
date: 2018-04-04 05:38
author: Yusuph Mkangara
comments: true
tags: [Education, inequality, place, Python, spatial analysis]
---
During my time in school, I became fascinated by this notion that place matters. It is an obvious idea five minutes into thinking about it. However, when explicitly declared, it is one of the most revolutionary ideas in the study of human life. It's particularly interesting when tackling spatial analysis on topics that one wouldn't (and shouldn't be expected to!) assume to be at all related to one's physical location in life. One such topic is education. While the "zip code shouldn't matter" movement in education has a strong foundation in the USA, I feel that we need a deeper look at how we can translate these same principles to a discourse on spatial inequality in Tanzania and other developing countries. My goal for this post is to "put education in its place" - that is, how we can begin to understand if place matters, the extent to which it matters, and how we might use those insights to most effectively intervene in the education sector.

<!--more-->
As always, you can find the <a href="https://github.com/yo-my-bard/Scraping-NECTA/blob/master/PSLE_Spatial_Analysis.ipynb">reproducible code for this on my Github account.</a>

First, let me quickly note the features in this dataset: the candidate number, their sex (Female is 1), subject scores in integers 1-5 (E-A) with some NaNs for X values. NECTA, the examination body in Tanzania, generates Average Grade as an integer. However, for more variation in scores, I added a calculated average feature that takes the mean of the subject scores. Note that the average grade is often the rounding of the calculated grade. Finally, the candidate number encodes the region that the student is from, as well as the district and school. Using regular expressions, I assigned Region and District values to each student when cleaning the data.

Our driving question here is whether your geographic location affects your success in the Primary School Leaving Examination (PSLE).

We can begin by looking at the distribution of scores by region. Although helpful, the number of regions makes the statistical output hard to digest. We use a boxplot below for more visual clarity on how regions' average score distributions compare.

Overall, if you compare 2017 to 2013 (I don't focus on 2013 here, but feel free to run this analysis with <a href="https://github.com/yo-my-bard/Scraping-NECTA/tree/master/CompleteDatasets">2013's dataset</a> from <a href="https://github.com/yo-my-bard/Scraping-NECTA/blob/master/PSLE_Spatial_Analysis.ipynb">my GitHub account as I did</a>!), average scores have increased across all regions. I would be curious to test if the improvements in the 4-year span are authentic or engineered. Tanzania has a historical difficulty with standardizing their exams. Reports of <a href="http://www.thecitizen.co.tz/News/Performance-in-Kiswahili--English-and-Maths-decline-/1840340-3432258-2ktmky/index.html">wild variance within a 5-year period are not uncommon</a>. The government may have changed the difficulty of the exam, changed how it grades the questions, or ultimately changed what constitutes passing scores. This is taking a more skeptical/cynical lens in evaluating the scores, but given Tanzania's past volatile passing rates, the skepticism may be warranted. Nonetheless, our hope is that the results are genuine and a good benchmark for students' continuing education in secondary school.

<img class="alignnone size-full wp-image-55" src="https://elimumwalimu.files.wordpress.com/2018/04/psle_distributions-e1522816687371.jpg" alt="psle_distributions_region" width="1734" height="611" /> 

_Distributions of Average Scores on PSLE 2017 by Region_

I conduct a one-way analysis of variance (ANOVA) using the regions as the groups to test for differences between regional scores. I do assume the data is mostly normal for each region and I conducted the test without outliers in case there was concern about them. The results are statistically significant at p < 0.001 level in both cases. I imagine this intuitively makes sense. We are testing whether or not performance on the PSLE is equal across 25+ regions - we'd naturally expect variation.

<pre>F_onewayResult(statistic=2417.0113629815164, pvalue=0.0)

#Without outliers
F_onewayResult(statistic=2417.0113629815164, pvalue=0.0)
</pre>

<a href="http://hamelg.blogspot.com/2015/11/python-for-data-analysis-part-16_23.html">hamelg's blog</a> was particularly useful because while I knew I wanted to compare groups using ANOVA, I wasn't sure of the best practice for Python. Coming from an SPSS background, this is both exciting and frustrating. The output was quick and easy with SPSS' GUI. Anyway, in keeping with hamelg's advice, I checked for which groups are driving this variance. I won't go into too much detail about the results of the code, but suffice it to say, the T-tests showed variation between many of the group combinations. So many in fact, that it may be more worthwhile to look at the regions which show potential for no significant variance. What about these regions without significant variance is similar? Different? Closer analysis with these questions in mind may offer an opportunity for government entities to act on specific key performance indicators rather than the whole gamut of issues to approach - especially for the low performing regions.

<pre>ARUSHA NJOMBE
Ttest_indResult(statistic=-1.3507663860147461, pvalue=0.17677560035173179)

DODOMA MTWARA
Ttest_indResult(statistic=-0.47138842726400576, pvalue=0.63736485420222366)

DODOMA SONGWE
Ttest_indResult(statistic=1.1269869112843498, pvalue=0.25975216934377093)

KIGOMA SHINYANGA
Ttest_indResult(statistic=0.25837931947793569, pvalue=0.79611496655880165)

KILIMANJARO MWANZA
Ttest_indResult(statistic=1.6347151114086111, pvalue=0.10211172676463574)

LINDI TANGA
Ttest_indResult(statistic=1.8696326273031136, pvalue=0.061539491914983431)

LINDI SIMIYU
Ttest_indResult(statistic=-0.18276643340642493, pvalue=0.8549820568369968)

MBEYA PWANI
Ttest_indResult(statistic=-1.0560763053213045, pvalue=0.2909368502641726)

MBEYA RUKWA
Ttest_indResult(statistic=-0.70055846233132268, pvalue=0.48358113042576112)

MBEYA RUVUMA
Ttest_indResult(statistic=0.17205145642958017, pvalue=0.86339752569219341)

MWANZA NJOMBE
Ttest_indResult(statistic=1.1653576591319679, pvalue=0.24387735460800122)

PWANI RUKWA
Ttest_indResult(statistic=0.21839835390285384, pvalue=0.82711971341384105)

PWANI RUVUMA
Ttest_indResult(statistic=0.99515867161949911, pvalue=0.31966318652493919)

RUKWA RUVUMA
Ttest_indResult(statistic=0.69074056129863837, pvalue=0.48973176628336035)
</pre>

All other group comparisons were statistically significant at p < 0.03 (most at p < 0.001).

To the question of whether or not place may determine your outcome on this exam, so far the analysis suggests there are at least some differences between some regions.

Next, I attempt to build a simple model to assess the magnitude by which a typical student in one region may outperform or underachieve compared to another student in another region. So far there is strong evidence that place matters, but now the aim is to answer the extent to which it matters.

In my look at <a href="https://elimumwalimu.wordpress.com/2018/03/10/inequality-in-education-sex-gender/">Sex-based inequality in education in Tanzania,</a> I noted the average difference by gender even while accounting for regional differences. That same regression reveals yet another inequality by way of regional outcomes. We illustrate the regression for the year 2017 and the effect of Regions and Sex on Calculated Averages.

<pre>                            OLS Regression Results                            
==============================================================================
Dep. Variable:            CalcAverage   R-squared:                       0.069
Model:                            OLS   Adj. R-squared:                  0.069
Method:                 Least Squares   F-statistic:                     2592.
Date:                Tue, 03 Apr 2018   Prob (F-statistic):               0.00
Time:                        23:02:15   Log-Likelihood:            -1.0501e+06
No. Observations:              909757   AIC:                         2.100e+06
Df Residuals:                  909730   BIC:                         2.101e+06
Df Model:                          26                                         
Covariance Type:            nonrobust                                         
============================================================================================
                               coef    std err          t      P&gt;|t|      [0.025      0.975]
--------------------------------------------------------------------------------------------
Intercept                    3.0871      0.004    770.055      0.000       3.079       3.095
regions[T.DAR ES SALAAM]     0.3039      0.005     61.766      0.000       0.294       0.314
regions[T.DODOMA]           -0.2977      0.005    -54.946      0.000      -0.308      -0.287
regions[T.GEITA]             0.3578      0.006     63.946      0.000       0.347       0.369
regions[T.IRINGA]           -0.0213      0.006     -3.411      0.001      -0.034      -0.009
regions[T.KAGERA]            0.1279      0.005     23.580      0.000       0.117       0.139
regions[T.KATAVI]           -0.0645      0.009     -7.293      0.000      -0.082      -0.047
regions[T.KIGOMA]           -0.2395      0.006    -42.610      0.000      -0.251      -0.229
regions[T.KILIMANJARO]       0.0234      0.006      4.168      0.000       0.012       0.034
regions[T.LINDI]            -0.1828      0.007    -26.054      0.000      -0.197      -0.169
regions[T.MANYARA]          -0.3267      0.006    -54.565      0.000      -0.338      -0.315
regions[T.MARA]             -0.1663      0.005    -32.142      0.000      -0.176      -0.156
regions[T.MBEYA]            -0.2591      0.005    -48.734      0.000      -0.269      -0.249
regions[T.MOROGORO]         -0.1506      0.005    -28.300      0.000      -0.161      -0.140
regions[T.MTWARA]           -0.2984      0.006    -49.208      0.000      -0.310      -0.287
regions[T.MWANZA]            0.0168      0.005      3.441      0.001       0.007       0.026
regions[T.NJOMBE]            0.0124      0.007      1.825      0.068      -0.001       0.026
regions[T.PWANI]            -0.2544      0.006    -41.830      0.000      -0.266      -0.242
regions[T.RUKWA]            -0.2551      0.007    -37.392      0.000      -0.268      -0.242
regions[T.RUVUMA]           -0.2605      0.006    -44.686      0.000      -0.272      -0.249
regions[T.SHINYANGA]        -0.2381      0.006    -40.576      0.000      -0.250      -0.227
regions[T.SIMIYU]           -0.1794      0.006    -30.514      0.000      -0.191      -0.168
regions[T.SINGIDA]          -0.3472      0.006    -58.018      0.000      -0.359      -0.336
regions[T.SONGWE]           -0.3076      0.006    -48.006      0.000      -0.320      -0.295
regions[T.TABORA]           -0.0874      0.006    -15.243      0.000      -0.099      -0.076
regions[T.TANGA]            -0.1969      0.005    -36.989      0.000      -0.207      -0.186
sex                         -0.1303      0.002    -80.775      0.000      -0.133      -0.127
==============================================================================
Omnibus:                     2809.502   Durbin-Watson:                   1.078
Prob(Omnibus):                  0.000   Jarque-Bera (JB):             2208.835
Skew:                          -0.030   Prob(JB):                         0.00
Kurtosis:                       2.766   Cond. No.                         30.0
==============================================================================

Warnings:
[1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
</pre>

A few things are of note again: once more, we see that regions have improved their average scores on the PSLE. I find the transformation of Geita's scores since 2013 to be the most surprising - shooting up to have the best average score of all the regions in the country. The coefficients here are relative to Arusha, but with an average score of 3.08, it's just past the passing mark so students in regions with coefficients < 0 are of greater concern. I would also be remiss if I did not reiterate once more that for girls, these spatial negative effects are <em>compounded</em> with current sex inequalities.

Regions are pretty broad. Even within regions, average scores can vary significantly. What if we observed this relationship at the more granular level of districts? There are about 180 districts and the results are below (see <a href="https://github.com/yo-my-bard/Scraping-NECTA/blob/master/PSLE_Spatial_Analysis.ipynb">GitHub</a> for coefficient numbers)

<pre>                            OLS Regression Results                            
==============================================================================
Dep. Variable:            CalcAverage   R-squared:                       0.118
Model:                            OLS   Adj. R-squared:                  0.118
Method:                 Least Squares   F-statistic:                     652.5
Date:                Tue, 03 Apr 2018   Prob (F-statistic):               0.00
Time:                        23:13:48   Log-Likelihood:            -1.0256e+06
No. Observations:              909757   AIC:                         2.052e+06
Df Residuals:                  909570   BIC:                         2.054e+06
Df Model:                         186                                         
Covariance Type:            nonrobust                                         
=================================================================================================
 
==============================================================================
Omnibus:                     1489.357   Durbin-Watson:                   1.137
Prob(Omnibus):                  0.000   Jarque-Bera (JB):             1278.603
Skew:                          -0.036   Prob(JB):                    2.26e-278
Kurtosis:                       2.831   Cond. No.                         295.
==============================================================================

Warnings:
[1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
</pre>

The district model explains more of the variance (larger R-squared value) probably owing to its granularity. However, I notice that if 2.5+ is what's needed on the CalcAverage to pass, then the average for many districts is right on par. The coefficients here are based on the Ifakara Mjini district. This is not too surprising - the box plot visually shows that many regions had a median that far exceeded the 2.5 mark. The region closest to that mark is Singida's and the Mkalama district within Singida is the lowest performing district on average. The districts with averages that are less than 2.5 are: Mkalama (2.22), Meatu (2.28), Lushoto (2.48), Chemba (2.48), and Ukerewe (2.49).

There are certainly other approaches one could take on this discussion - this isn't by any means exhaustive. Here we compare district and regions without taking into account any other factors other than sex. For instance, district sizes (the number of students taking the exam or the general population size) may matter. There are also other measures that we could take into account that may better explain these averages, such as the often cited pupil to teacher ratio or functioning latrines. Where we may have found success, however, is in <strong>ascertaining that place matters</strong> when it comes to a student's performance in Tanzania. We also explored the magnitude of the differences and found that the variation between years may be key in evaluating magnitude going forward.

One of my favorite discoveries (maybe non-discovery?) are the regions which the analysis found to not have significantly different variation in scores. For a government institution, this is a promising insight that may allow the clustering of regions (or districts!) into buckets that are doing well, those that aren't, and the reasons for both. It may be a more systematic approach to finding and managing key performance indicators for all regions. As of now, I feel that we have a sense of what makes a region successful. However, these analyses may provide more clarity on specific indicators of success.
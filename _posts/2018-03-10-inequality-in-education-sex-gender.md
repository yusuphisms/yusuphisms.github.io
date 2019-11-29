---
layout: post
title: "Inequality in Education: Sex/Gender"
date: 2018-03-10 04:38
author: Yusuph Mkangara
comments: true
categories: [Education, girls, international women day, Python]
---
For International Women's Day, I was inspired by tweets that zeroed in on women - more so than usual anyway. I am a day late because leading up to that, I was focused on analyzing this particular dataset for finding regional variances (sneak peak of that in the output). My interest was mostly at the nexus of place and education in Tanzania and how using such data can create a more targeted organizational approach to tackling the toughest educational inequalities.

One such inequality is between the sexes. No patience for punchlines here: <strong>educational outcomes for Tanzanian girls are unequal compared to their counterparts.</strong>
<!--more-->
We already have some indication across the board of what levers the government (local and national) can begin to tinker with to close these gaps. In this quick linear regression, I use the 2013 Primary School Leaving Examination (PSLE) outcomes to try to capture the magnitude of the inequality. My past research has mostly found this magnitude expressed in terms of absenteeism, pass-fail differences, etc. To be clear, those values are likely more impactful and more clear-cut. Quite frankly, this analysis is closely tied to them as I'll be looking at the Calculated Average PSLE score and gender's effect on it. If you can close the pass-fail gaps or address various causes of absenteeism, my assumption is we would see the effect of gender narrow. Let's get to it. (<em>A note</em>: gender is complex and different from sex, however, I don't have the data to truly do justice to the non-conforming communities. Regrettably, gender and sex are interchangeable here to mean female vs. male.)

I have been giving Jupyter a second try (usually a PyCharm faithful). I can see why people love it so much, especially since I can export to HTML and paste to my blog. Find <a href="https://github.com/yo-my-bard/Scraping-NECTA/blob/master/Womens_Day_Models_Analysis.ipynb">my notebook and analysis</a> in my GitHub account! First, we read in our data using pandas and clean out some N/A values. For this quick analysis, I look at two categorical variables: Sex and Regions. I already dummy coded Sex (Female = 1, Male = 0) when cleaning up the scraped data, but pandas can also dummy code all 25 regions. Statsmodels' ols function does this step for you as well when fitting your model so I opt for this instead. (Many thanks to <a href="https://www.scipy-lectures.org/packages/statistics/auto_examples/plot_regression_3d.html" target="_blank" rel="noopener">scipy-lectures</a> for their tutorial on setting this up using ols).

<div class="cell border-box-sizing code_cell rendered">
<div class="input">
<div class="inner_cell">
<div class="input_area">
<div class=" highlight hl-ipython3">
<pre><span class="c1">#Read in CSV</span>
<span class="n">psle2013</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">read_csv</span><span class="p">(</span><span class="s2">"~/Documents/GitHub/ImportingNECTA/CompleteDatasets/necta_psle_2013.csv"</span><span class="p">)</span>

<span class="c1">#Drop NAs, get Dummies if desired, call .head() to check dataframe if desired</span>
<span class="n">psle2013_noNA</span> <span class="o">=</span> <span class="n">psle2013</span><span class="o">.</span><span class="n">dropna</span><span class="p">(</span><span class="n">axis</span><span class="o">=</span><span class="mi">0</span><span class="p">,</span> <span class="n">how</span><span class="o">=</span><span class="s1">'any'</span><span class="p">)</span>
<span class="n">psle2013_noNA2</span> <span class="o">=</span> <span class="n">pd</span><span class="o">.</span><span class="n">get_dummies</span><span class="p">(</span><span class="n">psle2013_noNA</span><span class="p">,</span> <span class="n">columns</span><span class="o">=</span><span class="p">[</span><span class="s1">'Region'</span><span class="p">])</span>

<span class="c1">#Assign variables for building the model</span>
<span class="n">CalcAverage</span> <span class="o">=</span> <span class="n">psle2013_noNA</span><span class="o">.</span><span class="n">CalcAverage</span>
<span class="n">sex</span> <span class="o">=</span> <span class="n">psle2013_noNA</span><span class="o">.</span><span class="n">SEX</span>
<span class="n">regions</span> <span class="o">=</span> <span class="n">psle2013_noNA</span><span class="o">.</span><span class="n">Region</span>

<span class="c1">#For just the DAR-ES-SALAAM Dummy Variable</span>
<span class="n">dar</span> <span class="o">=</span> <span class="n">psle2013_noNA2</span><span class="o">.</span><span class="n">Region_DAR</span>

<span class="c1">#Build the model, print the model summary</span>
<span class="n">model</span> <span class="o">=</span> <span class="n">ols</span><span class="p">(</span><span class="s2">"CalcAverage ~ sex + regions"</span><span class="p">,</span> <span class="n">psle2013_noNA</span><span class="p">)</span><span class="o">.</span><span class="n">fit</span><span class="p">()</span>
<span class="nb">print</span><span class="p">(</span><span class="n">model</span><span class="o">.</span><span class="n">summary</span><span class="p">())</span>
</pre>
</div>
</div>
</div>
</div>
<div class="output_wrapper">
<div class="output">
<div class="output_area">
<div class="prompt"></div>
<div class="output_subarea output_stream output_stdout output_text">
<pre>                            OLS Regression Results                            
==============================================================================
Dep. Variable:            CalcAverage   R-squared:                       0.075
Model:                            OLS   Adj. R-squared:                  0.075
Method:                 Least Squares   F-statistic:                     2748.
Date:                Fri, 09 Mar 2018   Prob (F-statistic):               0.00
Time:                        11:25:29   Log-Likelihood:            -8.9027e+05
No. Observations:              844297   AIC:                         1.781e+06
Df Residuals:                  844271   BIC:                         1.781e+06
Df Model:                          25                                         
Covariance Type:            nonrobust                                         
==================================================================================
                     coef    std err          t      P&gt;|t|      [0.025      0.975]
----------------------------------------------------------------------------------
Intercept          2.7540      0.004    728.468      0.000       2.747       2.761
regions[T.DAR]     0.2880      0.005     62.197      0.000       0.279       0.297
regions[T.DOD]    -0.3458      0.005    -67.920      0.000      -0.356      -0.336
regions[T.GEI]    -0.1413      0.005    -25.767      0.000      -0.152      -0.131
regions[T.IRI]     0.0417      0.006      7.085      0.000       0.030       0.053
regions[T.KAG]    -0.0118      0.005     -2.362      0.018      -0.022      -0.002
regions[T.KAT]    -0.2414      0.009    -28.252      0.000      -0.258      -0.225
regions[T.KIG]    -0.2975      0.005    -55.388      0.000      -0.308      -0.287
regions[T.KIL]     0.0402      0.005      7.879      0.000       0.030       0.050
regions[T.LIN]    -0.2817      0.007    -43.164      0.000      -0.295      -0.269
regions[T.MAN]    -0.2927      0.006    -51.663      0.000      -0.304      -0.282
regions[T.MAR]    -0.3216      0.005    -65.223      0.000      -0.331      -0.312
regions[T.MBE]    -0.2481      0.005    -54.096      0.000      -0.257      -0.239
regions[T.MOR]    -0.1563      0.005    -31.504      0.000      -0.166      -0.147
regions[T.MTW]    -0.2220      0.006    -39.432      0.000      -0.233      -0.211
regions[T.MWA]    -0.0219      0.005     -4.659      0.000      -0.031      -0.013
regions[T.NJO]    -0.0326      0.006     -5.197      0.000      -0.045      -0.020
regions[T.PWA]    -0.1316      0.006    -22.716      0.000      -0.143      -0.120
regions[T.RUK]    -0.3263      0.006    -50.416      0.000      -0.339      -0.314
regions[T.RUV]    -0.3494      0.005    -64.447      0.000      -0.360      -0.339
regions[T.SHI]    -0.1829      0.006    -32.884      0.000      -0.194      -0.172
regions[T.SIM]    -0.3631      0.005    -66.669      0.000      -0.374      -0.352
regions[T.SIN]    -0.3315      0.006    -58.161      0.000      -0.343      -0.320
regions[T.TAB]    -0.3781      0.005    -73.183      0.000      -0.388      -0.368
regions[T.TAN]     0.0026      0.005      0.509      0.611      -0.007       0.012
sex               -0.1376      0.002    -90.816      0.000      -0.141      -0.135
==============================================================================
Omnibus:                    34235.368   Durbin-Watson:                   1.126
Prob(Omnibus):                  0.000   Jarque-Bera (JB):            38535.362
Skew:                           0.516   Prob(JB):                         0.00
Kurtosis:                       3.174   Cond. No.                         29.5
==============================================================================

Warnings:
[1] Standard Errors assume that the covariance matrix of the errors is correctly specified.</pre>
</div>
</div>
</div>
</div>
</div>
<div class="cell border-box-sizing code_cell rendered">
<div class="output_wrapper">
<div class="output">
<div class="output_area">
<div class="output_subarea output_stream output_stdout output_text">
<pre>Girls' Mean Calculated Average Score: 2.467210504122669
Girls' Median Calculated Average Score: 2.4
Boys' Mean Calculated Average Score: 2.6070221581969726
Boys' Median Calculated Average Score: 2.6
</pre>
</div>
</div>
</div>
</div>
</div>

The results show the regression taking into account regions. However, all else equal, girls on average scored -0.13 less on their calculated average score. Consequently, assuming a score of 3 (2.5+) is passing, the magnitude could very well be the difference between passing and failing the exam. I feel that this needs some reiteration: because of the system as currently implemented, being <em>born a girl</em> could have been the difference between passing or failing the PSLE in 2013. Of course, I am oversimplifying the issue, but the issue does boggle the mind.

Recently, PSLE is no longer a barrier to attending secondary education. However, the fight is not won as other discriminatory practices have taken its place (e.g. <a href="https://www.theguardian.com/global-development/2017/jun/30/tanzania-president-ban-pregnant-girls-from-school-john-magufuli">banning once pregnant girls from continuing their education</a>). Unfortunately, this discussion is still very high level. I'm going to continue to piece together data that might give more actionable items to close these gaps. In the meantime, check the work of good people like <a href="https://twitter.com/dropwall_" target="_blank" rel="noopener">Dropwall</a> (<a href="http://www.eagleanalytics.co.tz/" target="_blank" rel="noopener">eagleanalytics.co.tz</a>) who are working on a system that predicts potential dropouts. Literature shows that the issues they are finding are of acute importance to girls.
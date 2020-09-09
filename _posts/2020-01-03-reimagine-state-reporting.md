---
layout: post
title: "An Imaginative Journey Deeper Into K-12 State Reporting"
date: 2020-01-03
tags: [Data Engineering, State Reporting]
---
It's the third day of the new decade and I'm feeling good, Nina Simone. Before 2019 closed out, I had a chance to listen to [a talk on the Future of Data Engineering](https://www.infoq.com/presentations/data-engineering-pipelines-warehouses/) and I had just watched [another nice prose-like approach](https://www.youtube.com/watch?v=4iDjegukrkI) to explaining Airflow. I was most drawn to how they talked about their data engineering journey in stages and I want to emulate that with my current work in K-12 state reporting. <!--more-->

Unfortunately, unlike these nicely prepared presentations, my blog posts will wind frequently as I figure it all out. I'll start with a contextualization of the challenge I'm trying to tackle in 2020 and beyond.

### Context
I currently work at an innovative charter school organization in the Bay Area and Washington state. When I joined, they had already done significant work to automate a lot of daily tasks using Python/Jupyter Notebooks. There was some work being done on Airflow, but last summer, we kicked that work into overdrive. My primary responsibilites have been reporting student and staff level data to the state. The primary method for districts to submit data is through `.txt` flat files. Much of the work is abstracted to Student Information Systems (SIS) which are responsible for creating and maintaining the state reporting engines to meet the requirements that the state provides. As one can imagine, every school has a different structure (think traditional school year vs. year-long schools) and providing software that meets every need is challenging. The SIS engines work well enough (certainly way better than expecting individual districts to have the resources to meet these requirements on their own), but they aren't perfect. Additionally, this work is time consuming and with limited resources for both charter and non-charter K-12 districts, it's imperative to find and maximize any efficiency edge.

### Reimagining State Reporting
I was driving down to LA and was having a nice career chat with my significant other when it hit me: I'm learning data engineering and state reporting has plenty of opportunities to bring data engineering tools to bear on new-but-familiar problems. For now, I'll summarize the big buckets that will be my focus, most of which came from that car ride and all of which are constantly subject to change.

##### Automation
Though state reporting requirements change year to year, most of the mechanics are fairly constant:
- Download the file
- Submit the file to the state system
- Receive and resolve errors
- Validate the final submission against expected values (QA)

It's time consuming, but _such_ a good opportunity for a computer to do what a computer does best: **get**. **stuff**. **done**. and _fast_. and _tirelessly_.

##### Monitoring
Although my primary responsibility is to report the data, the data is often changed by other parties. With so many hands in the kitchen, sometimes data is injected into the system that will be flagged later as an issue when I submit the data. We don't quite need a data streaming monitoring solution, but even a daily download of changes made in systems can reveal early points of concerns. Additionally, it's occasionally helpful (and maybe even critical) to know about data even further in the past. In "the moment" monitoring will allow us to address issues without waiting until the issue is no longer top of mind.

##### Validation
As hinted in the last two buckets, state reporting requires robust data validation. We need to validate that the data will be accepted by the state system (e.g. correct code combinations) _and_ that it's the data that we expect (i.e. a reported absence actually happened). The latter is a much harder problem to solve for and we try to proxy/sanity check as best as possible (e.g. if school faculty incorrectly input an absence, we have no way of confirming this data using the system alone). In fact, this is probably the most critical bucket as far as I can tell. We have to have confidence in any deployed solution because it's ultimately a compliance issue and an audit risk.

### Immediate Next Steps
I titled this an imaginative journey because there's an element of tackling the unknown and searching for best practices across different sectors. I think feeling as excited as I do about this work gives me a sense of peace that I'm on the right track for now. For next steps, I'm going to work on deploying Airflow DAGs to production for the first time in this work (and ever! Jeepers!) and I look forward to writing more about the motivations and challenges in that work as it progresses. I'm also working (and hopefully collaborating soon!!) on developing [an open source data extraction tool](https://github.com/SummitPublicSchools/ducttape-calpads) for CALPADS, the state apparatus for reporting data in California. As these different pieces come together, writing about them will certainly be the best part. In the future, I will continue staying plugged in and listening to more presentations for inspiration. I'll be making a concerted effort to finding a range of diverse resources particularly from women and other underrepresented folks in tech.
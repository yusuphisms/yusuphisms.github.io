---
layout: post
title: "My First DAG or If Your Dreams Don't Scare You"
date: 2020-02-14
categories: [Data Engineering, State Reporting]
---
I just came back from visiting family in Tanzania and I felt that the big themes in my trip were courage and fearlessness. I think of these as two sides of the same coin. Without one of the sides, the value of the coin, in my opinion, depreciates. I believe one can be courageous, but ruled by fear and similarly one can be fearless but [lack gall](https://www.sparknotes.com/nofear/shakespeare/hamlet/page_130/). I came back to work with these two themes in mind. I wanted to be bold in my work this year and that's okay because if your dreams don't scare you, they are not big enough. <!--more-->

### My First DAG
I finally wrote my first Airflow DAG and it runs and it's in production! I don't *really* use it (yet), but it was a good stepping stone. All the DAG did was query to find a difference between two dated tables, the latest run and the one prior. It ended up being good practice because it reinforced how execution dates and schedule intervals work on Airflow (The documentation on this behavior is great across the site actually, if you happen to find/run into it. They often note how something will run up until this day, but not this date, etc.). During testing I was always triggering the DAG manually which had very specific behavior on my templated variables. For example, our latest table is always dated as of yesterday. So when I triggered the date to run I was actually inadvertently sending it the `execution_date` of **today**. In my code, I compensated for this by always subtracting 1 day and then for the second_to_latest_table, I would subtract 2 days. In practice and production, yesterday was actually the execution_date and so the builtin variables of `ds` and `yesterday_ds` were all I needed. It was a learning moment for me and it continues to pay dividends. I recently realized that in the future, I could mimic execution dates by using the command line tool: `airflow trigger_dag dag_id -e execution_date`. I'm not aware of this being available through the UI, but it would be useful!

### My Second (and maybe Third DAG?)
Most of this post is actually going to be about some key aspects of the process I went through to write my second DAG. In my previous post, I talked about being inspired to start this journey and this DAG is what has been running in my imagination since that car ride to Los Angeles. It's the [inspiration for real](https://youtu.be/WOhJE8bLVzE?t=211). There was not much on paper back then. I didn't really understand Airflow either (still don't!) so I wasn't sure what the limits to my imagination were going to be. At this point, I had run a previous version of this data submission process using Jupyter Notebooks written by a colleague. For this year, I transitioned those notebooks into using [`papermill`](https://github.com/nteract/papermill), further automating and reducing the number of notebook cells that a human would have to run. Prior to using papermill, if you had asked me about the feasibility of putting this entire pipeline on Airflow, I would think it's a cool idea but I would not have *believed* that it was possible. Certainly, I would think that my skillset wasn't ready to handle something that big yet. I take this space to affirm -- for myself if no one else -- that progress is an incremental process. Mayuko recently said it more succinctly: [patient progress builds](https://youtu.be/gmB7O9Q7QCw?t=448). Dreams, however, are monumental; they don't often come to us with outlined steps to realizing those dreams. It's precisely that scariness, though, that confirms that I have given my imagination ample room to grow. In the process of growing into that imagination, I will find pieces of myself: the courage it took to start the journey and the strength it takes to reject fear along the way.

#### ETL?
I had a meeting with my manager in which I discuss the progress I made on a [SMART Goal](https://corporatefinanceinstitute.com/resources/knowledge/other/smart-goal/) since our last meeting. I recount one amusing encounter here. I was describing, with all the confidence in the world that this was a novel breakthrough, about how I was thinking about developing this DAG in three parts. I finished the part about downloading the files from the Student Information System and I was working on 2 other parts: the part where I fix the data up a little bit and the final part would be sending it to the SFTP server. My manager asked: "do you know what you just described?" and I, beaming, "uh wrangling??". "ETL". And I couldn't help but chuckle and smile. The whole time I was describing what my plan was, it did not occur to me that I was describing an ETL process. But that's what I was doing. I have to sometimes remind myself that I might not know what all the technical things are called, I know the basics, the plain English, of what I'm doing. However, just because I'm not calling it ETL doesn't mean I'm not building experience in building ETL processes. It's less of an issue here because I happen to know what ETL is and means, but that's important as I try to think about designing a framework for building this DAG without always knowing the technical lingo.

#### Frameworks or Design Patterns?
I often think about the work I'm doing as a "framework". I'm building something that gets the job done for now. I'm trying to structure it in a way that keeps the code organized, but I never know that it has a "name" per se. I think I've come to settle on that I should focus on building a functional tool for now and in a second or third revision, I can start thinking about optimizing or explicitly using a design pattern. Premature optimization is often a topic of conversation in the programmic circles, but I figure I would also add my 2 cents here. I feel drawn to try optimize or pick the best structure for the code but it often hinders my progress more than anything. One decision that I'm pretty excited about and look forward to refining in the future is how I have used `classes` in this space.

We have 18 txt files that we have to submit as zip documents to the SFTP server. There is some wrangling that all 18 files have to go through, but there are some things that might be unique to some files.
- To solve for this, I created a base class with the universal functionality and particularly one method called `process_the_file`. All subclasses, or all files, are expected to call this method.
- Every subclass can have additional methods that are unique for their file, but they must be set up to be called within the `process_the_file`.
- At the DAG level, I use the `PythonOperator` to bring it all together. I create an additional class which has the list of all these 18 files or subclasses as an attribute and a callable that executes the `process_the_file` method for each one.

There was an additional problem. Year to year, we sometimes run into an issue that can't be solved at the source. For example, the Student Information System may produce an error in a file because our setup is unique. For these instances, we need to intervene directly on the file. When we were using Jupyter Notebooks, this process felt "seamless" in that it didn't look different from any of the other file processing steps we were doing. However, if this is a DAG that is meant to be used year to year, we needed a way to "plug in" these manual changes and unplug when it's a different year. For now, I rely on a class used for OneOff changes. It too has a main method that will execute all one-off changes. As additional one-off changes need to be made, they are added as methods and added to the method that will be executed. That same method is then imported into a PythonOperator as a callable.

#### Validations?
At this point, the DAG is filling up but I still have the issue of validations to consider. I wrote a little bit about what this would look like in my previous post but to rehash: we need to check that the files produced at the end match the expectations of the state system and that they match the expectations of our organization. As I was writing validations, I ran into two problems:
- Why am I writing validations for the state system? The state system works will list out everything that is wrong with the files that you produced and has a "reject this data" feature if there are too many errors.
- To validate the data against what the organization expects would require querying the database. This is possible but complicates the DAG.

For the first iteration, I'm going to not write validations against the state system requirements. I'm duplicating work and the system finds few errors if our Student Information System is set up as cleanly as possible. Unlike the first issue, no system exists already to check that the data matches our organizational expectations. To that end, this tool needs to be built. And it will be, but likely as a separate DAG (the Third Dag). There are two reasons for my thinking here.
- No matter how bad the data is, I still want it to be sent to the state system so that I can get the errors that the state system produces. This is to say that these validations can happen after the submission DAG completes.
- I need to access both our database and the file's data at the same time. This sounds like a great opportunity to write a general operator that takes a query and the file identifier to do the validations.

#### Storage
There's no shortage of storage solutions and with the flexibility of Airflow and compute services, the world's your oyster for storage. Our Airflow production server had two major storage components: S3 and an RDBMS solution in Snowflake. The concern I had with these tools is that our organization operated primarily out of Google Drive. The vast majority of folks in our organization (really anyone outside of our team and the finance team) had no idea that we were paying for some of these storage options. I advocated for zipping the contents of our submission and using the Drive API to store it directly on the Drive.
What about validation outputs? What's the best way to format/store those?
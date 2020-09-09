---
layout: post
title: "Function Follows Form: An Approach to Dynamically Parsing and Filling HTML Forms Using Selenium"
date: 2020-03-26
tags: [Python, Selenium, Automation]
---
For this post, I'm writing about a process in which I pieced together puzzle pieces as I went along.

I talked a little about defining larger dreams for oneself in the previous post, but I can't emphasize enough how much programming has unlocked my imagination. About a year ago, I was working on an automation workflow that relies on Selenium and Python. At the time, the slickest trick that I knew is that on Chrome, you can Inspect an HTML object and copy its xpath value into your script to make magic happen.

This trick did wonders for my work and I leveled up quite a bit. We were often working with websites that didn't always use IDs on their HTML elements and their class attributes were too general. However, as time went on, I was hitting the limits of copy-pasting xpaths and needed to learn how to generalize my approach. The little that I have picked up over the course of the last few months have led me here. <!--more-->

## The Problem
I have a website that has a bunch of reports that I would like to download in various formats. Upon logging into that website, you can go to a "Reports Page" that lists all of the reports: Report A, Report B, Report C, etc. If you click Report A, you are led to a website that has 10 form fields that you can customize before clicking "View Report". The webpage then uses AJAX to produce the report below the form. If I click Report B, I get the same structure, but the report fields are not guaranteed to be the same. I'm not even sure that the fields are always on the same part of the page from report to report. A year ago, I wrote a Python API that covered general use cases (i.e. left most options as the default options and exposed only a few fields through the API). Suffice it to say, it felt lackluster and worse still, the resultant method call was very unwieldy. Some of the logic was faulty and I felt that it stemmed from a lack of understanding how to deal with a form with **so many** field options. I began asking how general could I make this form processing.

## The Opportunity
Because I don't work directly with the folks that make the website that I'm trying to use Selenium on, I can't ask them to structure their webpage in a more convenient manner. However, I set out to dynamically produce the form elements for each report and expose them to the user as available options through a Python API.

## Initial Viability Assessment - Reading for Fun
I went back to the drawing board with fresh eyes. I opened two of the reporting pages and tried to parse the HTML that created the form to to see if there was a structure hidden under all that messiness. The form elements were nested in table elements and for dropdowns, it wasn't immediately clear how I would access the dropdown options. Despite this, I was starting to see a pattern in the structure.

- At a high level, all form elements were housed in a div with an attribute called `data-parametername`. I didn't know how I was going to go down the rabbit hole and parse the *precise* input element housed in the div, but at least a pattern emerges from all the muck.
- I took a step back to read whether HTML form elements are generally marked in a way that makes it clear that they belong to a particular form. The [MDN webpage](https://developer.mozilla.org/en-US/docs/Learn/Forms/Basic_native_form_controls) suggested some key look-fors, namely the `name` attribute. The name attributes have difficult values that make sense to the backend, but wouldn't be helpful to users of the dynamic parser.

The existence of the `data-parametername`, the fact that it covered all of the form elements, and only the form elements, was promising enough for me to continue the journey forward. Many in the field are now openly making this connection, but I'm often struck by how much programming is an exercise in reading and understanding what you are reading. When I think about writing a parser, I'm reading for recurring patterns (motifs, if you will). If you're looking to do some dynamic parsing yourself, I think this "process" is applicable to other similar problems.

## So My Data Appears Structured, But Just How Structured?
I like experimenting using Jupyter Notebook and do most of my work in them. After identifying an idea, I'll start a driver and get to the webpage of interest.
- I try some xpath values using the Chrome Inspect tool and/or the notebook cells. At this point, I tried to create an xpath in the Inspect tool that could isolate a form data field element.
- When I successfully create a few xpath statements, I try to generalize across other elements.
  - What do these xpaths seem to have in common?
  - Is the browser-rendered UI also giving clues about which elements might share an underlying structure?
  - Does the form treat all select tags the same? All input tags?

Because I knew that everything I wanted was under a div with an attribute of `data-parametername`, I tried to list all of their descendants (using `//*`). The part that was a moment of Eureka! is when I called Python's `set()` on this list of descendants across all form elements. It turns out there were only 3 unique HTML structures that led to a data field element. With only 3 structures to plan for, a general parser was closer to reality. As messy as it seemed before, this data was more structured than anticipated (which is a great thing!). I am able to pare it down to three basic field types:

~~~html
<!-- select field example -->
<div data-parametername="ParamName">
  <select>
    <option value="">Value Text</option>
    <option value="">Value Text</option>
    .
    .
    .
  </select>
</div>
~~~
~~~html
<!-- text input field example -->
<div data-parametername="ParamName">
  <table>
    <tbody>
      <tr>
        <td>
          <input type="text" >
        </td>
      </tr>
    </tbody>
  </table>
</div>
~~~
~~~html
<!-- dropdown field example -->
<div id="Report_Cell12_Cell13" data-parametername="ParamName">
  <div class="">
    <table>
      <tbody>
        <tr>
          <td>
            <input type="text" name="" onchange="some js magic"
            data-ol-has-click-handler>
          </td>
          <td>
            <span class="glyphui"></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
.
.
.
<div id="Report_Cell12_Cell13_divDropDown">
  <span>
    <table>
      <tbody>
        <tr>
          <td>
            <span>
              <input id="input_id" type="checkbox">
              <label for="input_id">Label for the Checkbox</label>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </span>
</div>
~~~

## Data Structures and API Design
Discovering the structure is awesome, but for users (future me is squarely in that bracket), 10 options per form and 20 forms later, it's going to be hard to keep up. The next step is creating an expressive API that opens up all form inputs to users, is robust enough if the webpage HTML has minor changes, and is maintainable in the long haul. To do this:
- I first read through the form fields on the page under `data-parametername` to fetch all of the descendants for each div.
- Then I read through the elements a second time using the order of the descendants to determine the field type and allowable user input.

When a "dry run" is turned on, the user receives a dictionary like the one below to determine what form fields are available and how they can be manipulated:
~~~python
{'DataParameterName': [('select', 'option', 'option'),
                        ('select', ('visible txt option',
                                    'another visible text option'))
                        ],
 'Another Data Param': [('table', 'tbody', 'tr', 'td', 'input'),
                        ('textbox', 'plain text')
                        ],
 'Yet Another Param': [('div', 'table', 'tbody', 'tr', 'td',
                        'input', 'td', 'span'),
                        ('dropdown', {'Label Text': (True, False),
                                      'Another Label Text': (True, False)})
                        ]
}
~~~
In turn, the user is expected to use this information to pass in the following example dictionary with dry run turned off:
~~~python
{'DataParameterName': 'another visible text option',
'Another Data Param': 'Any Text Will Do',
'Yet Another Param': {'Label Text': True}}
~~~
The structure can be read as the key of the dictionary is the parameter name, or the field name. This is usually in decipherable English so users can hopefully tell what they would be manipulating. The values are two item lists:
- The first item is always the descendant tags
- The second item is a tuple consisting of two items:
  - The field type
  - The allowable options and expected input structure. This isn't immediately clear and more help will be provided in the docstrings.
    - For select, the options are text tuple. We use Selenium to select by visible text. Additionally, only one option is allowed at a time (not a multi-select). Each item in the tuple is one of the select options and must be passed into the value of the input dictionary key exactly as written.
    - For textbox, any text will do. It should make sense of course given what you are trying to input but generally for our reports this is usually a Comment box at the end - so really, anything will do. In the dictionary that a user will pass in as an argument, textbox and select look the same (a string for a value). Under the hood, of course, the difference is that textbox is free response, but the select will only take the provided specific options.
    - For dropdown, more involved but similarly very structured. Users are expected to pass in a dictionary of the checkbox options. The keys (corresponding to the labels) must match exactly, and the allowable options are in the tuple (True, False). The caveat under the hood is that this is essentially a "multi-select". However, passing in a dictionary will first uncheck all checkboxes and any checkbox that is not given a True value will be left unchecked. This is tricky behavior, but I think it's straightforward once it's understood.

### A Little Luck, A Spoon of Elbow Grease
It's often said that sometimes you're good and sometimes you're lucky. I'd like to think the experience up to this point was a little bit of both.
#### Elbow Grease
- Dictionaries make for a great input data structure. Usually readable, usually readily manipulatable.
- For scaffolding about the design choice for the dictionary, this needs strong docstrings and equally strong examples. You can make some guesses that the first item of the values is a tuple of descendant tag names, and that the second item is (field_type, allowable_options_with_expected_format), but it wouldn't be immediately clear.

#### A Little Luck
- For a moment there, dropdowns and textboxes were beginning to have the same descendants. But the dropdown had that last span label to set it apart (and the div actually!).
- If you saw the original HTML, the fact that it boils down to these 3 components is nothing short of a miracle to me.
- In the above dropdown field example, there is a second div at the bottom with an id that is appended with \_divDropDown. The bottom div only appears after the first div is clicked and it is where the actual checkbox options are stored. The fact that I can use the ID of the original `data-parametername` div to know this div's id is nothing short of the frontend developers throwing me a bone.

## Conclusion
Writing this parser and rethinking the API for interacting with this webpage was a rewarding experience. There's an element of uncertainty that ends with all the right feels when the puzzle pieces click together. I went on to creating another parser on the heels of accomplishing this task and the confidence continues to swell. As I go to publish this post, I am left mostly thinking about how the right and left side of my brain came together to accomplish this. Reading, creativity, and technical wizardry all bundled together. A moment of metacognition that commands a pause;  reminding me of the serenity to be found in writing.

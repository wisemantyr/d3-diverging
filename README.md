# stacked-diverging-d3

This repository contains code for a horizontal stacked diverging bar chart using d3.js (v5). It displays a party breakdown of 20 of the most recent bills voted on by Congress. The data comes from the ProPublica Congress API (https://projects.propublica.org/api-docs/congress-api/) and was loaded into a MongoDB database.The database was created for another project. The API request and database creation is done in the buildDB.py script in this repository: https://github.com/elisabethvirak/Know_Your_Congress. The records from the database are displayed as a JSON in the /members route of this flask app. 

The chart can be viewed by running the app.py script. There is also an example image - chart.png. 
![Chart Image](/chart.png)

I used d3.stack() to create a series for each political party. There is a great explanation for this method here: http://using-d3js.com/05_06_stacks.html. The for and against portions (each side of the chart) are separate SVG areas. The y axis was created with custom tick marks since the bill titles are not always unique. 

Ultimately the goal is the use what I learned here to create a similar chart for the Know Your Congress project.

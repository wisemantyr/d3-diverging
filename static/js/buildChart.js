/////////GET DATA/////////////

//access votes route in Flask app
d3.json("/votes").then(function (data) {

    //loop through objects in route
    data.forEach(function (d) {

        //convert data to numeric
        demYes = +d.democratic.yes
        demNo = ~d.democratic.no //makes negative
        repYes = +d.republican.yes
        repNo = ~d.republican.no
        indYes = +d.independent.yes
        indNo = ~d.independent.no

        //add all values to voteValues (to assess range for scales)
        voteValues.push(demYes, demNo, repYes, repNo, indYes, indNo);

        //push desired data to voteData array
        votesData.push(
            {
                "name": d.bill.bill_id,
                "question": d.question,
                "description": d.description,
                "demYes": demYes,
                "repYes": repYes,
                "indYes": indYes,
                "demNo": demNo,
                "repNo": repNo,
                "indNo": indNo
            })
    });
    //console.log(votesData);
    //console.log("voteValues: :" + voteValues);
    //get min and max values of data to help determine scales
    //console.log("max Yes: " + Math.max(...voteValues));
    //console.log("min No: " + Math.min(...voteValues));

    /////////////STACK GENERATOR//////////////

    //create stack generator
    var stackGenYes = d3.stack()
        .keys(["demYes", "repYes", "indYes"]) //keys from votesData
        .order(d3.stackOrderDescending); //demYes, repYes, indYes
    //use generator to create data array
    var stackedSeries = stackGenYes(votesData);
    console.log(stackedSeries);

    //////////////APPEND SVG////////////////////

    //create g tags for each key
    var sel = d3.select("svg")
        .select('g')
        .selectAll('g.series') //series of values for each key
        .data(stackedSeries)
        .join('g')
        .classed('series', true)
        .style('fill', (d) => colorScale(d.key)); //assign color (initCharVars.js)
    sel.selectAll('rect')
        .data((d) => d)
        .join('rect')
        .attr('width', 40)
        .attr('y', (d) => yScale(d[1]))
        .attr('x', (d,i) => xScale(i))
        .attr('height', (d) => yScale(d[0]) - yScale(d[1]));
    
    //////////////////////////////////////

});
//console.log(votesData);
//console.log(votesData[0]);


d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json', function (gdpdata) {
    var x = 72.5, delay = 50, prev, duration = 500,
        months = { '01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December'};
   
    //create scales
    var yscale = d3.scaleLinear();
    var xscale = d3.scaleTime();
    
    //define scales
    yscale.domain([19000, 0]);
    yscale.range([0, 400]);
    xscale.domain([new Date(1947, 1, 1), new Date(2016, 1, 1)]);
    xscale.range([0, 800]);
    
    //create axes
    var yaxis = d3.axisLeft(yscale)
    var xaxis = d3.axisBottom(xscale);
    
    //create details window (little window that comes up on hover)
    var details = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('box-shadow', '1px 1px 2px 1px #111')
        .style('padding', '2px 4px')
        .style('visibility', 'hidden');
    
    //add <svg>
    var svg = d3.select('body')
        .append('svg')
        .attr('width', 900)
        .attr('height', 480)
        .style('background-color', '#fff')
        .style('box-shadow', '2px 2px 8px 4px #555');

    //add title for chart
    svg.append('text')
        .attr('x', 250)
        .attr('y', 50)
        .attr('font-family', 'Verdana')
        .attr('font-size', '35px')
        .text('United States - GDP');
    
    //add label for axis
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -350)
        .attr('y', 25)
        .attr('font-family', 'Verdana')
        .attr('font-size', '9px')
        .attr('opacity', 0)
        .text('United States gross domestic product in billions of dollars')
    //transition for label
    .transition()
        .duration(4000)
        .ease(d3.easeQuadOut)
        .delay(2000)
        .attr('opacity', 1);


    //add the y axis and labels
    svg.append('g') 
        .attr('transform', 'translate(75,20)')
        .call(yaxis)
        .attr('opacity', 0) 
    //tansition for axis & labels
    .transition()
        .duration(4000)
        .ease(d3.easeQuadOut)
        .delay(2000)
        .attr('opacity', 1);
    
    //add the x axis & labels
    svg.append('g')
        .attr('transform', 'translate(75, 420)')
        .call(xaxis)
        .attr('opacity', 0)
    //transition for axis & labels
    .transition()
        .duration(4000)
        .ease(d3.easeQuadOut)
        .delay(2000)
        .attr('opacity', 1);
    
    //add original <rect> 
    var rect = svg.selectAll('rect')
        .data(gdpdata.data)
        .enter().append('rect')
            .attr('x', function () { return x += 2.9; })
            .attr('y', function (d) { return yscale(d[1])+20; })
            .attr('width', 0)
            .attr('height', 0)
            .attr('cursor', 'crosshair')
            .style('stroke', 'black')
            .style('stroke-width', .5)
            .style('opacity', 0.7)
            .style('fill', function (d) {
                if(prev > d[1]) {
                prev = d[1]; return '#800000'; } else {
                prev = d[1]; return '#004d00'; }});

    //add opening transition for <rect>
    rect.transition()
        .duration( function () { return duration += 25; })
        .ease(d3.easeQuadOut)
        .delay( function () { return delay += 3; })
        .attr('height', function (d) { return 400 - yscale(d[1]); })
        .attr('width', 2.8);
    
    //add the hover effect
    rect.on('mouseover', function (d) {
        d3.select(this).style("opacity", 1);

    var year = d[0].split("-")[0];
    var month = months[d[0].split("-")[1]];
        
    details.html(year + ',  ' + month + '<br><b>$' + d[1] + ' Billion<b>')
        .style('visibility', 'visible')
        .style('left', (d3.event.pageX - 70)+'px')
        .style('top', (d3.event.pageY - 30)+'px')
    }) //end .on(mouseover)
    .on('mouseout', function (d) {
        d3.select(this).style('opacity', 0.7);
        details.style('visibility', 'hidden');
    }); 
}); //end d3.json
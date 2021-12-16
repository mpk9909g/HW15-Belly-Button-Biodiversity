// HW 15 java script

console.log("HW 15 Javascript");
console.log("app.js is loaded");

// build BAR chart
function barChart(inputObject) {
  let otu_otu_ids = [];
  inputObject.otu_ids.forEach(function(id) {
    otu_otu_ids.push("OTU " + id);
  });


  let xBar = inputObject.sample_values.slice(0,9).reverse();
  let yBar = otu_otu_ids.slice(0,9).reverse();
  let barText = inputObject.otu_labels.slice(0,9).reverse();

  // Trace1 for the bar Data
  let trace1 = {
    x: xBar,
    y: yBar,
    text: barText,
    name: "Sample",
    type: "bar",
    orientation: "h"
  };

  // data
  let plotData = [trace1];

  // Apply the group bar mode to the layout
  let layout = {
    title: "Top 10 Bacteria Cultures Found",
    margin: {
      l: 80,
      r: 80,
      t: 80,
      b: 80
    }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", plotData, layout);

}




function optionChanged(id) {
  console.log(`optionChanged ${id}`);

  barChart(filteredObject);
  //DrawBubblechart(id);
}

optionChanged();




d3.json("samples.json").then(function(data) {
  //console.log(importedData);
  //console.log(data);

  // re-organize the json data into an array
  let samples = data.samples;
  
  dataArray = [];
  for (let i = 0; i < samples.length; i++) {
    let o = {};
    o.id = samples.map(o => o.id)[i];
    o.otu_ids = samples.map(o => o.otu_ids)[i];
    o.otu_labels = samples.map(o => o.otu_labels)[i];
    o.sample_values = samples.map(o => o.sample_values)[i];
    o.demograph = data.metadata[i];
    //console.log(o);
    dataArray.push(o);
    //console.log(newData);
    
  };

  // console.log("newData:");
  // console.log(dataArray[0]);

  ids = data.names;
  
  // console.log("ids are:");
  // console.log(ids);

  // put the ids into the dropdown menu
  d3.select("#selDataset").selectAll("option")
    .data(ids)
    .enter()
    .append("option")
    .html(function(d) {
      return `<option value="${d}">${d}</option>`

  });
  


  // Assign the value of the dropdown menu option to a variable
  //let dropID = dropdownMenu.node().value;
  let dropdownMenu = d3.select("#selDataset");
  let dropdownMenuID = dropdownMenu.property("id");
  let selectedID = dropdownMenu.property("value");


  // create a filter function to filter the data
  function filterSubject(subject) {
    return subject.id === selectedID;
  }

  // 2. Use filter() to pass the function as its argument
  let filteredObject = dataArray.filter(filterSubject)[0];

  console.log("filteredObject:");
  console.log(filteredObject);
  
  

  //populate the Demographic info section
  function buildDemograph(inputObject) {
    let demo = d3.select("#sample-metadata");
    
 
    //trow = table.text(inputObject.demograph.key);
    //trow = table.text(inputObject.demograph.id)
    Object.entries(inputObject).forEach(([key, value]) => demo.append("div").text(`${key}: ${value}`));
  }
  buildDemograph(filteredObject.demograph);






  barChart(filteredObject);

  // build BUBBLE chart
  function bubbleChart(inputObject) {

    let xBubble = inputObject.otu_ids;
    let yBubble = inputObject.sample_values;
    let markerSize = inputObject.sample_values;
    let markerColor = inputObject.otu_ids;
    let bubbleText = inputObject.otu_labels;

    // console.log("markerSize:");
    // console.log(markerSize);

    // Trace1 for the bubble Data
    let trace1 = {
      x: xBubble,
      y: yBubble,
      mode: "markers",
      text: bubbleText,
      marker: {
        color: markerColor,
        size: markerSize
      },
      type: "bubble"

    };

    // data
    let plotData = [trace1];

    // Apply the group bar mode to the layout
    let layout = {
      title: "Bacteria Cultures Per Sample",
      margin: {
        l: 80,
        r: 80,
        t: 80,
        b: 80
      },
      // showlegend: false,
      // height: 600,
      // width: 600
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bubble", plotData, layout);

  }
  bubbleChart(filteredObject);







});











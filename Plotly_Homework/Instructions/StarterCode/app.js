d3.json("samples.json").then(function(data) {
  console.log(data)
});

function buildPlot() {
  d3.json("samples.json").then(function(data) {
    var name = data.name
  })
}






function init() {  
  // reference the dropdown element  
  var selector = d3.select("#selDataset");
  // Use names to fill the dropdown box  
  d3.json("samples.json").then((data) => {    
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {      
      selector.append("option")        
      .text(sample)        
      .property("value", sample);    
    });
    // build plot with first sample    
    var sampleOne = sampleNames[0];    
    // buildCharts(firstSample);    
    buildMetadata(sampleOne);  
  });}


// Initialize the dashboard
init();
function optionChanged(newSample) {  
  // Get new data when changing name (id)  
  buildMetadata(newSample);  
  //buildCharts(newSample);  
}

//Demographics Panel 
function buildMetadata(sample) {  
  d3.json("samples.json").then((data) => {    
    var metadata = data.metadata;    
    // filter data by sample name    
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);   
     var result = resultArray[0];       
     // d3.select id - `#sample-metadata`    
     var PANEL = d3.select("#sample-metadata");
    // clear metadata using .html()  
    PANEL.html("");
    // Add Key and Value using `Object.entries`        
    Object.entries(result).forEach(([key, value]) => {      
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);    
    });
  });
}
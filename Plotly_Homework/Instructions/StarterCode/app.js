d3.json("samples.json").then(function(data) {
  console.log(data)
});

function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;

    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0]

    var values = result.sample_values;
    var otu_ids = result.otu_ids; //slice(0,10).reverse();
    var otu_labels = result.otu_labels;  //.slice(0,10).reverse()

    var barData = {
      x: values.slice(0,10).reverse(), 
      y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: 'h'
    };
    
    var databar = [barData];
    
    var layout = {
      title: "Top 10 Bacteria Cultures"
    };
    
    Plotly.newPlot("bar", databar, layout);


    // Creating the bubble data
    var bubbleData = {
      x: otu_ids, 
      y: values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: values,
        color: otu_ids,
        colorscale: "Earth"
    }

    };
    
    var databubble = [bubbleData];
    
    var bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      hovermode: "closest",
      xaxis: {title: "OTU ID"},
      margin : {t : 30}
    };
    
    Plotly.newPlot("bubble", databubble, bubbleLayout);


     
  })
}

// samples:[{
//   "id": "940",
//   "otu_ids": [1167, 2859, 482],
//   "sample_values": [163, 126, 113],
//   "otu_labels": ["Bacteria;Bacteroidetes;Bacteroidia;Bacteroidales;Porphyromonadaceae;Porphyromonas", "Bacteria;Firmicutes;Clostridia;Clostridiales;IncertaeSedisXI;Peptoniphilus", "Bacteria",] 
// }]




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
  buildCharts(newSample);  
  console.log(newSample)
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
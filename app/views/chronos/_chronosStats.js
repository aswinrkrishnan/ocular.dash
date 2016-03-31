$(function(){
	var data = JSON.parse($("#jobListData").text())
	var heatMap = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0};
	var time;
	data.forEach(function(obj) {
		if(obj.lastError.trim()>obj.lastSuccess.trim())
          heatMap[new Date(obj.lastError).getHours()] += 1
        else if(obj.lastError.trim()<obj.lastSuccess.trim())
          heatMap[new Date(obj.lastSuccess).getHours()] += 1
	});
	var valueArray=[];
	for(var i =0;i<24;i++){
        valueArray.push(heatMap[i]);
		//console.log(i+" : "+heatMap[i])
	}
	console.log(valueArray)


var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
// This will get the first returned node in the jQuery collection.
var areaChart = new Chart(areaChartCanvas);

var areaChartData = {
  labels: Object.keys(heatMap),
  datasets: [
    {
      label: "Chronos Jobs",
      fillColor: "#2c89c6",
      strokeColor: "#2c89c6",
      pointColor: "#2c89c6",
      pointStrokeColor: "#2c89c6",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: valueArray
    }
  ]
};

var areaChartOptions = {
  //Boolean - If we should show the scale at all
  showScale: true,
  //Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines: false,
  //String - Colour of the grid lines
  scaleGridLineColor: "rgba(0,0,0,.05)",
  //Number - Width of the grid lines
  scaleGridLineWidth: 1,
  //Boolean - Whether to show horizontal lines (except X axis)
  scaleShowHorizontalLines: true,
  //Boolean - Whether to show vertical lines (except Y axis)
  scaleShowVerticalLines: true,
  //Boolean - Whether the line is curved between points
  bezierCurve: true,
  //Number - Tension of the bezier curve between points
  bezierCurveTension: 0.3,
  //Boolean - Whether to show a dot for each point
  pointDot: false,
  //Number - Radius of each point dot in pixels
  pointDotRadius: 4,
  //Number - Pixel width of point dot stroke
  pointDotStrokeWidth: 1,
  //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
  pointHitDetectionRadius: 20,
  //Boolean - Whether to show a stroke for datasets
  datasetStroke: true,
  //Number - Pixel width of dataset stroke
  datasetStrokeWidth: 2,
  //Boolean - Whether to fill the dataset with a color
  datasetFill: true,
  //String - A legend template
  //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
  maintainAspectRatio: true,
  //Boolean - whether to make the chart responsive to window resizing
  responsive: true
};
areaChart.Line(areaChartData, areaChartOptions);
      
})
function timeDifference(previous) {
	if(previous == ""){return "No Previous runs";}
	var msPerMinute = 60 * 1000;
	var msPerHour = msPerMinute * 60;
	var msPerDay = msPerHour * 24;
	var elapsed = new Date - new Date(previous);
	if (elapsed < msPerMinute) return Math.round(elapsed/1000) + ' seconds ago';
	else if (elapsed < msPerHour) return Math.round(elapsed/msPerMinute) + ' minutes ago';
	else if (elapsed < msPerDay ) return Math.round(elapsed/msPerHour ) + ' hours ago';
	else return new Date(previous)+"";
}
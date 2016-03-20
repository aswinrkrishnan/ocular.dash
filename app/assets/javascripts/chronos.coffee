# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

# $('#jobList tr th').click(function(){
#   $("#jobList tr th i").removeClass();
#   $("#jobList tr th i").addClass("fa fa-sort");
# $("i",this).removeClass("fa-sort");
# $("i",this).addClass("fa-sort-asc");
#  var table = $(this).parents('table').eq(0)
#  var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
#  this.asc = !this.asc
#  if (!this.asc){$("i",this).toggleClass("fa-sort-asc fa-sort-desc");rows = rows.reverse()}
#  for (var i = 0; i < rows.length; i++){table.append(rows[i])}
# })
#function comparer(index) {
#  return function(a, b) {
#   var valA = getCellValue(a, index), valB = getCellValue(b, index)
#   return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
#  }
# }
#function getCellValue(row, index){ return $(row).children('td').eq(index).html() }
#$("#job_search").keyup(function() {
# var value = this.value;
# $("#jobList").find("tr").each(function(index) {
#   if (!index) return;
#   var id = $(this).find("td").text();
#   $(this).toggle(id.indexOf(value) !== -1);
# });
#});
#);
#function convertDate(date){
#    return new Date(date)
#}
#function filterTable(value){
# if(value == 'all'){
#   $('#jobList tbody tr').show();
# }else{
#   $('#jobList tbody tr').show();
#   $('#jobList tbody tr').hide();
#   $('#jobList tr td:contains("'+value+'")').parent().toggle();
# }

#function convertDate(){
#     $(".lastRunDate").each(function() {
#         var date = $(this).text();
#         alert(date);
#         $(this).text(new Date(date));
#     });
#}

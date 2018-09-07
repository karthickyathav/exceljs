
function exportAsExcel(table_id,file_name,exclude_class){
  var table = $('#'+table_id);
  var f = table.clone();
  f.find("tr ."+exclude_class).remove();
  var excelSrc = f[0];
  var link = document.createElement("a");
  link.href = convertToExcel(excelSrc.outerHTML);
  link.download = file_name+".xls";
  link.click();
}

var convertToExcel = (function(){
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>{table}</body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(htmlObj) {
    var ctx = {worksheet: name || 'Worksheet', table: htmlObj}
    return src = uri + base64(format(template, ctx));
  }
})()
<html>
<head>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>

<!------ Include the above in your HEAD tag ---------->
</head>
<body>
<script>
function getMonday(d) {
  d = new Date(d);
  var day = d.getDay();
   var diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}
$(document).ready(function () {
	
	var today = new Date();
	var monday = getMonday(today);
	var day = monday.getDate();
	var mon = document.getElementById("mon");
	mon.innerHTML = day+ " MON";
	var tue = document.getElementById("tue");
	tue.innerHTML = (day+1)+" TUE";
	var wed = document.getElementById("wed");
	wed.innerHTML = (day+2)+" WED";
	var thu = document.getElementById("thu");
	thu.innerHTML = (day+3)+" THU";
	var fri = document.getElementById("fri");
	fri.innerHTML = (day+4)+" FRI";
    var counter = 0;
	var counter2=0;
	
    $("#addrow").on("click", function () {
        var newRow = $("<tr>");
        var cols = "";

        cols += '<td><input type="text" class="form-control" value="ss" name="name' + counter + '"/></td>';
        cols += '<td><input type="text" class="form-control" name="mail' + counter + '"/></td>';

        cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';
        newRow.append(cols);
        $("#clienttable").append(newRow);
        counter++;
    });



    $("#clienttable").on("click", ".ibtnDel", function (event) {
        $(this).closest("tr").remove();       
        counter -= 1
    });

$("#addrowtocalendar").on("click", function () {
        var newRow = $("<tr>");
        var cols = "";

        cols += "<td><div id='test"+counter2+"' onclick='nameClicked(this)'>"+counter2+"</div><input type='text' id='testq"+counter2+"' style='display:none' value='"+counter2+"' onfocusout='switchInput(this)' onchange='updateName(this)' class='form-control' /></td>";
        cols += '<td>'+counter2+'</td>';
		cols += '<td>'+counter2+'</td>';
		cols += '<td>'+counter2+'</td>';
		cols += '<td>'+counter2+'</td>';
		cols += '<td>'+counter2+'</td>';

        cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';
        newRow.append(cols);
        $("#calendar").append(newRow);
        counter2++;
    });
	$("#calendar").on("click", ".ibtnDel", function (event) {
        $(this).closest("tr").remove();       
        counter2 -= 1
    });

});
function nameClicked(n)
{
	n.setAttribute("style","display:none;");
	var nth = n.parentNode.parentNode.rowIndex-2;
	console.log(nth);
	 var testq = document.getElementById("testq"+nth);
	
	testq.setAttribute("style","display:block;");
	testq.focus(); 
}
function updateName(n)
{
	var nth = n.parentNode.parentNode.rowIndex-2;
	var ttest = document.getElementById("test"+nth);
	ttest.innerHTML = n.value;
	
	
	
}
function switchInput(n)
{
	var nth = n.parentNode.parentNode.rowIndex-2;
	var ttest = document.getElementById("test"+nth);
	ttest.setAttribute("style","display:block;");
	n.setAttribute("style","display:none;");
}
</script>
<div class="container">
	<table id="calendar" class=" table order-list">
		<thead>
			<tr>
				<td>logo</td>
				<td id='mon'>MON</td>
				<td id='tue'>TUE</td>
				<td id='wed'>WED</td>
				<td id='thu'>THU</td>
				<td id='fri'>FRI</td>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="col-sm-4">
					<input type="text" name="name" class="form-control" />
				</td>
				<td class="col-sm-4">
				m
				</td>
				<td class="col-sm-4">
				m
				</td>
				<td class="col-sm-4">
				m
				</td>
				<td class="col-sm-4">
				m
				</td>
				<td class="col-sm-4">
				m
				</td>
				<td class="col-sm-2"><a class="deleteRow"></a>

				</td>
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<td colspan="5" style="text-align: left;">
					<input type="button" class="btn btn-lg btn-block " id="addrowtocalendar" value="Add Row" />
				</td>
			</tr>
			<tr>
			</tr>
		</tfoot>
	</table>
</div>
	<div class="container">
		<table id="clienttable" class=" table order-list">
		<thead>
			<tr>
				<td>Client</td>
				<td>Team Members</td>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="col-sm-4">
					<input type="text" name="name" class="form-control" />
				</td>
				<td class="col-sm-4">
					<input type="mail" name="mail"  class="form-control"/>
				</td>
				</td>
				<td class="col-sm-2"><a class="deleteRow"></a>

				</td>
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<td colspan="5" style="text-align: left;">
					<input type="button" class="btn btn-lg btn-block " id="addrow" value="Add Row" />
				</td>
			</tr>
			<tr>
			</tr>
		</tfoot>
	</table>
	</div>
</body>
</html>
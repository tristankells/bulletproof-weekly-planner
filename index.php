
<html>
<?php
require_once ("../../conf/settings.php"); //please make sure the path is correct
 // complete your answer here
 $conn = @mysqli_connect($host,
		$user,
		$pswd,
		$dbnm
	);
	if (!$conn) {
			echo "<p>Database connection failure</p>";
	} else {
		$createquery = "CREATE TABLE IF NOT EXISTS glance (
		  glance_id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
		  name VARCHAR(45) DEFAULT NULL,
		  mon VARCHAR(45) DEFAULT NULL,
		  tue varchar(40) DEFAULT NULL,
		  wed VARCHAR(40) DEFAULT NULL,
		  thu VARCHAR(40) DEFAULT NULL,
		  fri VARCHAR(40) DEFAULT NULL
		)";
		$result = mysqli_query($conn, $createquery);
		if (!$result) {
				echo "<p>Something is wrong with creating table",	mysqli_error($conn), "</p>";
			}
			else
			{
				mysqli_free_result($result);
			}
			mysqli_close($conn);
	}
	
?>
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
	var counter2= $('#calendar tr').length-2;
	
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
	var nth = n.parentNode.parentNode.rowIndex;
	console.log(nth);
	 var testq = document.getElementById("testq"+nth);
	
	testq.setAttribute("style","display:block;");
	testq.focus(); 
}
function updateName(n)
{
	var nth = n.parentNode.parentNode.rowIndex;
	var ttest = document.getElementById("test"+nth);
	ttest.innerHTML = n.value;
	
	
	
}
function switchInput(n)
{
	var nth = n.parentNode.parentNode.rowIndex;
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
			<?php
		 	require_once ("../../conf/settings.php"); //please make sure the path is correct
			 // complete your answer here
			 $conn = @mysqli_connect($host,
					$user,
					$pswd,
					$dbnm
				);
				if (!$conn) {
						echo "<p>Database connection failure</p>";
				} else {
					$createquery = "SELECT * from glance";
					$result = mysqli_query($conn, $createquery);
					if (!$result) {
									echo "<p>Something is wrong with selecting table",	mysqli_error($conn),  "</p>";
								}
								else
								{
									$cnt=1;
										 while ($row = mysqli_fetch_assoc($result)){
									echo "<tr>";
									echo "<td><div id='test".$cnt."' onclick='nameClicked(this)'>".$row["name"]."</div><input type='text' id='testq".$cnt."' style='display:none' value='".$row["name"]."' onfocusout='switchInput(this)' onchange='updateName(this)' class='form-control' /></td>";
									echo "<td>",$row["mon"],"</td>";
									echo "<td>",$row["tue"],"</td>";
									echo "<td>",$row["wed"],"</td>";
									echo "<td>",$row["thu"],"</td>";
									echo "<td>",$row["fri"],"</td>";
									echo "</tr>";
									$cnt++;
										 }
									mysqli_free_result($result);
								}
								mysqli_close($conn);
				}
			 
			?>
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
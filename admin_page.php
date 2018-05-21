<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Glance</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        
        <!--Adds the cursor move icon when the cursor is over a tr (row) element nestled in a tbody element -->
        <style> 
    tbody tr{
      cursor: move; 
      }

      .role{
        font-style: italic;
      }
      </style>
    </head>
    <body>
        <?php
include 'variables.php' //Contains current month for righ aligned display, and the days of the month, for the current days of the week;
?>
        <script>
            $(document).ready(function () { //Load the jquery when document is fully loaded

                //Hard coded test variables for clients and consultants
                var clients =
                        ["Aut",
                            "Bulletproof",
                            "Wednesdays"];
                var consultants =
                        ["Daniel Wood",
                            "Junha Yu",
                            "Tristan Kells"];

                //Count of tables row, for use in row ID
                var consultantCount = 0; //
                var clientCount = 0; //

                //Create consultant table from the starting array of consultants
                for (i = 0; i < consultants.length; i++)
                {
                    addConsultantRow(consultants[i]);
                }

                //Create client table from the starting list of clients
                for (i = 0; i < clients.length; i++)
                {
                    addClientRow(clients[i]);
                }

                //Create a consultatn row when the add new consultant button is pressed
                $("#addconsultant").click(function () { //Add a click event to the button with the addconsultant ID
                    addConsultantRow("Test");
                });

                //Create a client row when the add new client button is pressed
                $("#addclient").click(function () { //Add a click event to the button with the addclient ID
                    addClientRow("Test");
                });

                //Deletes a consultant row and decreases the current table count
                $("#consultanttable").on("click", "#removeConsultantButton", function () {
                    $(this).closest("tr").remove();
                    consultantCount--;

                });

                //Deletes a client row and decreases the current table count
                $("#clienttable").on("click", "#removeClientButton", function () {
                    $(this).closest("tr").remove();
                    clientCount--;
                });

                //When the name of a client or consultant is clicked, make that text editable.
                $(document).on('click', '.row_data', function(event) 
	{
		event.preventDefault(); 

		if($(this).attr('edit_type') == 'button')
		{
			return false; 
		}

		//make div editable
		$(this).closest('div').attr('contenteditable', 'true');
	
		$(this).focus();
    });

                //Function to create consultant row. Takes consultant name as argument (NEED TO ADD ALLOCATION AT A LATER STAGE AS AN ARGUEMENT?)
                function addConsultantRow(consultantName) {
                    consultantCount++; //Increase consultant count by one
                    var id = 'consultant' + consultantCount; //Create the consultant ID
                    var consultantRow = "<tr id='" + id + "'><td><div class='row_data' edit_type='click'>"+ consultantName +"</div><br><div class='role row_data' edit_type='click'>Developer</div></td>"; //Start html for new client row
                    for (z = 0; z < 5; z++) { //Create 5 columns for the new client row, with client dropdowns
                        consultantRow += "<td>";
                        consultantRow += "<select class='form-control' id='clientdropdown'>";
                        consultantRow += "<option></option>";
                        for (x = 0; x < clients.length; x++) { //loop through number of clients to populate dropdown
                            consultantRow += "<option value=" + clients[x] + ">" + clients[x] + "</option>";
                        }
                        consultantRow += "</td>";
                    }
                    consultantRow += "<td><input type='button' class='btn-failure btn-lg' id='removeConsultantButton' value='Remove'/></td>"; //Add a delete button the the consultant row
                    consultantRow += "</tr>"; //Finish the html for new client row
                    $("#consultanttable").append(consultantRow); //Add html for consultatnt table to the div with the id consultanttable
                }

                //Function to create new client row. Takes client name as arguement.
                function addClientRow(clientName) {
                    clientCount++; //Increase the number of rows in table
                    var id = "client" + clientCount; //Create row id
                    var clientRow = "<tr id='" + id + "' draggable='true'>"; //Start row html
                    clientRow += "<td ><div class='row_data' edit_type='click'>" + clientName + "</div></td>"; // Add consultant name and a click event passing the bonx to the nameClicked function
                    clientRow += "<td></td>"; // Add empty allocation colunm
                    clientRow += "<td><input type='button' class='btn-failure btn-lg' id='removeClientButton' value='Remove'/></td>";
                    clientRow += "</tr>"; //End row html
                    $("#clienttable").append(clientRow);
                }
                
                $("tbody").sortable(); //Using the jquery UI library, makes items within tbody elements sortable
                $(".contatiner-fluid").attr('contenteditable','true');

            });
        </script>

        <div class="container-fluid"> <!-- Fluid container holding whole page -->
            <!-- Whole page header -->
            <img class="img-fluid" src="https://static1.squarespace.com/static/57727b24d2b85749fa68ec2b/t/5824b0ee1b631b02ca73a72b/1501795207441/" alt="Glance">
            <div class="row">
                <div class="col-8" > <!-- Container holding both tables -->
                    <h2>Consultant table</h2>  <!-- Consultant table header -->
                    <table class="table" >
                        <thead> <!-- Consultants table headers-->
                            <tr>
                                <th>Consultant</th>
                                <!--The below php retrives the day of the month for the currents weeks days.-->
                                <th><?php echo $days[0]; ?> <br>MON</th>
                                <th><?php echo $days[1]; ?> <br>TUE</th>
                                <th><?php echo $days[2]; ?> <br>WED</th>
                                <th><?php echo $days[3]; ?> <br>THU</th>
                                <th><?php echo $days[4]; ?> <br>FRI</th>
                            </tr>
                        </thead>
                        <tbody id="consultanttable">

                        </tbody>
                        <tr id="lastconsultantrow"> <!-- The last table row-->
                            <td > <!--Adds the "Add client" button the to the bottom of the table"-->
                                <input type="button" class="btn-success btn-lg  " id="addconsultant" value="Add Consultant" />
                            </td>
                        </tr>
                    </table>

                    <div class="row">   <!-- Container holding the client table -->
                        <div class="col-8">
                            <h2>Client Table</h2>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Client</th>
                                        <th>Team Members</th>
                                    </tr>
                                </thead>
                                <tbody id="clienttable">
                                </tbody>
                                <tr id="lastclientrow"> <!-- The last table row-->
                                    <td > <!--Adds the "Add client" button the to the bottom of the table"-->
                                        <input type="button" class="btn-success btn-lg  " id="addclient" value="Add Client" />
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-4"> <!--Empty container currently used to align the client table to a section of the bottom left of the page -->
                        </div>
                    </div>
                </div>
                <div class="col-4"> <!--Container holding right alinged section of page -->
                    <div class="display-1"> <?php echo date('M', $timestamp); ?></div> <!--Retrieve and display the current month-->
                </div>
            </div>
        </div>
    </body>
</html>

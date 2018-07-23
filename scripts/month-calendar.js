$(document).ready(function () {
    setUpMonthCalendar();

    
    function setUpMonthCalendar()
    {
        $('#monthtablebody').empty();
        $('#clienttablebody').empty();
        $('.custom-menu').empty();
        $.get("backend/getConsultantsAndClients_month.php", function (data) {

        var databaseResults = [],
            clients = [],
            consultants = [];

        databaseResults = JSON.parse(data); //Store consultant and client arrays recieved from server

        consultants = databaseResults[0]; //Store array of consultants

        clients = databaseResults[1]; //Store array of clients

        for (x in consultants) {
            addConsultantToMonthlyBoard(consultants[x]) //update consultant table by each row
        }

        addClientToMonthlyBoard(clients); //update client table
        });
    }
    //update consultant table by each row
    function addConsultantToMonthlyBoard(consultant) {
        var consultantHTML = "";

        consultantHTML = "<tr data-id='"+consultant['id']+"'>";
        consultantHTML += "<td>" + consultant['name'] + "</td>";
        for(var i=1;i<=4;i++) //Four weeks
        {
            var clientName="";
            var allocation = getAllocation(consultant['allocations'],i); //get allocation for the column if any
            if(allocation)
            {
                clientName= allocation["full_name"];
            }
            consultantHTML += "<td class='allocation'>"+clientName+"</td>";
        }
        consultantHTML += "</tr>";

        $("#monthtablebody").append(consultantHTML);
    }
    
    function getAllocation(allocations,col)
    {
        var allocation = {};

        for (y in allocations) 
        {
            allocation = allocations[y];
            if(allocation["allocation_slot"]==col) //if column is matching
            {
                return allocation;
            }
        }
        return null;
    }
    function addClientToMonthlyBoard(clients) {
        var clientHTML = "",
            listHtml = "";

        clientHTML = "<tr><td>";
        for (x in clients) {

            clientHTML += clients[x]['name'] + "<br>";
            listHtml += "<li data-action='" + clients[x]['id'] + "'>" + clients[x]['name'] + "</li>";

        }
        clientHTML += "</td></tr>";
         listHtml += "<li data-action='0' data-flag='1'>Delete</li>"; //delete option
        $("#clienttablebody").append(clientHTML);
        $(".custom-menu").append(listHtml);
    }

    // JAVASCRIPT (jQuery)

    // Trigger action when the contexmenu is about to be shown

    $("#monthtable").on("contextmenu", ".allocation", function (event) {
        $("#clicked").removeAttr('id'); 
        $(this).attr("id","clicked"); //targets this element for context action
        // Avoid the real one
        event.preventDefault();

        // Show contextmenu
        $(".custom-menu").finish().toggle(100).

            // In the right position (the mouse)
            css({
                top: event.pageY + "px",
                left: event.pageX + "px"
            });
    });


    // If the document is clicked somewhere
    $(document).bind("mousedown", function (e) {

        // If the clicked element is not the menu
        if (!$(e.target).parents(".custom-menu").length > 0) {
            $("#clicked").removeAttr('id');
            // Hide it
            $(".custom-menu").hide(100);
        }
    });
    
    $(".custom-menu").on("click","li", function() {
        var col = $('#clicked').index(); //column of the table
        var $tr = $('#clicked').closest('tr'); //consultant row
        var consultantId = $tr.data('id'); //consultant Id
        var clientId = $(this).data('action'); //client Id
        var isAdding = 1;
        if($(this).data('flag')==1) //if it is deleting
        {
            isAdding = 0;
        }
        //console.log("col "+col+" consultantId "+$tr.data('id')+" client "+clientId);
        
        $.post(
            'backend/updateAllocation_month.php',
            {
                col: col,
                clientId: clientId,
                consultantId: consultantId,
                isAdding : isAdding
            }, function (data) {
                if (data == 'success') {
                    setUpMonthCalendar(); //update the table
                    console.log('success');
                }
                else
                {
                    console.log(data);
                } 
            }
        )
        //clear up
        $("#clicked").removeAttr('id');
        // Hide it
        $(".custom-menu").hide(100);
    });



});
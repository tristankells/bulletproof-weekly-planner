class Client {
    constructor(client) {
        this.client = client;
       
        };

        render()  {
            var $rowElement = $();
            $rowElement = $("<tr></tr>");
            $rowElement.append("<td></td>")
                .html(client['full_name']);
            $rowElement.append("<td></td>").html(client['abbreviation']);
        }
}

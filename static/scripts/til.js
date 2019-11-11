$(document).ready(function(){
    $.get('../resources/til.jsonl', function(data){
        let mainDiv = $('.card-columns');
        // Get unique tags from the list of TILs
        let tagsToggler = $('#learning-tags');
        let tagsArray = [];
        let dataArray = data.split('\n');
        for (item of dataArray) {
            j = JSON.parse(item);
            
            // Get unique tags from the list of TILs
            for (tag of j['tags']){
                if (tagsArray.includes(tag)){
                    continue;
                } else {
                    tagsArray.push(tag);
                } 
            };
            
            // Add each TIL card to the card mosaic
            let cardDiv = $('<div>', {"class": "card", "data-tag": j['tags'].join(' ')});
            let cardHeader = $('<div>', {"class": "card-header"}).text(j['title']);
            let cardBody = $('<div>', {"class": "card-body"});
            let cardText = $('<p>', {"class": "card-text"}).text(j['body']);
            let cardFooter = $('<div>', {"class": "card-footer"}).text(moment(j['date']).format('MM/DD/YYYY'));

            cardBody.append(cardText);
            let card = cardDiv.append(cardHeader, cardBody, cardFooter);
            mainDiv.append(card);

        };
        
        // Add tags to the navigation
        let l = $('<div>', {"class": "nav-item"});
        let a = $('<a>', {"class": "nav-link", "onclick": "$('.card').removeClass('d-none');"}).text("SHOW ALL");
        tagsToggler.append(l.append(a));
        for (tag of tagsArray){
            let a = $('<a>', {"class": "nav-link", "onclick": "hide('"+tag+"')"}).text(tag.toUpperCase());
            tagsToggler.append(l.append(a));
        };
          
    });
});
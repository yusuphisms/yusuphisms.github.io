$(document).ready(function(){
    $.get('../resources/til.jsonl', function(data){
        let mainDiv = $('.card-columns');
        // Get unique tags from the list of TILs
        let tagsToggler = $('#learning-tags');
        let tagsArray = [];
        for (item of data.split('\n')) {
            j = JSON.parse(item);
            for (tag of j['tags']){
                if (tagsArray.includes(tag)){
                    continue;
                } else {
                    tagsArray.push(tag);
                } 
            };

        };
        
        // Add tags to the navigation
        for (tag of tagsArray){
            let l = $('<div>', {"class": "nav-item"});
            let a = $('<a>', {"class": "nav-link", "onclick": "hide('"+tag+"')"}).text(tag.toUpperCase());
            tagsToggler.append(l.append(a));
        };

        //Add each TIL card to the card mosaic
        for (i=0; i < data.split('\n').length; i++) {
            let dataArray = data.split('\n');
            let j = JSON.parse(dataArray[i]);

            let cardDiv = $('<div>', {"class": "card", "data-tag": j['tags'].join(' ')});
            let cardHeader = $('<div>', {"class": "card-header"}).text(j['title']);
            let cardBody = $('<div>', {"class": "card-body"});
            let cardText = $('<p>', {"class": "card-text"}).text(j['body']);
            let cardFooter = $('<div>', {"class": "card-footer"}).text(moment(j['date']).format('MM/DD/YYYY'));

            cardBody.append(cardText);
            let card = cardDiv.append(cardHeader, cardBody, cardFooter);
            mainDiv.append(card);

            
        };   
    });
});
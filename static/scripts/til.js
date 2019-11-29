$(document).ready(function(){
    $.get('/resources/til.jsonl', function(data){
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
        
        let tagToggle = $('.tagtoggle');
        a = $('<span>', {"id": "showall", "onclick": "handleShowAll()"}).text("SHOW ALL");
        tagToggle.append(a);
        for (tag of tagsArray){
            let a = $('<span>', {"id": ""+tag+"", "onclick": "handleTagClick('"+tag+"')"}).text(tag.toUpperCase());
            tagToggle.append(a);
        };

    });
});


var handleTagClick = function(t){
    $(".card").addClass('d-none'); //hides all the cards
    let selectedTag = $('#'+t)
    let selectedTagCards = $("[data-tag*='"+t+"']");
    selectedTagCards.toggleClass('d-none'); //unhides only the selected tag's cards
    
    let tagSpans = $('.tagtoggle').children();
    for (t of tagSpans){
        t.setAttribute("style", "");
    }
    selectedTag.css('font-weight', 'Bold');

}

var handleShowAll = function(){
    $('.card').removeClass('d-none');
    let tagSpans = $('.tagtoggle').children();
    for (t of tagSpans){
        t.setAttribute("style", "");
    }
}
$(document).ready(function(){
    console.log('eep')
    $.get('../resources/til.jsonl', function(data){
        let mainDiv = $('.card-columns');
        for (i=0; i < data.split('\n').length; i++) {
            console.log(JSON.parse(data.split('\n')[i])['body']);
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
/*
Get div with class="card-columns"
For each JSON in the jsonl, Create div with class="card" within that div
class="card" div needs three child divs: class="card-header", class="card-body", class="card-footer"
class="card-body" div needs one child <p class="card-text">
Map date to card-footer
Map title to card-header
map body to card-text
map tags to class="card" div's data-tag attribute separated by space


*/
// date, title, body, tags

{/* <div class="card" id="card" data-tag="python git">
                <div class="card-header">Woop woop</div>
                <div class="card-body">
                    <h5 class="card-title">🐍🐍</h5>
                    <p class="card-text">On this new day, I learned Python streaming.</p>
                </div>
                <div class="card-footer">my footer in my mouth</div>
            </div> */}
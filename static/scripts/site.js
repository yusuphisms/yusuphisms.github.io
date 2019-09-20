$(document).ready(function() {
    
    function navbarCallback() {
        // https://stackoverflow.com/a/35937170/12089420
        // $.each() iterates over the array, which in this case is the array
        // of li nodes under #navbar                                    
        $.each($('#navbar').find('li'), function() {
            // this = li item in the array. Find index of the li anchor tag's href 
            // attribute. If it exists, i.e. greater than -1, then return True 
            // boolean and set that li to active.
            let path = window.location.pathname;
            let listNode = this;

            function activeToggle() {                                            
                if (path == '/' && $(listNode).find('a').attr('href').indexOf('index') > -1) {
                    return true;
                } else if (window.location.pathname.indexOf(
                    // this scope goes back to window in this function
                    $(listNode).find('a').attr('href').split('/').slice(-1)[0]) > -1) {
                        return true;
                    } else {return false;};
                };

            $(this).toggleClass('active', activeToggle());
        });
    };
    // Load the navbar first, once complete run the callback so you can reference the navbar id
    $('#nav-placeholder').load('./templates/navbar.html', navbarCallback);

});

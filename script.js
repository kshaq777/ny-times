$("#search").on("click", function(event) {
    event.preventDefault();
    var searchTerm = $('#searchTerm').val();
    var startYear = $('#startYear').val();
    var endYear = $('#endYear').val();
    var recordLimit = $('#records').val();

    function queryBuilder() {
        var query = '';
        if (startYear.length) {
            query += '&begin_date=' + startYear  + '0101';
        }
        if (endYear.length) {
            query += '&end_date=' + endYear  + '0101';
        }

        return query;

    }

    var queryOptions = queryBuilder();

    var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ searchTerm + queryOptions + '&api-key=JoQ3NGGl0JBc224RZckel46gM7mMn8Ru';

    console.log(queryURL);
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    .then(function(response) {
            var results = response.response.docs;
            console.log(response);

            for (var i=0; i < recordLimit; i++) {

            var x = i + 1;    
            
            var title = $('<h3><span>' + x + ' <span>' + results[i].headline.main + '<h3>');
            var author = '';
            if (results[i].byline.original == null) {
                author = $('<p>' + results[i].news_desk + '<p>');
            }
            else {
                author = $('<p>' + results[i].byline.original + '<p>');
            }

            var abstract = $('<p>' + results[i].abstract + '<p>');

            $('#topArticles').append(title, author, abstract, '<hr>');
        }
    });
});

$("#clear").on("click", function(event) {
    $('#topArticles').empty();

    $('#searchTerm').val('');
    $('#startYear').val('');
    $('#endYear').val('');
    $('#records').val('');


});
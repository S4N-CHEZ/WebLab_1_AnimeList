const url = 'https://shikimori.one/api/animes?';
const urlImg = 'https://shikimori.one/';

$('button#Search').on('click', function (e) {
    Delete();

    var order = $('select#selectSort').val();
    var kind = $('select#selectKind').val();
    var status = $('select#selectStatus').val();
    var search = $('input#Text').val();
    var censored = $('select#selectCensorship').val();

    var newUrl = url + 'limit=50';
    if(order != 'no')
    {
        newUrl += '&order=' + order;
    }
    if(kind != 'no')
    {
        newUrl += '&kind=' + kind;
    }
    if(status != 'no')
    {
        newUrl += '&status=' + status;
    }
    if(censored != 'no')
    {
        newUrl += '&censored=' + censored;
    }
    if(search != '')
    {
        search = search.replace(/ /g,"_");
        newUrl += '&search=' + search;
    }
    
    function Delete()
    {
        $('div.blog-post').remove();
    }

    var request = new XMLHttpRequest();
    console.log(newUrl);

    request.open('GET', newUrl);
    request.responseType = 'json';
    request.send();

    request.onload = function () 
    {
        var result = request.response;
        console.log(result);
        
        for(var i = 0; i < result.length; i++){
            Add(
                result[i]['name'],
                result[i]['url'],
                urlImg + result[i]['image']['original'],
                result[i]['released_on']
            );
        }
    }

    e.stopPropagation();
});

function Add(name, url, urlToImage, released_on) {
    if(released_on == null){
        released_on = 'no info';
    }
    var otvet = $(
        '<div class="blog-post  wow fadeInUp">' +
        '<img class="img-responsive" src="' + urlToImage + '">' +
        '<h1>' + name + '</h1>' +
        '<span class="date-time">Релиз: ' + released_on + '</span>' +
        '<p></p>' +
        '<a href="' + urlImg + url + '" class="btn btn-upper btn-primary read-more">смотреть</a>' +
        '</div>'
    );
    $('div.Result').append(otvet);
}
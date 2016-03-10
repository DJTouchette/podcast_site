$(function() {

  $.ajax({
    url:'https://itunes.apple.com/us/rss/toppodcasts/limit=100/json',
    dataType: 'json',
    success: function(data){
      display(data);
      }
    });

  var btn = $('#btn');

  btn.on('click', function () {
    $('#main-screen').empty();
    $.ajax({
      url:'https://itunes.apple.com/ca/rss/toppodcasts/limit=12/explicit=true/json',
      dataType: 'json',
      success: function(data){
      display(data);
        }
      });
    });

    function getEpisode(id) {
      var url = ['https://itunes.apple.com/lookup?id=', id].join('');

      $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(data){
          episodeScreen(data);
          }
        });
    }

    function episodeScreen(data) {
      var dr = data.results[0];
      $('#main-screen').empty();

      var divCol8 = $('<div>').attr('class', 'col-xs-6');
      var divCol4 = $('<div>').attr('class', 'col-xs-6');
      var divRow = $('<div>').attr('class', 'row');
      var img = $('<img>').attr('class', 'podimgEpisode');
      var artist = $('<h1>');
      var title = $('<h2>');
      var itunes = $('<a>');
      var genre = $('<h4>');

      title.text( dr.collectionCensoredName );
      artist.text( dr.artistName );
      itunes.text( 'Check it out on Itunes' );
      itunes.attr( 'href', dr.collectionViewUrl );
      img.attr( 'src', dr.artworkUrl600 );
      genre.text(dr.primaryGenreName);

      $(divRow).appendTo('#main-screen');
      $(divCol4).appendTo(divRow);
      $(divCol4).prepend(img);
      $(divCol8).appendTo(divRow);
      $(title).appendTo(divCol8);
      $(artist).appendTo(divCol8);
      $(genre).appendTo(divCol8);
      $(itunes).appendTo(divCol8);


    }

    $('#search').on('click', function(event){
      event.preventDefault();
      searchTerm = $('#search-term').val().replace(' ', '+');
      var url = ['https://itunes.apple.com/search?term=', searchTerm,'&country=ca&entity=podcast'].join('');
      $(this).closest('form').find("input[type=text], textarea").val("");
      $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(data){
          episodeScreen(data);
          }
        });
      });

       function display(data) {
          var dfe = data.feed.entry;
            for (var i = 0; i < data.feed.entry.length; i++ ) {

              var divCol4 = $('<div>').attr('class', 'col-xs-4');
              var img = $('<img>').attr('class', 'podimg');
              var id = $('<data-id>');

              var url = dfe[i]['im:image'][1].label.slice(0, (dfe[i]['im:image'][1].label.length - 14));
              var urlDone = [url, '500x500.jpg'].join('');

              img.attr( 'src', urlDone );
              img.attr( 'data-id', dfe[i].id.attributes['im:id']);
              console.log(dfe[i].id.attributes['im:id']);

              $(divCol4).appendTo('#main-screen');
              $(img).appendTo(divCol4);
            }
            $( ".podimg" ).on('click', function () {
              var id = $(this).attr('data-id');
              getEpisode(id);
            });


      }







});

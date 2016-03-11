$(function() {

  function browse(){
    $.ajax({
      url:'https://itunes.apple.com/us/rss/toppodcasts/limit=90/json',
      dataType: 'json',
      success: function(data){
        display(data);
        }
      });
    }

    browse();

    $('#browse').on('click', function(){
      $('#main-screen').empty();
      browse();
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

    function getEpisode(id, summary) {
      var url = ['https://itunes.apple.com/lookup?id=', id].join('');
      $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(data){
          episodeScreen(data,summary);
          }
        });
    }

    function episodeScreen(data, summary) {
      var dr = data.results[0];
      var summaryEpisode = summary;
      $('#main-screen').empty();

      var divCol8 = $('<div>').attr('class', 'col-xs-6');
      var divCol4 = $('<div>').attr('class', 'col-xs-6');
      var divRow = $('<div>').attr('class', 'row');
      var img = $('<img>').attr('class', 'podimgEpisode');
      var artist = $('<h1>');
      var title = $('<h2>');
      var itunes = $('<a>');
      var genre = $('<h4>');
      var summaryTag = $('<p>');

      summaryTag.text( summaryEpisode );
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
      $(summaryTag).appendTo(divCol8);
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
              img.attr( 'data-summary', dfe[i].summary.label );

              $(divCol4).appendTo('#main-screen');
              $(img).appendTo(divCol4);
            }
            $( ".podimg" ).on('click', function () {
              var id = $(this).attr('data-id');
              var summary = $(this).attr('data-summary');
              getEpisode(id, summary);
            });

      }

      function genre() {
        for(var i = 1301; i < 1326; i++){
            if (i == 1302) {
              i = 1303;
            }
            if (i == 1302) {
              i = 1303;
            }
            if (i == 1306) {
              i = 1307;
            }
            if (i == 1308){
              i = 1309;
            }
            if (i == 1312){
              i = 1314;
            }
            if (i == 1317){
              i = 1318;
            }
            if (i == 1319){
              i = 1321;
            }
            if (i == 1322){
              i = 1323;
            }

            var url = ['https://itunes.apple.com/us/rss/toppodcasts/limit=2/genre=', i, '/explicit=true/json'].join('');

            $.ajax({
              url: url,
              dataType: 'json',
              success: function (data) {
              genreShow(data);
                }
              });
        }
      }

      $('#genre').on('click', function (){
        $('#main-screen').empty();
        genre();
      });

      function genreShow(data) {
        var dfe = data.feed.entry;
          for (var i = 0; i < data.feed.entry.length; i++ ) {

            var divCol4 = $('<div>').attr('class', 'col-xs-4');
            var img = $('<img>').attr('class', 'podimg');
            var id = $('<data-id>');
            var genre = $('<h3>');

            var url = dfe[i]['im:image'][1].label.slice(0, (dfe[i]['im:image'][1].label.length - 14));
            var urlDone = [url, '500x500.jpg'].join('');

            var text = data.feed.title.label.slice(13, data.feed.title.label.length);
            genre.text(text);
            img.attr( 'src', urlDone );
            img.attr( 'data-id', dfe[i].id.attributes['im:id']);

            $(divCol4).appendTo('#main-screen');
            $(img).appendTo(divCol4);
            $(genre).appendTo(divCol4);
          }

          $( ".podimg" ).on('click', function () {
            var id = $(this).attr('data-id');
            var summary = $(this).attr('data-summary');
            getEpisode(id, summary);
          });
      }

});

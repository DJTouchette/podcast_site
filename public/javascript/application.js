$(function() {

// Top 10 screen

  var btn = $('#btn');

  btn.on('click', function () {

    $.ajax({
      url:'https://itunes.apple.com/ca/rss/toppodcasts/limit=10/explicit=true/json',
      dataType: 'json',
      success: function(data){
        getInfo(data);
        }
      });

      //Search
    $.ajax({
      url:'https://itunes.apple.com/search?term=joe&country=ca&entity=podcast',
      dataType: 'jsonp',
      success: function(data){
        // console.log(data);
        }
      });
    });

    function getInfo(data) {
      $('#main-screen').empty();
      var dfe = data.feed.entry;

      for (var i = 0; i < data.feed.entry.length; i++ ) {

        var divCol8 = $('<div>').attr('class', 'col-xs-10');
        var divCol4 = $('<div>').attr('class', 'col-xs-2');
        var divRow = $('<div>').attr('class', 'row');
        var img = $('<img>').attr('class', 'podimg');
        var artist = $('<h4>');
        var title = $('<h2>');
        var id = $('<data-id>');


        title.text( dfe[i]['im:name'].label );
        artist.text( dfe[i]['im:artist'].label );
        img.attr( 'src', dfe[i]['im:image'][1].label );
        img.attr( 'data-id', dfe[i].id.attributes['im:id']);
        console.log(dfe[i].id.attributes['im:id']);

        $(divRow).appendTo('#main-screen');
        $(divCol4).appendTo(divRow);
        $(img).appendTo(divCol4);
        $(divCol8).appendTo(divRow);
        $(title).appendTo(divCol8);
        $(artist).appendTo(divCol8);

      }
      $( ".podimg" ).on('click', function () {
        var id = $(this).attr('data-id');
        getEpisode(id);
      });
       $( "#main-screen" ).slideToggle(800);
    }

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
      // var artist = dr.artistName;
      // var img = dr.artworkUrl600;
      // var itunes = dr.collectionViewUrl;
      // var genre = dr.primaryGenreName;
      // var title = dr.collectionCensoredName;
      console.log("i made it");
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


});

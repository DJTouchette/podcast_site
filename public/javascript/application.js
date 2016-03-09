$(function() {
  button = $('#btn');
  button.on('click', function () {
    console.log('btn clicked');
    $('#contacts').empty();
    //top 10
    $.ajax({
      url:'https://itunes.apple.com/ca/rss/toppodcasts/limit=10/explicit=true/json',
      dataType: 'json',
      success: function(data){
        $('#btn').css('color', 'red');
        console.log(data);
        }
      });

      //Search
    $.ajax({
      url:'https://itunes.apple.com/search?term=joe&country=ca&entity=podcast',
      dataType: 'jsonp',
      success: function(data){
        $('#btn').css('color', 'blue');
        console.log(data);
        }
      });
    });

    function getInfo() {

    }



});

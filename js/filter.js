var team = /[1-9]/i;
var cards = document.querySelector(".cards");
cards.addEventListener("click", function(e)
{
  team = RegExp(e.target.id, "i");
  $p( '.row' ).render( data, compiled );
  console.log(team);
});

var data = (function () {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "./data.json",
    'dataType': "json",
    'success': function (data) {
      json = data;
    }
  });
  return json;
})();

var directive = {
  '.col-md-4':{
    'user<-':{
      '.@class': "col-md-4 col-sm-6 col-xs-12 " + '#{user.team}',
      'span': 'user.name' ,
      'strong': 'user.title',
      '.mc-description' : 'user.bio',
      'img@src': "img/" + "#{user.id}" + ".jpg"
    },
    filter:function(a){
      return ( team ).test( a.item.team );
      //return ( /^a/i ).test( a.item.name );
    }
  }
};

var compiled = $p( '.row' ).compile( directive );
$p( '.row' ).render( data, compiled );

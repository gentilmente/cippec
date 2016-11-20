$(function() {
  $('.container').on('click', '.material-card > .mc-btn-action', function () {
    var card = $(this).parent('.material-card');
    var icon = $(this).children('i');
    icon.addClass('fa-spin-fast');

    if (card.hasClass('mc-active')) {
      card.removeClass('mc-active');
      window.setTimeout(function() {
        icon
        .removeClass('fa-arrow-left')
        .removeClass('fa-spin-fast')
        .addClass('fa-bars');
      }, 800);
    } else {
      card.addClass('mc-active');
      window.setTimeout(function() {
        icon
        .removeClass('fa-bars')
        .removeClass('fa-spin-fast')
        .addClass('fa-arrow-left');
      }, 800);
    }
  });
});
var optionSelected = null;
var team = /(10|11|[0-9])/;
var teams = document.querySelector(".teams");
teams.addEventListener("click", function(e)
{
  team = RegExp(e.target.id, "i");
  optionSelected = "byTeam1";
  $p( '.row' ).render( data, compiled );
});

// var teams2 = document.querySelector(".teams2");
// teams2.addEventListener("click", function(e)
// {
//   team = RegExp(e.target.id, "i");
//   optionSelected = "2";
//   $p( '.row' ).render( data, compiled );
// });

var byName = /[A-Z]/i;
function search(){
  byName = RegExp(document.getElementById("search").value,"i");
  optionSelected = "byName";
  $p( '.row' ).render( data, compiled );
};

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
      'span': 'user.name' ,
      'strong': 'user.title',
      '.mc-description' : 'user.bio',
      'img@src': "img/" + "#{user.id}" + ".jpg"
    },
    filter:function(a){

    var retVal = null;
    switch (optionSelected){
      case "byName": retVal = (byName).test( a.item.name );
      break;
      case "byTeam1": retVal = (team).test(a.item.team);
      break;
      case "byTeam2": retVal = (team).test(a.item.team);
      break;
      default: retVal = (team).test(a.item.team);
    }
    return retVal;
    }
  }
};

var compiled = $p( '.row' ).compile( directive );
$p( '.row' ).render( data, compiled );

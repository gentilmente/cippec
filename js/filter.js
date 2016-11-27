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
var cssColors = ['Red', 'Pink', 'Purple', 'Deep-Purple', 'Indigo', 'Blue',
'Light-Blue', 'Cyan', 'Teal', 'Green', 'Light-Green',
'Lime', 'Yellow', 'Amber', 'Orange', 'Deep-Orange', 'Brown',
'Grey', 'Blue-Grey'];
var rand = cssColors[Math.floor(Math.random() * cssColors.length)]
var optionSelected = null;
var team = /[\d++]/;
var team2 = null;
var teams = document.querySelector(".teams");
teams.addEventListener("click", function(e)
{
  team = RegExp("^" + e.target.id + "$");
  optionSelected = "byTeam1";
  $p( '.row' ).render( data, compiled );
});

var teams2 = document.querySelector(".teams2");
teams2.addEventListener("click", function(e)
{
  team2 = RegExp("^" + e.target.id + "$");
  optionSelected = "byTeam2";
  $p( '.row' ).render( data, compiled );
});

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
      'article@class+' : ' #{user.color}',
      'span': 'user.name' ,
      'strong': 'user.title',// + "<i class="fa fa-fw fa-star"></i>",
      '.mc-description' : 'user.bio',
      'img@src': "img/" + "#{user.id}" + ".jpg",
      '.fa-facebook@href': 'user.facebook',
      '.fa-twitter@href': 'user.twitter',
      '.fa-linkedin@href': 'user.linkedin',
      '.fa-at@href+': "#{user.email}" + "?subject=Mail desde el curso de CIPPEC&body=Hola%20"+"#{user.name}"+",%20te%20contacto%20por%20lo%20siguiente..."
    },
    filter:function(a){

    var retVal = null;
    switch (optionSelected){
      case "byName": retVal = (byName).test( a.item.name );
      break;
      case "byTeam1": retVal = (team).test(a.item.team);
      break;
      case "byTeam2": retVal = (team2).test(a.item.team2);
      break;
      default: retVal = (byName).test( a.item.name );
    }
    return retVal;
    }
  }
};

var compiled = $p( '.row' ).compile( directive );
$p( '.row' ).render( data, compiled );

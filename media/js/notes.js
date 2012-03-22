
var display_error = function(msg, elem) {
  var msg_div = $('<div class="error_msg"><p>'+msg+'</p></div>');
  msg_div.insertAfter(elem).fadeIn('slow').animate({opacity: 1.0}, 5000).fadeOut('slow',function() { msg_div.remove(); });
}; 

var display_success = function(msg, elem) {
  var msg_div = $('<div class="success_msg"><p>'+msg+'</p></div>');
  msg_div.insertAfter(elem).fadeIn('slow').animate({opacity: 1.0}, 5000).fadeOut('slow',function() { msg_div.remove(); });
};

$(document).ready(function() {
var done = function(res, status) {
  var txt = res.responseText;
  var data = eval('('+txt+')');
  if (status == "success") {
    var newLi = $('<li><a href="'+data.url+'">'+data.title+'</a></li>');
    $("#notes").prepend(newLi);
    $("#title").val("");
    $("#slug").val("");
  }
  else display_error(data.msg, $(".new"));
}

var create_note = function() {
  var title = $("#title").val()
  var slug = $("#slug").val()
  if (title != "" && slug != "") {
    var data = { title:title, slug:slug };
    var args = { type:"POST", url:"/ajax_create/", data:data, complete:done };
    $.ajax(args);
  }
  else {
    display_error("Requires values for both title and slug.", $(".new"));
  }
  return false;
};

var toggleSettingsMenu = function() {
    alert('settings menu toggled');
}

$("#create").click(create_note);

$(".settingsButton").click(toggleSettingsMenu);

$("#slug").keyup(function() {
    var slug = this.value;
    var complete = function(res, status) {
       if (status == "success") $("#slug").css('background-color','#A0A0FF');
       else $("#slug").css('background-color','#FFA0A0');
    }
    $.ajax({type:'GET', url:'/slug_available/', data:{'slug': slug }, complete:complete});
    });
});

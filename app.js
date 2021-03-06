$(function () {
  var w = $(window).width()
  var h = $(window).height()

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('player', {
      width: w,
      height: h,
      videoId: 'UXwNl9T-_4o',
      playerVars: {
        rel: 0,
        autoplay: 1,
        loop: 1,
        playlist: 'UXwNl9T-_4o',
      },
      events: {
        'onReady': onPlayerReady,
      }
    });
  }
  function onPlayerReady(event) {
    event.target.setVolume(0);
  }
});

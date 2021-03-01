
<body>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
  <script>
    ;

    function requestUserUploadsPlaylistId() {
      var request = gapi.client.youtube.channels.list({
      part: 'contentDetails',
        forUsername: 'GoogleDevelopers'
      });
      request.execute(function (response) {
        var playlistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
        requestVideoPlaylist(playlistId)
      });
    }

    function requestVideoPlaylist(playlistId) {
      var requestOptions = {
      playlistId: playlistId,
        part: 'snippet',
        maxResults: 10
      };
      var request = gapi.client.youtube.playlistItems.list(requestOptions);
      request.execute(function (response) {
        var playlistItems = response.result.items;
        if (playlistItems) {
      $.each(playlistItems, function (index, item) {
        displayResult(item.snippet);
      });
        } else {
      $('#video-container').html('Sorry you have no uploaded videos');
        }
      });
    }

    function displayResult(videoSnippet) {
      var title = videoSnippet.title;
      var videoId = videoSnippet.resourceId.videoId;
      $('body').append('<p>' + title + ' - ' + videoId + '</p>');
    }

    function googleApiClientReady() {
      gapi.client.setApiKey(API_KEY);
      gapi.client.load('youtube', 'v3', function () {
      requestUserUploadsPlaylistId();
      });
    }
  </script>
  <script src="https://apis.google.com/js/client.js?onload=googleApiClientReady"></script>
</body>
view rawuser_uploads_gapi.html hosted with ❤ by GitHub
gist.github.com

$.ajax を使う
Google APIのクライアントライブラリは不要です。
<body>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
  <script>
    var API_KEY = '__YOUR_API_KEY__';

    function requestUserUploadsPlaylistId() {
      $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/channels',
        type: 'GET',
        data: {
          key: API_KEY,
          part: 'contentDetails',
          forUsername: 'GoogleDevelopers'
        }
      }).done(function (data) {
        var playlistId = data.items[0].contentDetails.relatedPlaylists.uploads;
        requestVideoPlaylist(playlistId)
      });
    }

    function requestVideoPlaylist(playlistId) {
      $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/playlistItems',
        type: 'GET',
        data: {
          key: API_KEY,
          part: 'snippet',
          playlistId: playlistId,
          maxResults: 10
        }
      }).done(function (data) {
        var playlistItems = data.items;
        if (playlistItems) {
          $.each(playlistItems, function (index, item) {
            displayResult(item.snippet);
          });
        } else {
          $('#video-container').html('Sorry you have no uploaded videos');
        }
      });
    }

    function displayResult(videoSnippet) {
      var title = videoSnippet.title;
      var videoId = videoSnippet.resourceId.videoId;
      $('body').append('<p>' + title + ' - ' + videoId + '</p>');
    }

    requestUserUploadsPlaylistId();

  </script>
</body>

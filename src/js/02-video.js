import Player from '@vimeo/player';
let throttle = require('lodash.throttle');
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
let myStorage = localStorage;

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on(
  'timeupdate',
  throttle(event => {
    myStorage.setItem('videoplayer-current-time', event.seconds);
  }, 1000),
);

player.setCurrentTime(myStorage.getItem('videoplayer-current-time')).catch(function (error) {
  switch (error.name) {
    case 'RangeError':
      console.log('Wrong time!');
      break;

    default:
      console.log('Error!');
      break;
  }
});

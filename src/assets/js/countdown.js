(function () {
  var weddingDateUTC = Date.UTC(2021, 07, 27, 1, 30);
  function countdown() {
    var now = new Date();
    var nowUTC = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds());
    var delta = Math.max(0, weddingDateUTC - nowUTC);
    var days = Math.floor(delta / (1000 * 60 * 60 * 24));
    var hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((delta % (1000 * 60)) / 1000);
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    if (delta <= 0) {
      clearInterval(countdownInterval);
    }
  }
  var countdownInterval = setInterval(countdown, 1000);
  countdown();
})();

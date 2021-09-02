module.exports = getSeconds;

function getSeconds() {
  const second = 1000;
        minute = second * 60;
        hour = minute * 60;
        day = hour * 24;

        let birthday = "jun 06, 2021 00:00:00";
            countDown = new Date(birthday).getTime();
        let now = new Date().getTime();
        distance = countDown - now;
        seconds = Math.floor((distance % (minute)) / second);
        return seconds;
}

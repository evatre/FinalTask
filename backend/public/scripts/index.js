// COUNTDOWN TIMER

function getTimeRemaining(endtime) {
  const currentTime = new Date().getTime();
  const remainingTime = endtime - currentTime;
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
  const seconds = Math.floor((remainingTime / 1000) % 60);

  return {
    remainingTime,
    days,
    hours,
    minutes,
    seconds,
  };
}

  function initializeTimer(id, endtime) {
    const timer = $(id);
    const daysSpan = $(timer).find(".days");
    const hoursSpan = $(timer).find(".hours");
    const minutesSpan = $(timer).find(".minutes");
    const secondsSpan = $(timer).find(".seconds");

  function updateTimer() {
    const t = getTimeRemaining(endtime);

    
    daysSpan.html(t.days);
    hoursSpan.html(("0" + t.hours).slice(-2));
    minutesSpan.html(("0" + t.minutes).slice(-2));
    secondsSpan.html(("0" + t.seconds).slice(-2));

    if (t.remainingTime <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateTimer();
  const timeinterval = setInterval(updateTimer, 1000);
}

const summmitTime = new Date("October 14, 2022 09:00:00").getTime();
initializeTimer("#countdown-timer", summmitTime);

// STICKY-TOP NAVIGATION BAR

$(window).scroll(function () {
    if (
      window.scrollY > 700 &&
      window.matchMedia("(min-width: 1045px)").matches
    ) {
      $(".navbar").addClass("fixed-top");
      // add padding top to show content behind navbar
      navbar_height = $(".navbar").offsetHeight;
      document.body.style.paddingTop = -navbar_height + "px";
    } else {
      $(".navbar").removeClass("fixed-top");
      // remove padding top from body
      document.body.style.paddingTop = "0";
    }
  });


  // CLICK EVENT AFTER REGISTRATION AND PRESSING A SUBMIT BUTTON


$("#registration-form").submit(function(e) {
  e.preventDefault();

  let dataString = $(this).serialize();

  $.ajax({
    type: 'POST',
    url: '/registration',
    data: dataString,
    success: function(data) {
      const parsed = JSON.parse(data);
      let name = parsed.response.firstname;
      let text = `Thank you${name ? ", "  + name : ""}. Your application has been submitted. See you at the summit!`
      $(".registration-text").html("<h3>" + text + "</h3>");  
  },
    error: function(err) {
      // if error.status=500?
      let text = "Oh oh! Something went wrong!";
      $(".registration-text").html("<h3>" + text + "</h3>"); 
    }
      })
  })


// CLICK EVENT AFTER FILLING QUESTION FORM AND PRESSING SUBMIT BUTTON


$("#question-form").submit(function(e) {
  e.preventDefault();

  let dataString = $(this).serialize();

  $.ajax({
    type: 'POST',
    url: '/',
    data: dataString,
    success: function() { 
      $(".submit-btn").html("<i class='fa-solid fa-check'></i> SUBMITTED");
      $("#question-box").val("");
      $("#ask-us-email").val("");

  },
    error: function(err) {
      // todo - what happens on error
      
    }
      })
  })






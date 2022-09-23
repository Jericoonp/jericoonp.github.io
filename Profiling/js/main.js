let easeInOutQuint = t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t; // Easing function found at https://gist.github.com/gre/1650294

// With this attempt I tried to make the scroll by mouse wheel look smooth
let delay = ms => new Promise(res => setTimeout(res, ms));
let dy = 0;
window.addEventListener("wheel", async e => {

    // Prevent the default way to scroll the page
    e.preventDefault();

    dy += e.deltaY;
    let _dy = dy; // Store the value of "dy"
    await delay(150); // Wait for .15s

    // If the value hasn't changed during the delay, then scroll to "start + dy"
    if (_dy === dy) {
        let start = window.scrollY || window.pageYOffset;
        customScrollTo(start + dy, 600, easeInOutQuint);
        dy = 0;
    }
}, { passive: false });

function customScrollTo(to, duration, easingFunction) {
    let start = window.scrollY || window.pageYOffset;

    let time = Date.now();
    let timeElapsed = 0;

    let speed = (to - start) / duration;
    
    (function move() {

        if (timeElapsed > duration) {
            return;
        }

        timeElapsed = Date.now() - time;

        // Get the displacement of "y"
        let dy = speed * timeElapsed;
        let y = start + dy;

        // Map "y" into a range from 0 to 1
        let _y = (y - start) / (to - start);
        // Fit "_y" into a curve given by "easingFunction"
        _y = easingFunction(_y);
        // Expand "_y" into the original range
        y = start + (to - start) * _y;

        window.scrollTo(0, y);
        window.requestAnimationFrame(move);
    })();


    window.addEventListener('scroll', reveal);

    function reveal(){
      var reveals = document.querySelectorAll('.reveal');

      for(var i = 0; i < reveals.length; i++){

        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if(revealtop < windowheight - revealpoint){
          reveals[i].classList.add('active');
        }
        else{
          reveals[i].classList.remove('active');
        }
      }
    }
}

$(document).keydown(function (e) {

  switch(e.which) 
  {
       case 38:
           $('#goto_prev').trigger('click');
           break;
       case 40:
           $('#goto_next').trigger('click');
           break;
   }

});

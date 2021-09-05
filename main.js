const BASE_URL = "https://smartphoniker.osc-fr1.scalingo.io/api"
const CHECK_INTERVAL = 60000; // one minute
const counters = document.querySelectorAll('.counter');
const speed = 350; // The higher the slower

/**
 * Updates the counter data attribute
 */
function updateHTML(stats) {
    document.getElementById("repairs").dataset.target = stats.repairs;
    document.getElementById("glasses").dataset.target = stats.protection_glasses;
    document.getElementById("accessories").dataset.target = stats.accessories;
    document.getElementById("migrations").dataset.target = stats.migrations;
}

/**
 * Updates counters with a spinning counter animation
 */
function spin() {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            // Lower inc to slow and higher to slow
            // Also round inc to keep integers and not floats
            const inc = Math.ceil(target / speed);

            // Check if target is reached
            if (count < target) {
                // Add inc to count and output in counter
                counter.innerText = count + inc;
                // Call function every ms
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        // Reset counter to show the full animation again
        counter.innerText = 0;
        updateCount();
    });
}

/**
 * Fetches a list of available devices from the Smartphoniker web tool and displays them.
 */
function updateCounters() {
    fetch(`${BASE_URL}/stats`)
        .then(response => response.json())
        .then(result => {
            updateHTML(result);
            spin();
        }).catch(err => {
            console.error(err)
        });
}



document.addEventListener("DOMContentLoaded", function(event) {
    updateCounters();
    window.setInterval(function() {
        updateCounters();
    }, CHECK_INTERVAL);
});
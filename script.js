document.getElementById("getToday").addEventListener("click", function () {
fetch("https://api.aladhan.com/v1/timingsByCity?city=Krakow&country=Poland&method=2")
    .then(res => res.json())
    .then(data => {
      let output = "";
      let timings = data.data.timings;
      for (let key in timings) {
        output += `<p>${key}: ${timings[key]}</p>`;
      }
      document.getElementById("result").innerHTML = output;
    })
    .catch(err => console.log("Xeta:", err));
});

document.getElementById("getMonth").addEventListener("click", function () {
  fetch("https://api.aladhan.com/v1/calendar/2025/8?latitude=50.0647&longitude=19.9450&method=2")
    .then(res => res.json())
    .then(data => {
      let output = "<h2>Avqust 2025 - Namaz Vaxtlari (Krakow)</h2><ul>";
      
      data.data.forEach((day, index) => {
        const date = day.date.readable;
        const timings = day.timings;
        output += `
          <li>
            <strong>${date}</strong> → 
            Fajr: ${timings.Fajr}, 
            Dhuhr: ${timings.Dhuhr}, 
            Asr: ${timings.Asr}, 
            Maghrib: ${timings.Maghrib}, 
            Isha: ${timings.Isha}
          </li>
        `;
      });

      output += "</ul>";
      document.getElementById("result").innerHTML = output;
    })
    .catch(error => {
      console.error("Xeta baş verdi:", error);
      document.getElementById("result").innerHTML = "Namaz vaxtlari yükleene bilmedi.";
    });
});



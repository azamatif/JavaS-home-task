document.getElementById("getToday").addEventListener("click", function () {
  let day = document.getElementById("day").value;
  let month = document.getElementById("month").value;
  let year = document.getElementById("year").value;

  if (!day || !month || !year) return alert("Tarix daxil et");

  fetch(`https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=50.0647&longitude=19.9450&method=2`)
    .then(res => res.json())
    .then(data => {
      let timings = data.data[day - 1].timings;
      document.getElementById("result").innerHTML = `
        <h3>${day}.${month}.${year} tarixi ucun vaxtlar:</h3>
        <p>Fajr: ${timings.Fajr}</p>
        <p>Dhuhr: ${timings.Dhuhr}</p>
        <p>Asr: ${timings.Asr}</p>
        <p>Maghrib: ${timings.Maghrib}</p>
        <p>Isha: ${timings.Isha}</p>
      `;
    });
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



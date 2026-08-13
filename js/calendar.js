(function () {
  "use strict";

  const monthLabel = document.getElementById("calendarMonth");
  const datesGrid = document.getElementById("calendarDates");
  const daysGrid = document.getElementById("calendarDays");
  const selectedDateText = document.getElementById("selectedDateText");
  const dateContinue = document.getElementById("dateContinue");
  const prevMonthBtn = document.getElementById("prevMonth");
  const nextMonthBtn = document.getElementById("nextMonth");

  if (!monthLabel || !datesGrid || !daysGrid || !selectedDateText || !dateContinue) {
    return;
  }

  const now = window.App.getToday();
  let viewYear = now.getFullYear();
  let viewMonth = now.getMonth();

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  daysGrid.innerHTML = dayNames.map(function (day) {
    return "<span>" + day + "</span>";
  }).join("");

  function toISODate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  function isPastDate(date) {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return date < today;
  }

  function isAvailableByConfig(isoDate) {
    const availableDates = window.CONFIG.availableDates || [];
    const unavailableDates = window.CONFIG.unavailableDates || [];

    if (availableDates.length > 0) {
      return availableDates.indexOf(isoDate) > -1;
    }
    return unavailableDates.indexOf(isoDate) === -1;
  }

  function renderCalendar() {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const lastDay = new Date(viewYear, viewMonth + 1, 0);
    const startsOn = firstDay.getDay();
    const totalDays = lastDay.getDate();

    monthLabel.textContent = firstDay.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    });

    const cells = [];

    for (let i = 0; i < startsOn; i += 1) {
      cells.push('<div class="date-cell disabled" aria-hidden="true"></div>');
    }

    for (let day = 1; day <= totalDays; day += 1) {
      const date = new Date(viewYear, viewMonth, day);
      const iso = toISODate(date);
      const disabled = isPastDate(date) || !isAvailableByConfig(iso);
      const selected = window.dateData.date === iso;
      const isToday = iso === toISODate(now);
      const cls = [
        "date-cell",
        disabled ? "disabled" : "",
        isToday ? "today" : "",
        selected ? "selected" : ""
      ]
        .join(" ")
        .trim();

      cells.push(
        '<button type="button" class="' +
          cls +
          '" data-date="' +
          iso +
          '" ' +
          (disabled ? "disabled" : "") +
          ' aria-label="Choose ' +
          date.toDateString() +
          '">' +
          day +
          "</button>"
      );
    }

    datesGrid.innerHTML = cells.join("");

    const beforeCurrentMonth =
      viewYear < now.getFullYear() ||
      (viewYear === now.getFullYear() && viewMonth <= now.getMonth());
    prevMonthBtn.disabled = beforeCurrentMonth;
  }

  function updateSelectionLabel() {
    selectedDateText.textContent = "Selected date: " + window.App.formatHumanDate(window.dateData.date);
    dateContinue.disabled = !window.dateData.date;
    selectedDateText.classList.add("active");
    window.setTimeout(function () {
      selectedDateText.classList.remove("active");
    }, 280);
  }

  datesGrid.addEventListener("click", function (event) {
    const target = event.target;
    if (!target || !target.matches(".date-cell") || target.disabled) {
      return;
    }

    window.dateData.date = target.getAttribute("data-date");
    renderCalendar();
    updateSelectionLabel();
    window.App.updateTicket();
  });

  prevMonthBtn.addEventListener("click", function () {
    viewMonth -= 1;
    if (viewMonth < 0) {
      viewMonth = 11;
      viewYear -= 1;
    }
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", function () {
    viewMonth += 1;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear += 1;
    }
    renderCalendar();
  });

  renderCalendar();
  updateSelectionLabel();
})();

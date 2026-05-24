import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

document.addEventListener('DOMContentLoaded', () => {

  // --- STATE ---
  let selectedMood = null;
  const moods = ['very-bad', 'bad', 'okay', 'good', 'great'];
  const moodLabels = { 'very-bad': 'Sangat Buruk', 'bad': 'Buruk', 'okay': 'Biasa Saja', 'good': 'Baik', 'great': 'Sangat Baik' };

  // --- ELEMENTS ---
  const moodBtns = document.querySelectorAll('.mood-btn');
  const journalArea = document.getElementById('journalArea');
  const journalInput = document.getElementById('journalInput');
  const saveBtn = document.getElementById('saveBtn');
  const moodForm = document.getElementById('moodForm');
  const saveSuccess = document.getElementById('saveSuccess');
  const resetBtn = document.getElementById('resetBtn');

  // --- MOOD SELECTION ---
  moodBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedMood = btn.dataset.mood;

      moodBtns.forEach((b) => {
        b.classList.remove('selected');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('selected');
      btn.setAttribute('aria-pressed', 'true');

      journalArea.classList.add('show');
      saveBtn.disabled = false;
    });
  });

  // --- SAVE ---
  saveBtn.addEventListener('click', () => {
    if (!selectedMood) return;

    // Store today's entry in localStorage
    const entry = {
      date: new Date().toISOString().slice(0, 10),
      mood: selectedMood,
      value: parseInt(document.querySelector('.mood-btn.selected').dataset.value, 10),
      journal: journalInput.value.trim(),
    };

    const history = getHistory();
    const todayIdx = history.findIndex((e) => e.date === entry.date);
    if (todayIdx >= 0) {
      history[todayIdx] = entry;
    } else {
      history.push(entry);
    }
    saveHistory(history);

    // Show success
    moodForm.style.display = 'none';
    saveSuccess.classList.add('show');
    saveSuccess.focus();

    // Refresh chart
    renderChart();
  });

  // --- RESET ---
  resetBtn.addEventListener('click', () => {
    moodForm.style.display = '';
    saveSuccess.classList.remove('show');
    journalArea.classList.remove('show');
    journalInput.value = '';
    saveBtn.disabled = true;
    selectedMood = null;
    moodBtns.forEach((b) => {
      b.classList.remove('selected');
      b.setAttribute('aria-pressed', 'false');
    });
  });

  // --- LOCAL STORAGE ---
  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem('echoaid-mood-history') || '[]');
    } catch {
      return [];
    }
  }

  function saveHistory(history) {
    localStorage.setItem('echoaid-mood-history', JSON.stringify(history));
  }

  // --- CHART ---
  function getChartData() {
    const history = getHistory();
    const today = new Date();
    const days = [];
    const values = [];

    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const entry = history.find((e) => e.date === dateStr);
      days.push(dayNames[d.getDay()]);
      values.push(entry ? entry.value : null);
    }

    return { days, values };
  }

  let chartInstance = null;

  function getComputedColor(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  }

  function renderChart() {
    const ctx = document.getElementById('moodChart');
    if (!ctx) return;

    const { days, values } = getChartData();
    const isDark = document.documentElement.classList.contains('dark');

    if (chartInstance) {
      chartInstance.data.labels = days;
      chartInstance.data.datasets[0].data = values;
      chartInstance.update();
      return;
    }

    const primaryColor = '#5B72E8';
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
    const textColor = isDark ? '#94a3b8' : '#64748b';

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: days,
        datasets: [{
          label: 'Mood',
          data: values,
          borderColor: primaryColor,
          backgroundColor: 'rgba(91,114,232,0.12)',
          borderWidth: 3,
          tension: 0.45,
          fill: true,
          pointBackgroundColor: primaryColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          spanGaps: true,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const val = ctx.raw;
                if (val === null) return 'Belum dicatat';
                const names = ['Sangat Buruk', 'Buruk', 'Biasa Saja', 'Baik', 'Sangat Baik'];
                return names[val - 1] || '';
              },
            },
            backgroundColor: isDark ? '#1e293b' : '#fff',
            titleColor: isDark ? '#f1f5f9' : '#0f172a',
            bodyColor: isDark ? '#94a3b8' : '#64748b',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            borderWidth: 1,
            padding: 10,
            cornerRadius: 10,
          },
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { family: "'Inter', sans-serif", size: 12 } },
          },
          y: {
            min: 1,
            max: 5,
            ticks: {
              stepSize: 1,
              color: textColor,
              font: { family: "'Inter', sans-serif", size: 11 },
              callback: (v) => {
                if (v === 1) return 'Sgt Buruk';
                if (v === 3) return 'Biasa';
                if (v === 5) return 'Sgt Baik';
                return '';
              },
            },
            grid: { color: gridColor },
          },
        },
      },
    });
  }

  renderChart();

  // Re-render chart on theme change
  const observer = new MutationObserver(() => {
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
    renderChart();
  });
  observer.observe(document.documentElement, { attributeFilter: ['class'] });
});

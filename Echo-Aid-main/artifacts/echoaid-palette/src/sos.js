document.addEventListener('DOMContentLoaded', () => {

  const ring = document.getElementById('breatheRing');
  const phaseEl = document.getElementById('breathePhase');
  const durationEl = document.getElementById('breatheDuration');

  if (!ring || !phaseEl || !durationEl) return;

  // 4-7-8 breathing pattern
  const phases = [
    { name: 'Breathe In',  duration: '4 detik',  ms: 4000, ringClass: 'expand'   },
    { name: 'Hold',        duration: '7 detik',  ms: 7000, ringClass: 'hold'     },
    { name: 'Breathe Out', duration: '8 detik',  ms: 8000, ringClass: 'contract' },
  ];

  let current = 0;

  function setPhase(idx) {
    const phase = phases[idx];
    ring.className = 'breathe-ring ' + phase.ringClass;
    phaseEl.textContent = phase.name;
    durationEl.textContent = phase.duration;
  }

  function nextPhase() {
    current = (current + 1) % phases.length;
    setPhase(current);
  }

  // Initialize
  setPhase(0);

  // Cycle through phases
  let timer = setTimeout(function tick() {
    nextPhase();
    timer = setTimeout(tick, phases[current].ms);
  }, phases[0].ms);

  // Cleanup when page is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearTimeout(timer);
    } else {
      setPhase(current);
      timer = setTimeout(function tick() {
        nextPhase();
        timer = setTimeout(tick, phases[current].ms);
      }, phases[current].ms);
    }
  });

});

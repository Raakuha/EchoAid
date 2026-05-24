document.addEventListener('DOMContentLoaded', () => {

  // --- PILLAR TABS ---
  const tabs = document.querySelectorAll('.pillar-btn');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  const activeClasses = {
    paham: 'active-primary',
    strategi: 'active-secondary',
    bantuan: 'active-accent',
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const pillar = tab.dataset.pillar;

      // Update tabs
      tabs.forEach((t) => {
        const cls = activeClasses[t.dataset.pillar];
        t.classList.remove(cls);
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add(activeClasses[pillar]);
      tab.setAttribute('aria-selected', 'true');

      // Show/hide panels
      panels.forEach((panel) => {
        panel.style.display = 'none';
      });
      const activePanel = document.getElementById('panel-' + pillar);
      if (activePanel) {
        activePanel.style.display = '';
        activePanel.focus();
      }
    });
  });

  // --- ACCORDION ---
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');

      if (isOpen) {
        item.classList.remove('open');
        body.style.maxHeight = '0';
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        // Close siblings in same panel
        const panel = item.closest('[role="tabpanel"]');
        if (panel) {
          panel.querySelectorAll('.accordion-item.open').forEach((openItem) => {
            openItem.classList.remove('open');
            openItem.querySelector('.accordion-body').style.maxHeight = '0';
            openItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
          });
        }

        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

});

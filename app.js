// GNPC Digital Dashboard - app.js (Fixed & Improved - Jan 2026)

document.addEventListener('DOMContentLoaded', () => {
    // ── Core Elements ────────────────────────────────────────
    const landingView      = document.getElementById('landing-view');
    const dashboardLayout  = document.getElementById('dashboard-layout');
    const btnLogin         = document.getElementById('btn-login');
    const btnLogout        = document.getElementById('btn-logout');
    const navItems         = document.querySelectorAll('.nav-item');
    const contentSections  = document.querySelectorAll('.content-section');
    const pageTitle        = document.getElementById('page-title');
    const themeToggle      = document.getElementById('theme-toggle');
    const globalSearch     = document.getElementById('global-search');
    const toastContainer   = document.getElementById('toast-container');

    // Modal elements
    const modalOverlay     = document.getElementById('modal-overlay');
    const modalClose       = document.getElementById('modal-close');
    const modalAction      = document.getElementById('modal-action');
    const modalTitle       = document.getElementById('modal-title');
    const modalContent     = document.getElementById('modal-content');

    let currentModalAction = null;

    // ── Login / Logout ──────────────────────────────────────
    window.loginSystem = () => {
        landingView.classList.add('hidden');
        dashboardLayout.classList.remove('hidden');
        showToast('Login successful – Welcome to GNPC Dashboard', 'success');
        initializeDashboard();
    };

    if (btnLogin) {
        btnLogin.addEventListener('click', window.loginSystem);
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            dashboardLayout.classList.add('hidden');
            landingView.classList.remove('hidden');
            showToast('Logged out successfully', 'info');
        });
    }

    // ── Navigation ──────────────────────────────────────────
    function activateSection(targetId) {
        // Hide all
        contentSections.forEach(sec => {
            sec.classList.remove('active');
            sec.style.display = 'none';
        });

        // Show target
        const target = document.getElementById(targetId);
        if (target) {
            target.style.display = 'block';
            setTimeout(() => target.classList.add('active'), 10);
            pageTitle.textContent = targetId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        }

        // Update active nav item
        navItems.forEach(item => item.classList.remove('active'));
        const activeNav = document.querySelector(`.nav-item[data-target="${targetId}"]`);
        if (activeNav) activeNav.classList.add('active');
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            if (target) activateSection(target);
        });
    });

    // Show first section by default
    if (contentSections.length > 0) {
        activateSection(contentSections[0].id);
    }

    // ── Theme Toggle ────────────────────────────────────────
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark-mode');
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = document.documentElement.classList.contains('dark-mode')
                    ? 'ph ph-sun'
                    : 'ph ph-moon-stars';
            }
        });
    }

    // ── Toast Notification ──────────────────────────────────
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="ph ${type === 'success' ? 'ph-check-circle' : type === 'error' ? 'ph-warning' : 'ph-info'}"></i>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toast);

        setTimeout(() => toast.classList.add('active'), 50);
        setTimeout(() => {
            toast.classList.remove('active');
            setTimeout(() => toast.remove(), 400);
        }, 2800);
    }

    // ── Modal Helpers ───────────────────────────────────────
    function showModal(title, htmlContent, actionText = 'Close', actionCallback = null) {
        modalTitle.textContent = title;
        modalContent.innerHTML = htmlContent;
        modalAction.textContent = actionText;
        currentModalAction = actionCallback;
        modalOverlay.classList.add('active');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    modalClose?.addEventListener('click', closeModal);
    modalAction?.addEventListener('click', () => {
        if (currentModalAction) currentModalAction();
        closeModal();
    });
    modalOverlay?.addEventListener('click', e => {
        if (e.target === modalOverlay) closeModal();
    });

    // ── Render Functions ────────────────────────────────────
    function renderKPIs() {
        const grid = document.querySelector('.kpi-grid');
        if (!grid) return;
        grid.innerHTML = '';
        mockData.kpis.forEach(kpi => {
            const card = document.createElement('div');
            card.className = 'kpi-card glass-panel';
            card.innerHTML = `
                <div class="kpi-title">${kpi.title}</div>
                <div class="kpi-value">${kpi.value}</div>
                <div class="kpi-change ${kpi.trend}">
                    <i class="ph ph-trend-${kpi.trend}"></i> ${kpi.trendValue}
                </div>
            `;
            grid.appendChild(card);
        });
    }

    function renderCharts() {
        // Very simple placeholder bars – can be replaced with Chart.js later
        const placeholders = ['production-chart', 'region-chart'];
        placeholders.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = '<div style="height:100%;background:linear-gradient(90deg,#CE1126,#FCD116,#006B3F);opacity:0.25;border-radius:8px;"></div>';
        });
    }

    function renderPipelines() {
        const list = document.getElementById('leak-list-container');
        if (!list) return;
        list.innerHTML = '';
        mockData.pipelines.forEach(p => {
            const item = document.createElement('div');
            item.className = 'leak-item';
            item.innerHTML = `
                <div class="leak-icon ${p.severity.toLowerCase()}"><i class="ph ph-warning-circle"></i></div>
                <div class="leak-info">
                    <h4>${p.location}</h4>
                    <p>${p.severity} • ${p.time}</p>
                </div>
                <span class="leak-status">${p.status}</span>
            `;
            list.appendChild(item);
        });
    }

    function renderStakeholders() {
        const tbody = document.getElementById('stakeholder-table-body');
        if (!tbody) return;
        tbody.innerHTML = '';
        mockData.stakeholders.forEach(s => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.region}</td>
                <td><span class="status-badge ${s.status.toLowerCase()}">${s.status}</span></td>
                <td>${s.lastContract}</td>
                <td><button class="action-btn"><i class="ph ph-dots-three"></i></button></td>
            `;
            tbody.appendChild(tr);
        });
    }

    function renderEngineers() {
        const container = document.getElementById('tech-grid-container');
        if (!container) return;
        container.innerHTML = '';
        mockData.engineers.forEach(e => {
            const card = document.createElement('div');
            card.className = 'tech-card';
            card.innerHTML = `
                <div class="tech-avatar">${e.avatar}</div>
                <h3 class="tech-name">${e.name}</h3>
                <p class="tech-role">${e.task}</p>
                <span class="tech-status ${e.status.toLowerCase()}">${e.status}</span>
            `;
            container.appendChild(card);
        });
    }

    // ── Initialization after login ──────────────────────────
    function initializeDashboard() {
        renderKPIs();
        renderCharts();
        renderPipelines();
        renderStakeholders();
        renderEngineers();

        // Refresh button example
        document.getElementById('refresh-pipeline')?.addEventListener('click', () => {
            showToast('Pipeline data refreshed', 'success');
        });
    }

    // Global search (basic)
    globalSearch?.addEventListener('input', e => {
        const term = e.target.value.toLowerCase().trim();
        if (!term) {
            renderPipelines();
            renderStakeholders();
            renderEngineers();
            return;
        }

        // Very basic client-side filter
        renderPipelines(mockData.pipelines.filter(p => 
            p.location.toLowerCase().includes(term) || p.id.toLowerCase().includes(term)
        ));

        renderStakeholders(mockData.stakeholders.filter(s => 
            s.name.toLowerCase().includes(term) || s.id.toLowerCase().includes(term)
        ));
    });

    // ── Chart Rendering ────────────────────────────────────────
function initCharts() {
    // 1. Production Analytics - Line Chart (trend over time)
    const productionCtx = document.getElementById('productionChart')?.getContext('2d');
    if (productionCtx) {
        new Chart(productionCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Daily Production (bbl)',
                    data: [77356, 74121, 49026, 62000, 68000, 72000, 75000], // Approximate 2025 trend
                    borderColor: '#CE1126',     // Ghana Red
                    backgroundColor: 'rgba(206, 17, 38, 0.15)',
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: '#CE1126',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 8,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'top' },
                    title: { display: false }
                },
                scales: {
                    y: { beginAtZero: false, title: { display: true, text: 'Barrels per day' } }
                }
            }
        });
    }

    // 2. Regional Output - Pie Chart (field share - based on 2025 H1 real data)
    const pieCtx = document.getElementById('regionPieChart')?.getContext('2d');
    if (pieCtx) {
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['Jubilee (60%)', 'Sankofa Gye-Nyame (24%)', 'TEN (16%)'],
                datasets: [{
                    data: [60, 24, 16],
                    backgroundColor: [
                        '#CE1126',      // Red - Jubilee (main field)
                        '#006B3F',      // Green - Sankofa
                        '#FCD116'       // Yellow - TEN
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { font: { size: 13 }, padding: 20 }
                    },
                    title: {
                        display: true,
                        text: 'Production Share by Field (H1 2025)',
                        font: { size: 15 },
                        padding: { top: 10, bottom: 20 }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.label}: ${context.parsed}%`
                        }
                    }
                }
            }
        });
    }
}

// Call this after login / dashboard init
function initializeDashboard() {
    renderKPIs();
    renderCharts();           // Old placeholder version (optional - can remove)
    renderPipelines();
    renderStakeholders();
    renderEngineers();
    initCharts();             // ← NEW: Initialize real charts
}

// Force chart resize on window resize / theme change
window.addEventListener('resize', () => {
    const charts = document.querySelectorAll('canvas');
    charts.forEach(canvas => {
        const chart = Chart.getChart(canvas);
        if (chart) chart.resize();
    });
});

// Also resize after theme toggle
themeToggle?.addEventListener('click', () => {
    setTimeout(() => {
        const charts = document.querySelectorAll('canvas');
        charts.forEach(canvas => {
            const chart = Chart.getChart(canvas);
            if (chart) chart.resize();
        });
    }, 100); // small delay after dark-mode class change
});
});


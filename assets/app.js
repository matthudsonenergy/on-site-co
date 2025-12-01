const tabInitializers = {
  strategy: initStrategyTab,
  tco: initTcoTab,
  research: initResearchTab,
};

const tabInitialized = {
  strategy: false,
  tco: false,
  research: false,
};

function setupTabs() {
  const buttons = document.querySelectorAll('[data-tab-target]');
  const panels = document.querySelectorAll('[data-tab-panel]');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tabTarget));
  });

  function activateTab(target) {
    buttons.forEach((btn) => btn.classList.toggle('active', btn.dataset.tabTarget === target));
    panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.tabPanel === target));

    if (!tabInitialized[target]) {
      tabInitializers[target]?.();
      tabInitialized[target] = true;
    }
  }

  // Activate first tab by default
  const first = buttons[0];
  if (first) {
    first.click();
  }
}

document.addEventListener('DOMContentLoaded', setupTabs);

// ------------------------
// Strategy Tab
// ------------------------
let strategyChartsBuilt = false;

function initStrategyTab() {
  if (strategyChartsBuilt) return;

  // CHART 1: Market Clusters (Bubble Chart)
  const ctxCluster = document.getElementById('marketClusterChart')?.getContext('2d');
  if (ctxCluster) {
    new Chart(ctxCluster, {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: 'Detroit Metro (MI)',
            data: [{ x: 85, y: 90, r: 25 }],
            backgroundColor: 'rgba(249, 115, 22, 0.8)',
            borderColor: '#fff',
            borderWidth: 1,
          },
          {
            label: 'Cleveland/Ohio Valley',
            data: [{ x: 75, y: 80, r: 20 }],
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: '#fff',
            borderWidth: 1,
          },
          {
            label: 'Chicago/Midwest',
            data: [{ x: 65, y: 70, r: 18 }],
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: '#fff',
            borderWidth: 1,
          },
          {
            label: 'Southern Auto Corridor',
            data: [{ x: 40, y: 50, r: 15 }],
            backgroundColor: 'rgba(139, 92, 246, 0.8)',
            borderColor: '#fff',
            borderWidth: 1,
          },
          {
            label: 'Mexico Border (Maquiladoras)',
            data: [{ x: 30, y: 40, r: 12 }],
            backgroundColor: 'rgba(236, 72, 153, 0.8)',
            borderColor: '#fff',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: { display: true, text: 'Automotive Supplier Density', color: '#94a3b8' },
            grid: { color: '#334155' },
            ticks: { display: false },
          },
          y: {
            title: { display: true, text: 'Heat Treat Volume demand', color: '#94a3b8' },
            grid: { color: '#334155' },
            ticks: { display: false },
          },
        },
        plugins: {
          legend: { labels: { color: '#e2e8f0' } },
          title: { display: true, text: 'Target Clusters: Volume vs. Density', color: 'white' },
        },
      },
    });
  }

  // CHART 2: Stability Line Chart
  const ctxStability = document.getElementById('stabilityLineChart')?.getContext('2d');
  if (ctxStability) {
    const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const endogasData = labels.map(() => 0.9 + (Math.random() * 0.15 - 0.075));
    const pureCoData = labels.map(() => 0.9);

    endogasData[15] = 1.2;
    endogasData[16] = 1.3;
    endogasData[17] = 0.7;

    new Chart(ctxStability, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Legacy Endogas (Generator)',
            data: endogasData,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
          },
          {
            label: 'On-Site Pure CO',
            data: pureCoData,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 3,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            title: { display: true, text: 'Carbon Potential (% C)', color: '#94a3b8' },
            grid: { color: '#334155' },
            ticks: { color: '#94a3b8' },
            min: 0.5,
            max: 1.5,
          },
          x: {
            title: { display: true, text: '24 Hour Operational Cycle', color: '#94a3b8' },
            grid: { display: false },
            ticks: { color: '#94a3b8', maxTicksLimit: 6 },
          },
        },
        plugins: {
          legend: { labels: { color: '#e2e8f0' } },
        },
      },
    });
  }

  // CHART 3: TCO Stacked Bar
  const ctxTco = document.getElementById('tcoChart')?.getContext('2d');
  if (ctxTco) {
    new Chart(ctxTco, {
      type: 'bar',
      data: {
        labels: ['Legacy Endogas', 'On-Site Pure CO'],
        datasets: [
          {
            label: 'Gas/Feedstock Cost',
            data: [40, 55],
            backgroundColor: '#3b82f6',
          },
          {
            label: 'Electricity',
            data: [25, 10],
            backgroundColor: '#6366f1',
          },
          {
            label: 'Maintenance & Spares',
            data: [20, 2],
            backgroundColor: '#f59e0b',
          },
          {
            label: 'Scrap/Rework Cost',
            data: [15, 1],
            backgroundColor: '#ef4444',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { stacked: true, grid: { display: false }, ticks: { color: 'white' } },
          y: { stacked: true, display: false },
        },
        plugins: {
          legend: { position: 'bottom', labels: { color: '#cbd5e1' } },
          title: { display: true, text: 'Total Cost of Operation (Indexed)', color: 'white' },
        },
      },
    });
  }

  // CHART 4: Compliance Radar
  const ctxCompliance = document.getElementById('complianceRadarChart')?.getContext('2d');
  if (ctxCompliance) {
    new Chart(ctxCompliance, {
      type: 'radar',
      data: {
        labels: ['Process Stability (Cpk)', 'Audit Traceability', 'Safety (H2 Risk)', 'Uptime', 'Cost Predictability'],
        datasets: [
          {
            label: 'Endogas',
            data: [5, 4, 4, 6, 5],
            borderColor: '#64748b',
            backgroundColor: 'rgba(100, 116, 139, 0.2)',
          },
          {
            label: 'Pure CO System',
            data: [10, 10, 9, 9, 8],
            borderColor: '#f97316',
            backgroundColor: 'rgba(249, 115, 22, 0.2)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            grid: { color: '#334155' },
            angleLines: { color: '#334155' },
            pointLabels: { color: '#cbd5e1', font: { size: 11 } },
            ticks: { display: false, backdropColor: 'transparent' },
          },
        },
        plugins: {
          legend: { labels: { color: '#e2e8f0' } },
        },
      },
    });
  }

  strategyChartsBuilt = true;
}

async function generateBusinessCase() {
  const apiKey = '';
  const furnaces = document.getElementById('furnaceInput').value;
  const downtime = document.getElementById('downtimeInput').value;
  const scrapSelect = document.getElementById('scrapInput');
  const scrap = scrapSelect.options[scrapSelect.selectedIndex].text;

  const placeholder = document.getElementById('strategyAiPlaceholder');
  const loading = document.getElementById('strategyAiLoading');
  const result = document.getElementById('strategyAiResult');

  placeholder?.classList.add('hidden');
  result?.classList.add('hidden');
  loading?.classList.remove('hidden');

  const prompt = `Act as a Technical Sales Engineer for an industrial gas company.
Write a persuasive "Business Case Snapshot" for a Heat Treat Plant Manager.

The Plant:
- ${furnaces} Carburizing Furnaces
- Suffering ${downtime} hours/week of generator-related downtime.
- Current Scrap Rate: ${scrap}.

The Solution: Switching from Endogas Generators to On-Site Pure CO.

Output Structure:
1. **The Hidden Bleed:** Estimate the annual cost of that downtime (assume $500/hr operating cost).
2. **Quality Impact:** How Pure CO fixes the specific scrap issue (mention Intergranular Oxidation).
3. **The "Killer" Stat:** One sentence summary of ROI.

Tone: Professional, direct, industrial. Use bolding for numbers.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';

    if (result) {
      result.innerHTML = marked.parse(text);
    }
    loading?.classList.add('hidden');
    result?.classList.remove('hidden');
  } catch (error) {
    console.error(error);
    loading?.classList.add('hidden');
    if (result) {
      result.innerHTML = '<p class="text-red-500">Analysis failed. Please try again.</p>';
      result.classList.remove('hidden');
    }
  }
}

// ------------------------
// TCO Calculator Tab
// ------------------------
let costChart;

function initTcoTab() {
  if (costChart) return;

  const inputs = document.querySelectorAll("#tco-panel input[type='number']");
  inputs.forEach((el) => el.addEventListener('input', recalc));
  recalc();
}

function fmtCurrency(value) {
  if (isNaN(value)) return '–';
  return '$' + value.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function fmtCurrencyPerTon(value) {
  if (isNaN(value)) return '–';
  return '$' + value.toLocaleString(undefined, { maximumFractionDigits: 2 }) + '/ton';
}

function recalc() {
  const years = Number(document.getElementById('years').value) || 0;
  const tpd = Number(document.getElementById('tpd').value) || 0;
  const daysPerYear = Number(document.getElementById('daysPerYear').value) || 0;
  const annualTons = tpd * daysPerYear;

  const endoCapex = Number(document.getElementById('endoCapex').value) || 0;
  const endoInstall = Number(document.getElementById('endoInstall').value) || 0;
  const endoFixedMaint = Number(document.getElementById('endoFixedMaint').value) || 0;
  const endoVarCostPerTon = Number(document.getElementById('endoVarCostPerTon').value) || 0;
  const endoOverhaulInterval = Number(document.getElementById('endoOverhaulInterval').value) || 5;
  const endoOverhaulCost = Number(document.getElementById('endoOverhaulCost').value) || 0;

  const coCapex = Number(document.getElementById('coCapex').value) || 0;
  const coInstall = Number(document.getElementById('coInstall').value) || 0;
  const coFixedService = Number(document.getElementById('coFixedService').value) || 0;
  const coVarCostPerTon = Number(document.getElementById('coVarCostPerTon').value) || 0;
  const coMaint = Number(document.getElementById('coMaint').value) || 0;

  const yearsArr = [];
  const endoCumulative = [];
  const coCumulative = [];

  let endoCum = endoCapex + endoInstall;
  let coCum = coCapex + coInstall;

  yearsArr.push(0);
  endoCumulative.push(endoCum);
  coCumulative.push(coCum);

  for (let y = 1; y <= years; y++) {
    let endoYearCost = endoFixedMaint + endoVarCostPerTon * annualTons;
    let coYearCost = coFixedService + coMaint + coVarCostPerTon * annualTons;

    if (endoOverhaulInterval > 0 && y % endoOverhaulInterval === 0) {
      endoYearCost += endoOverhaulCost;
    }

    endoCum += endoYearCost;
    coCum += coYearCost;

    yearsArr.push(y);
    endoCumulative.push(endoCum);
    coCumulative.push(coCum);
  }

  const totalEndo = endoCumulative[endoCumulative.length - 1];
  const totalCO = coCumulative[coCumulative.length - 1];
  const totalTonsOverHorizon = annualTons * years;

  const endoLCO = totalTonsOverHorizon > 0 ? totalEndo / totalTonsOverHorizon : NaN;
  const coLCO = totalTonsOverHorizon > 0 ? totalCO / totalTonsOverHorizon : NaN;
  const savings = totalEndo - totalCO;

  document.getElementById('annualTonsDisplay').textContent =
    isNaN(annualTons) ? '–' : annualTons.toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' t/yr';
  document.getElementById('endoTotalDisplay').textContent = fmtCurrency(totalEndo);
  document.getElementById('coTotalDisplay').textContent = fmtCurrency(totalCO);
  document.getElementById('endoLCODisplay').textContent = fmtCurrencyPerTon(endoLCO);
  document.getElementById('coLCODisplay').textContent = fmtCurrencyPerTon(coLCO);

  const savingsEl = document.getElementById('savingsDisplay');
  savingsEl.textContent = fmtCurrency(savings);
  const headerSavings = document.getElementById('headerSavings');
  headerSavings.textContent = fmtCurrency(savings);

  if (savings >= 0) {
    savingsEl.classList.remove('text-red-400');
    savingsEl.classList.add('text-emerald-500');
    headerSavings.classList.add('text-emerald-400');
    headerSavings.classList.remove('text-red-400');
  } else {
    savingsEl.classList.add('text-red-400');
    savingsEl.classList.remove('text-emerald-500');
    headerSavings.classList.remove('text-emerald-400');
    headerSavings.classList.add('text-red-400');
  }

  updateCostChart(yearsArr, endoCumulative, coCumulative);
}

function updateCostChart(labels, endoData, coData) {
  const ctx = document.getElementById('costChart').getContext('2d');

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.9)',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: '#475569',
        borderWidth: 1,
        callbacks: {
          label: (ctx) => ctx.dataset.label + ': ' + fmtCurrency(ctx.parsed.y),
        },
      },
      legend: {
        labels: { color: '#cbd5e1' },
        position: 'bottom',
      },
    },
    scales: {
      x: {
        grid: { color: '#334155' },
        ticks: { color: '#94a3b8' },
        title: { display: true, text: 'Operating Years', color: '#64748b' },
      },
      y: {
        grid: { color: '#334155' },
        ticks: {
          color: '#94a3b8',
          callback: (value) => '$' + (value / 1000).toLocaleString() + 'k',
        },
        title: { display: false },
      },
    },
  };

  if (costChart) {
    costChart.data.labels = labels;
    costChart.data.datasets[0].data = endoData;
    costChart.data.datasets[1].data = coData;
    costChart.update();
  } else {
    costChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Legacy Endogas',
            data: endoData,
            borderColor: '#94a3b8',
            backgroundColor: '#94a3b8',
            borderWidth: 2,
            tension: 0.2,
            pointRadius: 2,
          },
          {
            label: 'Maat On-Site CO',
            data: coData,
            borderColor: '#f97316',
            backgroundColor: '#f97316',
            borderWidth: 3,
            borderDash: [0, 0],
            tension: 0.2,
            pointRadius: 3,
          },
        ],
      },
      options: chartOptions,
    });
  }
}

// ------------------------
// Market Research Tab
// ------------------------
let marketChartsBuilt = false;

function initResearchTab() {
  if (marketChartsBuilt) return;

  const wrapLabel = (label, maxLength = 16) => {
    if (label.length <= maxLength) return label;
    const words = label.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      if ((currentLine + ' ' + words[i]).length <= maxLength) {
        currentLine += ' ' + words[i];
      } else {
        lines.push(currentLine);
        currentLine = words[i];
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const commonTooltipOptions = {
    callbacks: {
      title: function (tooltipItems) {
        const item = tooltipItems[0];
        const label = item.chart.data.labels[item.dataIndex];
        return Array.isArray(label) ? label.join(' ') : label;
      },
    },
  };

  const ctxGap = document.getElementById('gapBubbleChart')?.getContext('2d');
  if (ctxGap) {
    new Chart(ctxGap, {
      type: 'bubble',
      data: {
        datasets: [
          { label: 'Cylinders', data: [{ x: 0.1, y: 5.0, r: 8 }], backgroundColor: '#9CA3AF' },
          { label: 'Tube Trailers', data: [{ x: 1.5, y: 3.5, r: 12 }], backgroundColor: '#6B7280' },
          { label: 'Target Volume (1-10 TPD)', data: [{ x: 5, y: 1.2, r: 25 }], backgroundColor: '#F97316', borderColor: '#C2410C', borderWidth: 2 },
          { label: 'Small SMR', data: [{ x: 50, y: 0.8, r: 18 }], backgroundColor: '#2563EB' },
          { label: 'Large Pipeline', data: [{ x: 300, y: 0.4, r: 30 }], backgroundColor: '#1E3A8A' },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { type: 'logarithmic', title: { display: true, text: 'Production Scale (Tonnes Per Day) [Log Scale]' }, min: 0.05, max: 500 },
          y: { title: { display: true, text: 'Unit Cost ($ / kg)' }, min: 0, max: 6 },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.raw.y} $/kg @ ${context.raw.x} TPD`,
            },
          },
          legend: { position: 'bottom' },
          title: { display: true, text: 'Cost vs. Scale: Supply Mode Economics', font: { size: 16 } },
        },
      },
    });
  }

  const ctxPurity = document.getElementById('purityBarChart')?.getContext('2d');
  if (ctxPurity) {
    const purityLabels = ['Standard Chemical', 'Metallurgy (Reducing)', 'Nickel Carbonyl', 'Electronic Alloys'];
    const wrappedPurityLabels = purityLabels.map((l) => wrapLabel(l));

    new Chart(ctxPurity, {
      type: 'bar',
      data: {
        labels: wrappedPurityLabels,
        datasets: [
          {
            label: 'Minimum Purity Required (%)',
            data: [98.0, 99.5, 99.9, 99.999],
            backgroundColor: ['#9CA3AF', '#2563EB', '#06B6D4', '#F97316'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { min: 97, max: 100, title: { display: true, text: 'Purity Percentage (%)' } },
        },
        plugins: {
          tooltip: commonTooltipOptions,
          legend: { display: false },
          title: { display: true, text: 'Purity Criticality by Application' },
        },
      },
    });
  }

  const ctxCost = document.getElementById('costStackChart')?.getContext('2d');
  if (ctxCost) {
    const costLabels = ['Delivered (Liquid)', 'On-Site Generation'];
    new Chart(ctxCost, {
      type: 'bar',
      data: {
        labels: costLabels,
        datasets: [
          { label: 'Production/Feedstock', data: [0.4, 0.7], backgroundColor: '#2563EB' },
          { label: 'Liquefaction/Energy', data: [0.5, 0.3], backgroundColor: '#06B6D4' },
          { label: 'Logistics/Transport', data: [1.5, 0.0], backgroundColor: '#F97316' },
          { label: 'Compliance/Rental', data: [0.6, 0.1], backgroundColor: '#9CA3AF' },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { stacked: true },
          y: { stacked: true, title: { display: true, text: 'Cost Contribution ($ / kg)' } },
        },
        plugins: {
          tooltip: commonTooltipOptions,
          title: { display: true, text: 'Cost Breakdown: Where does the money go?' },
        },
      },
    });
  }

  const ctxRadar = document.getElementById('techRadarChart')?.getContext('2d');
  if (ctxRadar) {
    new Chart(ctxRadar, {
      type: 'radar',
      data: {
        labels: ['Scalability (Down)', 'High Purity', 'Low CAPEX', 'Low Energy', 'Ease of Operation'],
        datasets: [
          { label: 'Membranes', data: [5, 3, 5, 4, 5], borderColor: '#2563EB', backgroundColor: 'rgba(37, 99, 235, 0.2)' },
          { label: 'PSA (Adsorption)', data: [4, 4, 3, 3, 4], borderColor: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.2)' },
          { label: 'Cryogenic', data: [1, 5, 1, 2, 2], borderColor: '#9CA3AF', backgroundColor: 'rgba(156, 163, 175, 0.2)', borderDash: [5, 5] },
          { label: 'SOEC (Future)', data: [5, 5, 2, 3, 3], borderColor: '#F97316', backgroundColor: 'rgba(249, 115, 22, 0.2)' },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: { angleLines: { display: false }, suggestedMin: 0, suggestedMax: 5, ticks: { stepSize: 1, backdropColor: 'transparent' } },
        },
        plugins: {
          tooltip: commonTooltipOptions,
          title: { display: true, text: 'Technology Suitability Score (5 = Best)' },
        },
      },
    });
  }

  marketChartsBuilt = true;
}

async function generateStrategy() {
  const apiKey = '';
  const tpd = document.getElementById('researchTpdInput').value;
  const purity = document.getElementById('researchPurityInput').value;
  const energy = document.getElementById('researchEnergyInput').value;

  const placeholder = document.getElementById('researchAiPlaceholder');
  const loading = document.getElementById('researchAiLoading');
  const result = document.getElementById('researchAiResult');

  placeholder?.classList.add('hidden');
  result?.classList.add('hidden');
  loading?.classList.remove('hidden');

  const userPrompt = `I am a metallurgical plant manager. I need ${tpd} Tonnes Per Day (TPD) of Carbon Monoxide. My purity requirement is ${purity}%. My local electricity cost is ${energy}.
            Based on the following technologies: Modular SMR + PSA, Membrane Separation, Cryogenic Distillation, and SOEC.

            Task:
            1. Recommend the SINGLE best technology for my specific situation.
            2. Explain why in 2 concise sentences, citing cost or technical fit.
            3. Estimate if this is economically feasible compared to delivered liquid CO (approx $2-$4/kg).

            Format nicely with bold headers.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: userPrompt }] }] }),
      }
    );

    if (!response.ok) throw new Error('API Request Failed');

    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (result) {
      result.innerHTML = marked.parse(aiText);
    }

    loading?.classList.add('hidden');
    result?.classList.remove('hidden');
  } catch (error) {
    console.error(error);
    loading?.classList.add('hidden');
    if (result) {
      result.innerHTML = `<p class="text-red-500">Error generating recommendation. Please try again.</p>`;
      result.classList.remove('hidden');
    }
  }
}

async function summarizeSection(topic) {
  const apiKey = '';
  let prompt = '';

  if (topic === 'purity') {
    prompt = "Act as a senior metallurgist. Explain briefly (2 sentences) why purity >99.5% is critical for DRI and Nickel purification to a lab technician student. Mention 'Hydrogen Embrittlement'.";
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No summary generated.';
    alert(`🎓 Expert Insight:\n\n${text}`);
  } catch (e) {
    alert('Could not generate summary.');
  }
}

// expose globals for inline handlers
window.generateBusinessCase = generateBusinessCase;
window.generateStrategy = generateStrategy;
window.summarizeSection = summarizeSection;

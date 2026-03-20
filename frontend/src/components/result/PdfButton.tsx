'use client';

import { useState } from 'react';

interface PdfButtonProps {
  contentId: string;
  filename?: string;
}

export const PdfButton = ({ contentId }: PdfButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handlePrint = () => {
    const el = document.getElementById(contentId);
    if (!el) return;

    setLoading(true);

    // Open a blank popup window
    const printWindow = window.open('', '_blank', 'width=900,height=1100');
    if (!printWindow) {
      setLoading(false);
      alert('Please allow popups for this site to download the PDF.');
      return;
    }

    // Write a clean standalone HTML page with only the paper content
    // Using basic CSS so we are fully independent of Tailwind / oklch colors
    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>Assignment</title>
          <style>
            /* --- Reset --- */
            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

            body {
              font-family: Georgia, 'Times New Roman', serif;
              font-size: 11pt;
              line-height: 1.6;
              color: #111;
              background: white;
              padding: 20mm;
            }

            /* --- Paper header --- */
            .paper-header {
              text-align: center;
              border-bottom: 2px solid #111;
              padding-bottom: 12px;
              margin-bottom: 14px;
            }
            .paper-header h1 { font-size: 15pt; font-weight: bold; }
            .paper-header p  { font-size: 10pt; color: #444; margin-top: 2px; }

            /* --- Meta row (time / marks) --- */
            .meta-row {
              display: flex;
              justify-content: space-between;
              font-size: 10pt;
              margin-bottom: 12px;
            }

            /* --- Instructions box --- */
            .instructions {
              background: #f5f5f5;
              border: 1px solid #ddd;
              border-radius: 4px;
              padding: 8px 12px;
              font-size: 10pt;
              margin-bottom: 14px;
            }

            /* --- Student info --- */
            .student-info {
              display: flex;
              gap: 32px;
              font-size: 10pt;
              margin-bottom: 18px;
            }
            .student-info span {
              border-bottom: 1px solid #555;
              display: inline-block;
              min-width: 80px;
            }

            /* --- Section title --- */
            .section-title {
              text-align: center;
              font-size: 12pt;
              font-weight: bold;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              border-bottom: 1px solid #ccc;
              padding-bottom: 6px;
              margin-bottom: 8px;
            }
            .section-subtitle {
              font-size: 9pt;
              color: #666;
              font-style: italic;
              margin-bottom: 14px;
            }

            /* --- Questions --- */
            ol.questions { list-style: none; padding: 0; }
            ol.questions li {
              display: flex;
              gap: 10px;
              margin-bottom: 14px;
              font-size: 10.5pt;
              line-height: 1.5;
            }
            ol.questions li .num { font-weight: bold; min-width: 22px; }
            .badge {
              display: inline-block;
              font-size: 8pt;
              font-weight: bold;
              padding: 1px 6px;
              border-radius: 3px;
              text-transform: uppercase;
              letter-spacing: 0.04em;
              white-space: nowrap;
              height: fit-content;
              margin-top: 1px;
            }
            .badge-easy       { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
            .badge-moderate   { background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; }
            .badge-hard       { background: #ffedd5; color: #9a3412; border: 1px solid #fed7aa; }
            .badge-challenging{ background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }

            /* --- End of paper --- */
            .end-marker {
              text-align: center;
              font-style: italic;
              font-size: 9pt;
              color: #888;
              border-top: 1px dashed #ccc;
              padding-top: 10px;
              margin-top: 18px;
            }

            /* --- Answer key --- */
            .answer-key-title {
              text-align: center;
              font-size: 13pt;
              font-weight: bold;
              margin-top: 28px;
              margin-bottom: 14px;
              border-top: 2px dashed #bbb;
              padding-top: 18px;
            }
            ol.answers { padding-left: 20px; }
            ol.answers li {
              font-size: 10pt;
              margin-bottom: 10px;
              line-height: 1.5;
            }
            ol.answers li em { color: #555; }

            @page { size: A4 portrait; margin: 15mm; }
          </style>
        </head>
        <body>
          <!-- Paper Header -->
          <div class="paper-header">
            <h1>Delhi Public School, Sector-4, Bokaro</h1>
            <p>Subject: Science</p>
            <p>Class: 8th</p>
          </div>

          <!-- Meta -->
          <div class="meta-row">
            <span>Time Allowed: <strong>40 minutes</strong></span>
            <span>Maximum Marks: <strong>20</strong></span>
          </div>

          <!-- Instructions -->
          <div class="instructions">
            <strong>Instructions:</strong> All questions are compulsory unless stated otherwise.
            Write neat and legible answers.
          </div>

          <!-- Student Info -->
          <div class="student-info">
            <div>Name: <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
            <div>Roll No: <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
            <div>Class/Section: <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
          </div>

          <!-- Section A -->
          <div class="section-title">Section A — Short Answer Questions</div>
          <p class="section-subtitle">Attempt all questions. Each question carries 2 marks.</p>

          <ol class="questions">
            <li><span class="num">1.</span><span class="badge badge-easy">Easy</span>&nbsp; Define electroplating. Explain its purpose. [2 Marks]</li>
            <li><span class="num">2.</span><span class="badge badge-moderate">Moderate</span>&nbsp; What is the role of a conductor in the process of electrolysis? [2 Marks]</li>
            <li><span class="num">3.</span><span class="badge badge-easy">Easy</span>&nbsp; Why does a solution of copper sulfate conduct electricity? [2 Marks]</li>
            <li><span class="num">4.</span><span class="badge badge-moderate">Moderate</span>&nbsp; Describe one example of the chemical effect of electric current in daily life. [2 Marks]</li>
            <li><span class="num">5.</span><span class="badge badge-easy">Easy</span>&nbsp; Explain why electric current is said to have chemical effects. [2 Marks]</li>
            <li><span class="num">6.</span><span class="badge badge-hard">Hard</span>&nbsp; How is sodium hydroxide prepared during the electrolysis of brine? Write the chemical reaction involved. [2 Marks]</li>
            <li><span class="num">7.</span><span class="badge badge-challenging">Challenging</span>&nbsp; What happens at the cathode and anode during the electrolysis of water? Name the gases evolved. [2 Marks]</li>
            <li><span class="num">8.</span><span class="badge badge-easy">Easy</span>&nbsp; Mention the type of current used in electroplating and justify why it is used. [2 Marks]</li>
            <li><span class="num">9.</span><span class="badge badge-moderate">Moderate</span>&nbsp; What is the importance of electric current in the field of metallurgy? [2 Marks]</li>
            <li><span class="num">10.</span><span class="badge badge-challenging">Challenging</span>&nbsp; Explain with a chemical equation how copper is deposited during the electroplating of an object. [2 Marks]</li>
          </ol>

          <div class="end-marker">✦ End of Question Paper ✦</div>

          <!-- Answer Key -->
          <div class="answer-key-title">Answer Key</div>
          <ol class="answers">
            <li><em>Define electroplating —</em> Electroplating is the process of depositing a thin layer of metal on the surface of another metal using electric current to prevent corrosion, improve appearance, or increase thickness.</li>
            <li><em>Role of conductor —</em> A conductor allows the flow of electric current, causing ions in the electrolyte to move and enabling chemical changes at electrodes.</li>
            <li><em>Copper sulfate conductivity —</em> Copper sulfate solution contains free copper and sulfate ions which carry electric charge, thus conducting electricity.</li>
            <li><em>Chemical effect example —</em> An example is the electroplating of silver on jewelry to prevent tarnishing.</li>
            <li><em>Electric current chemical effects —</em> Electric current causes the movement of ions leading to chemical changes at the electrodes, hence it shows chemical effects.</li>
            <li><em>Sodium hydroxide preparation —</em> Sodium hydroxide is formed at the cathode during brine electrolysis: 2H₂O + 2e⁻ → H₂ + 2OH⁻.</li>
            <li><em>Cathode and anode gases —</em> At the cathode, hydrogen gas is produced; at the anode, oxygen gas is produced during water electrolysis.</li>
            <li><em>Type of current in electroplating —</em> Direct current (DC) is used because it flows in one direction, ensuring uniform deposition of metal.</li>
            <li><em>Importance in metallurgy —</em> Electric current is used for electrorefining of metals like copper to achieve high purity.</li>
            <li><em>Copper deposition equation —</em> Cu²⁺ + 2e⁻ → Cu. Copper ions from the electrolyte are deposited on the cathode object.</li>
          </ol>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // Give browser time to render before printing
    setTimeout(() => {
      printWindow.print();
      // Close the popup after print dialog is dismissed
      setTimeout(() => {
        printWindow.close();
        setLoading(false);
      }, 500);
    }, 600);
  };

  return (
    <button
      onClick={handlePrint}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full border border-white/30 transition-all ${
        loading
          ? 'bg-white/10 text-white/50 cursor-not-allowed'
          : 'bg-white text-gray-900 hover:bg-gray-100 active:scale-95'
      }`}
    >
      {loading ? (
        <>
          <span className="inline-block w-3.5 h-3.5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          Preparing PDF…
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download as PDF
        </>
      )}
    </button>
  );
};

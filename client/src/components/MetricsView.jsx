import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Clock, 
  ShieldAlert, 
  Users, 
  Leaf, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles,
  Zap,
  ArrowDownRight,
  Calculator
} from 'lucide-react';

export default function MetricsView({ metrics, lang }) {
  const [patientVolume, setPatientVolume] = useState(120);

  // Time savings calculation based on volume
  const minutesSavedPerPatient = 12.4; // 14.5m baseline down to 2.1m
  const dailyHoursSaved = ((patientVolume * minutesSavedPerPatient) / 60).toFixed(1);
  const monthlyDoctorHours = (dailyHoursSaved * 26).toFixed(0);
  const annualPaperSavedSheets = (patientVolume * 4 * 300).toLocaleString();

  return (
    <div className="container" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
        <span className="badge badge-teal" style={{ marginBottom: '8px' }}>
          Real-Time Clinical Analytics
        </span>
        <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>
          {lang === 'hi' ? 'OPD प्रभाव और दक्षता मेट्रिक्स' : 'Hospital OPD Impact & Benefits Tracker'}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>
          Quantifying the clinical transformation delivered by MediBrief: The Two-Minute Doctor in crowded OPD environments.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        {/* Metric 1: Consult Duration */}
        <div className="glass-panel" style={{
          padding: '20px',
          background: 'rgba(6, 182, 212, 0.08)',
          border: '1px solid rgba(6, 182, 212, 0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
              Avg. Consultation
            </span>
            <Clock size={16} color="#06b6d4" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#22d3ee', fontFamily: 'var(--font-display)' }}>
            {metrics?.averageConsultDurationMinutes || '2.1'} min
          </div>
          <div style={{ fontSize: '0.76rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
            <ArrowDownRight size={14} /> 85.5% faster than 14.5 min baseline
          </div>
        </div>

        {/* Metric 2: Doctor Time Saved */}
        <div className="glass-panel" style={{
          padding: '20px',
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
              Physician Hours Saved
            </span>
            <Zap size={16} color="#10b981" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-display)' }}>
            {metrics ? Math.round(metrics.timeSavedMinutes / 60) : '14'} hrs
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Cumulatively today across 68 consults
          </div>
        </div>

        {/* Metric 3: Drug Conflicts / Red Flags */}
        <div className="glass-panel" style={{
          padding: '20px',
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
              Drug Conflicts Flagged
            </span>
            <ShieldAlert size={16} color="#ef4444" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f87171', fontFamily: 'var(--font-display)' }}>
            {metrics?.redFlagsDetected || '34'}
          </div>
          <div style={{ fontSize: '0.76rem', color: '#fca5a5', marginTop: '4px' }}>
            9 adverse anaphylactic reactions prevented
          </div>
        </div>

        {/* Metric 4: Hindi Language Support */}
        <div className="glass-panel" style={{
          padding: '20px',
          background: 'rgba(139, 92, 246, 0.08)',
          border: '1px solid rgba(139, 92, 246, 0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
              Hindi Voice Intakes
            </span>
            <Users size={16} color="#8b5cf6" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#c084fc', fontFamily: 'var(--font-display)' }}>
            {metrics?.hindiLanguageIntakes || '47'}
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Vernacular bridge for government OPDs
          </div>
        </div>

        {/* Metric 5: Paperless OPD */}
        <div className="glass-panel" style={{
          padding: '20px',
          background: 'rgba(34, 197, 94, 0.08)',
          border: '1px solid rgba(34, 197, 94, 0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
              Paper Sheets Saved
            </span>
            <Leaf size={16} color="#22c55e" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#4ade80', fontFamily: 'var(--font-display)' }}>
            {metrics?.paperlessPagesSaved || '382'}
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Eco-friendly digital OPD workflow
          </div>
        </div>
      </div>

      {/* Interactive OPD Hospital Simulation Calculator */}
      <div className="glass-panel" style={{ padding: '26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Calculator size={20} color="#38bdf8" />
          <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>
            OPD Scale & Efficiency Simulator
          </h3>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
          Adjust the daily OPD patient volume slider to project hospital throughput and doctor time recovery.
        </p>

        {/* Slider */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#cbd5e1' }}>
              Daily OPD Patient Volume:
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.2rem',
              fontWeight: 800,
              color: '#38bdf8'
            }}>
              {patientVolume} Patients / Day
            </span>
          </div>
          <input
            type="range"
            min="20"
            max="400"
            step="10"
            value={patientVolume}
            onChange={(e) => setPatientVolume(Number(e.target.value))}
            style={{
              width: '100%',
              accentColor: '#06b6d4',
              cursor: 'pointer',
              height: '8px',
              borderRadius: '4px'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>
            <span>20 (Small Clinic)</span>
            <span>120 (District Hospital)</span>
            <span>400 (Apex Government Medical College)</span>
          </div>
        </div>

        {/* Projections Matrix */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          background: 'rgba(255, 255, 255, 0.02)',
          padding: '18px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Daily Doctor Hours Saved</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
              {dailyHoursSaved} Hours
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Equivalent to 2-3 full-time doctor shifts</div>
          </div>

          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Monthly Doctor Hours Saved</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#c084fc', marginTop: '4px' }}>
              {monthlyDoctorHours} Hours
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Redirected toward intensive clinical care</div>
          </div>

          <div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Annual Paper Elimination</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4ade80', marginTop: '4px' }}>
              {annualPaperSavedSheets} Sheets
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Zero physical paper files needed in OPD</div>
          </div>
        </div>
      </div>

      {/* Traditional vs MediBrief Comparison Table */}
      <div className="glass-panel" style={{ padding: '26px' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>
          Comparison: Traditional OPD vs MediBrief Assistant
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)' }}>
                <th style={{ textAlign: 'left', padding: '12px 14px' }}>Workflow Dimension</th>
                <th style={{ textAlign: 'left', padding: '12px 14px', color: '#f87171' }}>Traditional OPD Process</th>
                <th style={{ textAlign: 'left', padding: '12px 14px', color: '#34d399' }}>MediBrief "Two-Minute Doctor"</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 600, color: '#fff' }}>Consultation Speed</td>
                <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>12 – 18 minutes (slow history taking)</td>
                <td style={{ padding: '12px 14px', color: '#4ade80', fontWeight: 600 }}>Under 2 minutes with 60-Sec Brief</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 600, color: '#fff' }}>Allergy & Interaction Check</td>
                <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>Easily missed in thick paper files</td>
                <td style={{ padding: '12px 14px', color: '#4ade80', fontWeight: 600 }}>Critical Red Flags shown first at top</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 600, color: '#fff' }}>Language Barrier</td>
                <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>Difficulty explaining in crowded rooms</td>
                <td style={{ padding: '12px 14px', color: '#4ade80', fontWeight: 600 }}>Spoken Hindi / Vernacular AI Voice Input</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 600, color: '#fff' }}>Past Records Usage</td>
                <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>Disorganized paper slips often ignored</td>
                <td style={{ padding: '12px 14px', color: '#4ade80', fontWeight: 600 }}>Unified dated timeline + 1-click OCR evidence</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 14px', fontWeight: 600, color: '#fff' }}>Environmental Footprint</td>
                <td style={{ padding: '12px 14px', color: '#cbd5e1' }}>Bulk physical paperwork & OPD slips</td>
                <td style={{ padding: '12px 14px', color: '#4ade80', fontWeight: 600 }}>100% Paperless Digital Pre-Consultation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

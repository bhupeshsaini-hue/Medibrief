import React from 'react';
import { 
  Stethoscope, 
  FileText, 
  Mic, 
  GitBranch, 
  BarChart3, 
  Languages, 
  Sparkles, 
  ShieldCheck, 
  Clock,
  Activity
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, lang, setLang, backendOnline, queueCount }) {
  return (
    <header className="navbar-container" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand & Logo with Internet Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            position: 'relative',
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2))',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.25)',
            overflow: 'hidden'
          }}>
            {/* Internet medical icon as specified by user */}
            <img 
              src="https://img.icons8.com/fluency/96/stethoscope.png" 
              alt="MediBrief Medical Logo" 
              style={{ width: '32px', height: '32px', objectFit: 'contain' }}
              onError={(e) => {
                // Fallback in case offline
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <Stethoscope 
              size={24} 
              color="#06b6d4" 
              style={{ display: 'none' }} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.45rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em'
              }}>
                MediBrief
              </span>
              <span className="badge badge-teal" style={{ fontSize: '0.68rem', padding: '2px 7px' }}>
                <Clock size={11} /> 2-Min Doctor
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>AI Pre-Consultation Clinical Assistant</span>
              <span style={{ color: 'var(--border-light)' }}>•</span>
              <span style={{ color: '#22d3ee' }}>Team Arogya (AAYU-XJDK)</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(15, 23, 42, 0.65)',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <button 
            onClick={() => setActiveTab('doctor')}
            className={`btn ${activeTab === 'doctor' ? 'btn-primary' : 'btn-subtle'}`}
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
          >
            <Stethoscope size={16} />
            <span>{lang === 'hi' ? 'डॉक्टर डैशबोर्ड' : 'Doctor Dashboard'}</span>
            <span style={{
              background: activeTab === 'doctor' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
              padding: '1px 6px',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: 700
            }}>
              {queueCount}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('intake')}
            className={`btn ${activeTab === 'intake' ? 'btn-ai' : 'btn-subtle'}`}
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
          >
            <Mic size={16} />
            <span>{lang === 'hi' ? 'मरीज प्री-कंसल्टेशन' : 'Patient Intake (Voice/OCR)'}</span>
          </button>

          <button 
            onClick={() => setActiveTab('workflow')}
            className={`btn ${activeTab === 'workflow' ? 'btn-outline' : 'btn-subtle'}`}
            style={{ 
              padding: '8px 14px', 
              fontSize: '0.85rem',
              borderColor: activeTab === 'workflow' ? '#8b5cf6' : 'transparent',
              background: activeTab === 'workflow' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
              color: activeTab === 'workflow' ? '#c084fc' : 'var(--text-muted)'
            }}
          >
            <GitBranch size={16} />
            <span>{lang === 'hi' ? '9-चरणीय कार्यप्रणाली' : '9-Step Architecture'}</span>
          </button>

          <button 
            onClick={() => setActiveTab('metrics')}
            className={`btn ${activeTab === 'metrics' ? 'btn-outline' : 'btn-subtle'}`}
            style={{ 
              padding: '8px 14px', 
              fontSize: '0.85rem',
              borderColor: activeTab === 'metrics' ? '#10b981' : 'transparent',
              background: activeTab === 'metrics' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
              color: activeTab === 'metrics' ? '#34d399' : 'var(--text-muted)'
            }}
          >
            <BarChart3 size={16} />
            <span>{lang === 'hi' ? 'OPD प्रभाव और लाभ' : 'Impact & OPD Stats'}</span>
          </button>
        </nav>

        {/* Right side controls: Language & Server status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Hindi / English toggle */}
          <button 
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '6px 12px',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              fontWeight: 600,
              transition: 'all 0.2s ease'
            }}
            title="Toggle Language / भाषा बदलें"
          >
            <Languages size={15} color="#38bdf8" />
            <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Backend Status indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            background: backendOnline ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${backendOnline ? 'rgba(34, 197, 94, 0.25)' : 'rgba(239, 68, 68, 0.25)'}`,
            padding: '5px 10px',
            borderRadius: '8px',
            fontSize: '0.74rem',
            color: backendOnline ? '#4ade80' : '#f87171'
          }}>
            <span className={`pulse-dot ${backendOnline ? 'green' : 'red'}`}></span>
            <span>{backendOnline ? 'Express API :5000' : 'Offline'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

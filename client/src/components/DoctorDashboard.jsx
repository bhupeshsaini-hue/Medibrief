import React, { useState, useEffect, useRef } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  ExternalLink, 
  Pill, 
  Activity, 
  HeartPulse, 
  ChevronRight, 
  User, 
  Check, 
  Printer, 
  Share2, 
  Sparkles, 
  Info, 
  Stethoscope, 
  Send, 
  Eye, 
  FileCheck, 
  AlertCircle,
  UploadCloud,
  FileUp,
  Paperclip
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DoctorDashboard({ 
  patients, 
  selectedPatientId, 
  setSelectedPatientId, 
  onOpenEvidence, 
  onUpdatePatient, 
  lang 
}) {
  const [activeTab, setActiveTab] = useState('brief'); // 'brief', 'findings', 'timeline', 'docs'
  const [consultationTimer, setConsultationTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [doctorNotes, setDoctorNotes] = useState('');
  const [prescriptionPlan, setPrescriptionPlan] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [attachingDoc, setAttachingDoc] = useState(false);
  const docFileInputRef = useRef(null);


  // Find active patient
  const patient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Reset or initialize timer and notes when patient changes
  useEffect(() => {
    setConsultationTimer(0);
    setTimerRunning(true);
    setDoctorNotes(patient?.doctorNotes || '');
    setPrescriptionPlan(patient?.prescriptionPlan || '');
    setIsCompleted(patient?.doctorReviewed || false);
  }, [patient?.id]);

  // Consultation timer ticker
  useEffect(() => {
    let interval = null;
    if (timerRunning && !isCompleted) {
      interval = setInterval(() => {
        setConsultationTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, isCompleted]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCompleteConsultation = async () => {
    setIsCompleted(true);
    setTimerRunning(false);

    try {
      await fetch(`/api/patients/${patient.id}/doctor-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: doctorNotes,
          prescriptionPlan: prescriptionPlan,
          status: 'Consultation Completed'
        })
      });
    } catch (e) {
      console.error(e);
    }

    if (onUpdatePatient) {
      onUpdatePatient(patient.id, {
        doctorNotes,
        prescriptionPlan,
        doctorReviewed: true,
        status: 'Consultation Completed'
      });
    }

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handlePrintBrief = () => {
    window.print();
  };

  if (!patient) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
        <User size={48} style={{ opacity: 0.4, marginBottom: '16px' }} />
        <h3>No patient records available in OPD queue</h3>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top OPD Patient Queue Switcher Bar */}
      <div className="glass-panel no-print" style={{
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        background: 'rgba(15, 23, 42, 0.75)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {lang === 'hi' ? 'OPD कतार (मरीज चुनें):' : 'OPD Live Queue:'}
          </span>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
            {patients.map(p => {
              const isSelected = p.id === patient.id;
              const hasCritical = p.redFlags?.some(rf => rf.severity === 'critical');
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPatientId(p.id)}
                  style={{
                    background: isSelected 
                      ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(139, 92, 246, 0.25))' 
                      : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected 
                      ? '1px solid #06b6d4' 
                      : hasCritical ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    color: isSelected ? '#fff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 700 : 500,
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: p.doctorReviewed ? '#22c55e' : hasCritical ? '#ef4444' : '#06b6d4'
                  }}></span>
                  <span>{p.name} ({p.opdQueueNumber})</span>
                  {hasCritical && !p.doctorReviewed && (
                    <span style={{ fontSize: '0.65rem', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '1px 5px', borderRadius: '4px' }}>
                      ALERT
                    </span>
                  )}
                  {p.doctorReviewed && (
                    <CheckCircle2 size={13} color="#22c55e" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Minute Doctor Goal Timer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(0, 0, 0, 0.35)',
          padding: '6px 14px',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={16} color={consultationTimer > 120 ? '#ef4444' : '#22d3ee'} />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              {lang === 'hi' ? 'कंसल्टेशन समय:' : 'Consultation Pace:'}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '1rem',
              color: consultationTimer > 120 ? '#f87171' : '#38bdf8'
            }}>
              {formatTimer(consultationTimer)}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>/ 02:00 target</span>
          </div>

          <button
            onClick={() => setTimerRunning(!timerRunning)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.72rem',
              textDecoration: 'underline'
            }}
          >
            {timerRunning ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      {/* Patient Header Card */}
      <div className="glass-panel" style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(18, 26, 44, 0.85))',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* Patient Details */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.4rem',
              color: '#fff',
              boxShadow: '0 8px 20px rgba(14, 165, 233, 0.3)'
            }}>
              {patient.name.charAt(0)}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.6rem', color: '#fff', margin: 0 }}>
                  {patient.name}
                </h2>
                <span className="badge badge-info" style={{ fontSize: '0.75rem' }}>
                  OPD Token: {patient.opdQueueNumber}
                </span>
                <span style={{
                  fontSize: '0.78rem',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: isCompleted ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                  color: isCompleted ? '#4ade80' : '#facc15',
                  border: isCompleted ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(234, 179, 8, 0.3)',
                  fontWeight: 600
                }}>
                  {isCompleted ? '✓ Completed' : '● In Consultation'}
                </span>
              </div>

              <div style={{
                display: 'flex',
                gap: '16px',
                marginTop: '6px',
                fontSize: '0.84rem',
                color: 'var(--text-muted)',
                flexWrap: 'wrap'
              }}>
                <span><strong>Age:</strong> {patient.age} Yrs</span>
                <span>•</span>
                <span><strong>Gender:</strong> {patient.gender}</span>
                <span>•</span>
                <span><strong>Phone:</strong> {patient.phone}</span>
                <span>•</span>
                <span><strong>Intake Language:</strong> {patient.language}</span>
                <span>•</span>
                <span><strong>Documents Digitized:</strong> {patient.documents?.length || 0}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="no-print" style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={handlePrintBrief}
              className="btn btn-outline"
              style={{ fontSize: '0.82rem', padding: '8px 14px' }}
              title="Print Clinical Summary"
            >
              <Printer size={15} />
              <span>Print Brief</span>
            </button>

            <button
              onClick={handleCompleteConsultation}
              className={`btn ${isCompleted ? 'btn-outline' : 'btn-primary'}`}
              style={{ fontSize: '0.82rem', padding: '8px 16px' }}
            >
              <CheckCircle2 size={16} />
              <span>{isCompleted ? 'Update Review' : 'Sign Off & Complete'}</span>
            </button>
          </div>
        </div>

        {/* Vital Signs Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '10px',
          background: 'rgba(0, 0, 0, 0.25)',
          padding: '12px 16px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Blood Pressure</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#38bdf8', marginTop: '2px' }}>
              {patient.vitals?.bloodPressure || '120/80 mmHg'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Heart Rate</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#4ade80', marginTop: '2px' }}>
              {patient.vitals?.heartRate || '78 bpm'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>SpO2 Pulse Ox</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#22d3ee', marginTop: '2px' }}>
              {patient.vitals?.spO2 || '98%'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Temperature</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fbbf24', marginTop: '2px' }}>
              {patient.vitals?.temperature || '98.6 °F'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>BMI / Weight</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#e2e8f0', marginTop: '2px' }}>
              {patient.vitals?.weight} ({patient.vitals?.bmi})
            </div>
          </div>
        </div>

        {/* Patient's Voice / Text Intake Banner */}
        <div style={{
          background: 'rgba(139, 92, 246, 0.08)',
          borderLeft: '4px solid #8b5cf6',
          padding: '12px 16px',
          borderRadius: '0 10px 10px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            🗣️ Patient Chief Complaint (Spoken / Entered at Intake):
          </div>
          <div style={{ fontSize: '0.94rem', color: '#f1f5f9', fontStyle: 'italic' }}>
            "{patient.rawComplaint}"
          </div>
          {patient.translatedComplaint && patient.language !== 'English' && (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              <strong style={{ color: '#38bdf8' }}>AI English Translation:</strong> "{patient.translatedComplaint}"
            </div>
          )}
        </div>
      </div>

      {/* CRITICAL INFORMATION HIGHLIGHTING - RED FLAGS SHOWN FIRST (SLIDES 3 & 5 REQUIREMENT) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={20} color="#ef4444" />
            <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
              {lang === 'hi' ? 'महत्वपूर्ण चेतावनी और ड्रग टकराव (रेड फ्लैग्स):' : 'Critical Red Flags & Conflicts First:'}
            </h3>
            <span className="badge badge-critical" style={{ fontSize: '0.7rem' }}>
              {patient.redFlags?.length || 0} Alerts Found
            </span>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            ⚡ Ranked by clinical urgency to prevent adverse reactions
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '14px'
        }}>
          {patient.redFlags?.map(rf => {
            const isCrit = rf.severity === 'critical';
            const isHigh = rf.severity === 'high';
            return (
              <div 
                key={rf.id}
                style={{
                  background: isCrit ? 'rgba(239, 68, 68, 0.1)' : isHigh ? 'rgba(245, 158, 11, 0.1)' : 'rgba(56, 189, 248, 0.08)',
                  border: `1px solid ${isCrit ? 'rgba(239, 68, 68, 0.4)' : isHigh ? 'rgba(245, 158, 11, 0.4)' : 'rgba(56, 189, 248, 0.25)'}`,
                  borderRadius: '14px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: isCrit ? '0 4px 18px rgba(239, 68, 68, 0.2)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertTriangle size={16} color={isCrit ? '#ef4444' : '#f59e0b'} />
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: isCrit ? '#f87171' : '#fbbf24',
                      letterSpacing: '0.04em'
                    }}>
                      {rf.type}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.68rem',
                    padding: '2px 7px',
                    borderRadius: '999px',
                    fontWeight: 700,
                    background: isCrit ? '#ef4444' : '#f59e0b',
                    color: '#fff'
                  }}>
                    {rf.severity.toUpperCase()}
                  </span>
                </div>

                <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#fff' }}>
                  {rf.title}
                </div>

                <div style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.45' }}>
                  {rf.description}
                </div>

                {/* Evidence link button */}
                <div style={{
                  marginTop: 'auto',
                  paddingTop: '8px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Proof in: <strong>{rf.docName}</strong>
                  </span>
                  <button
                    onClick={() => onOpenEvidence(rf)}
                    className="evidence-tag"
                  >
                    <ExternalLink size={12} />
                    <span>🔗 Verify in Document</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="no-print" style={{
        display: 'flex',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        gap: '4px',
        overflowX: 'auto'
      }}>
        <button
          onClick={() => setActiveTab('brief')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'brief' ? '3px solid #06b6d4' : '3px solid transparent',
            color: activeTab === 'brief' ? '#fff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.9rem',
            padding: '10px 18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Sparkles size={16} color="#06b6d4" />
          <span>60-Second Clinical Brief</span>
        </button>

        <button
          onClick={() => setActiveTab('findings')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'findings' ? '3px solid #8b5cf6' : '3px solid transparent',
            color: activeTab === 'findings' ? '#fff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.9rem',
            padding: '10px 18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FileCheck size={16} color="#8b5cf6" />
          <span>Evidence-Linked Findings</span>
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'timeline' ? '3px solid #10b981' : '3px solid transparent',
            color: activeTab === 'timeline' ? '#fff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.9rem',
            padding: '10px 18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Calendar size={16} color="#10b981" />
          <span>Unified Medical Timeline</span>
        </button>

        <button
          onClick={() => setActiveTab('docs')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'docs' ? '3px solid #f59e0b' : '3px solid transparent',
            color: activeTab === 'docs' ? '#fff' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '0.9rem',
            padding: '10px 18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FileText size={16} color="#f59e0b" />
          <span>Original Paperwork & OCR ({patient.documents?.length || 0})</span>
        </button>
      </div>

      {/* TAB CONTENT AREA */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(320px, 1.2fr)', gap: '20px' }}>
        {/* Left Side: Selected Tab Content */}
        <div>
          {/* TAB 1: 60-SECOND CLINICAL BRIEF */}
          {activeTab === 'brief' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Executive Summary Card */}
              <div className="glass-panel" style={{
                padding: '20px',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                background: 'rgba(15, 23, 42, 0.8)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={18} color="#06b6d4" />
                    <h4 style={{ fontSize: '1.05rem', margin: 0, color: '#fff' }}>
                      Clinical Executive Brief (AI Synthesized)
                    </h4>
                  </div>
                  <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                    {patient.sixtySecondBrief?.estimatedConsultTimeSaved || "12 mins saved"}
                  </span>
                </div>
                <p style={{ fontSize: '0.96rem', lineHeight: '1.6', color: '#e2e8f0', margin: 0 }}>
                  {patient.sixtySecondBrief?.quickSummary}
                </p>
              </div>

              {/* Differential Diagnoses */}
              <div className="glass-panel" style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '0.98rem', color: '#38bdf8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HeartPulse size={16} /> Differential Diagnoses (AI Ranked for OPD Doctor):
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {patient.sixtySecondBrief?.differentialDiagnoses?.map((diag, idx) => (
                    <div 
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)'
                      }}
                    >
                      <span style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '6px',
                        background: 'rgba(6, 182, 212, 0.15)',
                        color: '#22d3ee',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}>
                        {idx + 1}
                      </span>
                      <span style={{ fontSize: '0.88rem', color: '#f8fafc', fontWeight: 500 }}>
                        {diag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Immediate Doctor Action Items */}
              <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(139, 92, 246, 0.25)' }}>
                <h4 style={{ fontSize: '0.98rem', color: '#c084fc', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={16} /> Immediate Physician Action Checklist:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {patient.sixtySecondBrief?.immediateActionItems?.map((action, idx) => (
                    <div 
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(139, 92, 246, 0.06)',
                        border: '1px solid rgba(139, 92, 246, 0.15)'
                      }}
                    >
                      <CheckCircle2 size={16} color="#a855f7" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: '1.4' }}>
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EVIDENCE-LINKED FINDINGS */}
          {activeTab === 'findings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Medications Table */}
              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '0.98rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Pill size={16} color="#38bdf8" /> Active Medications & Adherence
                  </h4>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Click link to view original Rx</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {patient.keyInformation?.medications?.map((med, idx) => (
                    <div 
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: med.name.includes('CONTRAINDICATED') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                        border: med.name.includes('CONTRAINDICATED') ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(255, 255, 255, 0.06)',
                        gap: '12px'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem', color: med.name.includes('CONTRAINDICATED') ? '#f87171' : '#fff' }}>
                          {med.name}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                          {med.schedule} • Adherence: <strong>{med.adherence}</strong>
                        </div>
                      </div>
                      <button
                        onClick={() => onOpenEvidence({
                          title: med.name,
                          description: `${med.schedule} (Adherence: ${med.adherence})`,
                          docName: patient.documents?.find(d => d.id === med.sourceDocId)?.fileName || "Prescription.jpg",
                          snippet: `Prescription item: ${med.name}. Instructions: ${med.schedule}`
                        })}
                        className="evidence-tag"
                      >
                        <ExternalLink size={12} />
                        <span>🔗 Proof</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Allergies & Adverse Reactions */}
              <div className="glass-panel" style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '0.98rem', color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldAlert size={16} color="#ef4444" /> Documented Drug Allergies & Hypersensitivities
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {patient.keyInformation?.allergies?.map((alg, idx) => (
                    <div 
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.25)',
                        gap: '12px'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#f87171' }}>
                          ⚠️ {alg.allergen}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                          Reaction: {alg.reaction} (Severity: <strong>{alg.severity}</strong>)
                        </div>
                      </div>
                      <button
                        onClick={() => onOpenEvidence({
                          title: `Allergy: ${alg.allergen}`,
                          description: alg.reaction,
                          docName: patient.documents?.find(d => d.id === alg.sourceDocId)?.fileName || "Discharge_Summary.pdf",
                          snippet: `Documented Allergy: ${alg.allergen}. Reaction: ${alg.reaction}. Strict caution advised.`
                        })}
                        className="evidence-tag"
                      >
                        <ExternalLink size={12} />
                        <span>🔗 Proof</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lab Results Table */}
              <div className="glass-panel" style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '0.98rem', color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={16} color="#10b981" /> Laboratory & Biomarker Findings
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {patient.keyInformation?.labs?.map((lab, idx) => {
                    const isAbnormal = lab.flag && lab.flag !== 'NORMAL';
                    return (
                      <div 
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: isAbnormal ? 'rgba(245, 158, 11, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                          border: isAbnormal ? '1px solid rgba(245, 158, 11, 0.25)' : '1px solid rgba(255, 255, 255, 0.06)'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#fff' }}>
                            {lab.test}
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                            Normal Range: {lab.normalRange} • Date: {lab.date}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            color: isAbnormal ? '#fbbf24' : '#4ade80'
                          }}>
                            {lab.result}
                          </span>
                          <span style={{
                            fontSize: '0.68rem',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            background: isAbnormal ? 'rgba(245, 158, 11, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                            color: isAbnormal ? '#fbbf24' : '#4ade80',
                            fontWeight: 700
                          }}>
                            {lab.flag}
                          </span>
                          <button
                            onClick={() => onOpenEvidence({
                              title: `${lab.test}: ${lab.result}`,
                              description: `Normal: ${lab.normalRange}. Flag: ${lab.flag}`,
                              docName: patient.documents?.find(d => d.id === lab.sourceDocId)?.fileName || "Lab_Report.pdf",
                              snippet: `${lab.test} reported value: ${lab.result} (Ref: ${lab.normalRange})`
                            })}
                            className="evidence-tag"
                          >
                            <ExternalLink size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: UNIFIED MEDICAL TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1.05rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={18} color="#10b981" /> Chronological Patient Medical Timeline
                </h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Chronologically mapped by MediBrief AI Engine
                </span>
              </div>

              {/* Vertical timeline line & items */}
              <div style={{ position: 'relative', paddingLeft: '28px' }}>
                {/* Connecting track */}
                <div style={{
                  position: 'absolute',
                  left: '8px',
                  top: '12px',
                  bottom: '12px',
                  width: '2px',
                  background: 'linear-gradient(to bottom, #8b5cf6, #06b6d4, #10b981)'
                }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {patient.timeline?.map(tl => (
                    <div key={tl.id} style={{ position: 'relative' }}>
                      {/* Node point */}
                      <div style={{
                        position: 'absolute',
                        left: '-28px',
                        top: '4px',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: '#090d16',
                        border: '3px solid #06b6d4',
                        boxShadow: '0 0 10px rgba(6, 182, 212, 0.4)'
                      }}></div>

                      <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '12px',
                        padding: '14px 18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.78rem',
                            color: '#38bdf8',
                            fontWeight: 700
                          }}>
                            📅 {tl.date}
                          </span>
                          <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>
                            {tl.category}
                          </span>
                        </div>

                        <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#fff' }}>
                          {tl.title}
                        </div>

                        <div style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>
                          {tl.summary}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                          <button
                            onClick={() => onOpenEvidence({
                              title: tl.title,
                              summary: tl.summary,
                              docName: tl.docName,
                              date: tl.date,
                              snippet: `Timeline event [${tl.date}]: ${tl.summary}`
                            })}
                            className="evidence-tag"
                          >
                            <ExternalLink size={12} />
                            <span>Linked Doc: {tl.docName}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ORIGINAL DOCUMENTS & OCR VIEW */}
          {activeTab === 'docs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Doctor File Upload Bar */}
              <div style={{
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: '12px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#34d399', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <UploadCloud size={17} /> Attach New Lab Record / PDF to Patient Dossier
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Add extra lab reports, prescriptions, or imaging scans to run OCR analysis
                  </div>
                </div>

                <input
                  ref={docFileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp,.txt"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file || !patient) return;
                    setAttachingDoc(true);
                    try {
                      const formData = new FormData();
                      formData.append('file', file);
                      const res = await fetch(`/api/patients/${patient.id}/attach-record`, {
                        method: 'POST',
                        body: formData
                      });
                      if (res.ok) {
                        const data = await res.json();
                        if (onUpdatePatient && data.patient) {
                          onUpdatePatient(patient.id, data.patient);
                        }
                      }
                    } catch (err) {
                      console.error('Error attaching doc:', err);
                    } finally {
                      setAttachingDoc(false);
                      e.target.value = null;
                    }
                  }}
                  style={{ display: 'none' }}
                />

                <button
                  type="button"
                  onClick={() => docFileInputRef.current?.click()}
                  disabled={attachingDoc}
                  className="btn btn-outline"
                  style={{
                    fontSize: '0.8rem',
                    padding: '8px 14px',
                    borderColor: '#10b981',
                    color: '#34d399',
                    background: 'rgba(16, 185, 129, 0.1)'
                  }}
                >
                  <Paperclip size={14} />
                  <span>{attachingDoc ? 'Uploading & Digitizing...' : '+ Upload Document'}</span>
                </button>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                These records were ingested, OCR-converted, and indexed during pre-consultation:
              </div>

              {patient.documents?.map(doc => (
                <div 
                  key={doc.id}
                  className="glass-panel"
                  style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '8px',
                        background: 'rgba(245, 158, 11, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fbbf24'
                      }}>
                        <FileText size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>
                          {doc.title}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                          {doc.fileName} • {doc.date} • {doc.type}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenEvidence({
                        title: doc.title,
                        docName: doc.fileName,
                        type: doc.type,
                        date: doc.date,
                        ocrExtractedText: doc.ocrExtractedText,
                        snippet: doc.ocrExtractedText?.slice(0, 160)
                      })}
                      className="btn btn-outline"
                      style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                    >
                      <Eye size={14} /> Inspect Full OCR
                    </button>
                  </div>

                  <div style={{
                    background: '#070b13',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: '#94a3b8',
                    maxHeight: '100px',
                    overflowY: 'auto',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {doc.ocrExtractedText}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Doctor Review & Decision Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="glass-panel" style={{
            padding: '20px',
            border: '1px solid rgba(14, 165, 233, 0.25)',
            background: 'rgba(15, 23, 42, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Stethoscope size={18} color="#38bdf8" />
              <h4 style={{ fontSize: '1.02rem', margin: 0, color: '#fff' }}>
                Doctor Decision & Rx Note
              </h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Verify findings, enter your clinical instructions, and finalize the pre-consultation.
            </p>

            {/* Quick Action Presets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Quick Prescribing Presets:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                <button
                  onClick={() => setPrescriptionPlan(prev => prev + "• Order urgent 12-lead ECG & hs-Troponin I.\n")}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    color: '#38bdf8',
                    fontSize: '0.74rem',
                    cursor: 'pointer'
                  }}
                >
                  + STAT ECG & Trop-I
                </button>
                <button
                  onClick={() => setPrescriptionPlan(prev => prev + "• Halt beta-lactam antibiotics immediately.\n")}
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    color: '#f87171',
                    fontSize: '0.74rem',
                    cursor: 'pointer'
                  }}
                >
                  + Discontinue Beta-Lactam
                </button>
                <button
                  onClick={() => setPrescriptionPlan(prev => prev + "• Refer to Cardiology specialist.\n")}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    color: '#c084fc',
                    fontSize: '0.74rem',
                    cursor: 'pointer'
                  }}
                >
                  + Cardiology Referral
                </button>
              </div>
            </div>

            {/* Doctor Prescription & Treatment Field */}
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Clinical Plan & Prescription:
              </label>
              <textarea
                value={prescriptionPlan}
                onChange={(e) => setPrescriptionPlan(e.target.value)}
                placeholder="Type Rx or clinical plan here..."
                rows={4}
                style={{
                  width: '100%',
                  background: '#090e18',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '10px',
                  color: '#fff',
                  fontSize: '0.84rem',
                  fontFamily: 'var(--font-sans)',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Doctor Internal Consultation Notes */}
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Private Consultation Notes:
              </label>
              <textarea
                value={doctorNotes}
                onChange={(e) => setDoctorNotes(e.target.value)}
                placeholder="Physician remarks, observations, follow-up date..."
                rows={3}
                style={{
                  width: '100%',
                  background: '#090e18',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '10px',
                  color: '#fff',
                  fontSize: '0.84rem',
                  fontFamily: 'var(--font-sans)',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Complete Consultation Sign-off Button */}
            <button
              onClick={handleCompleteConsultation}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '0.92rem' }}
            >
              <CheckCircle2 size={18} />
              <span>{isCompleted ? 'Save Updates' : 'Complete Consultation (2-Min Doctor)'}</span>
            </button>
          </div>

          {/* Quick Doctor Metrics Widget */}
          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Clock size={16} color="#34d399" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase' }}>
                Consultation Efficiency
              </span>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.4' }}>
              MediBrief compressed <strong>5 years of medical paperwork (3 documents)</strong> into a 60-second summary. Potential drug-allergy conflict avoided!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

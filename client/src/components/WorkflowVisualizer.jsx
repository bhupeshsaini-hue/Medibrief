import React, { useState } from 'react';
import {
  GitBranch,
  Mic,
  FileText,
  Search,
  Calendar,
  Clock,
  FileCheck2,
  Monitor,
  Stethoscope,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  Layers,
  TrendingUp,
  Users,
  Leaf,
  DollarSign,
  HeartHandshake,
  Award
} from 'lucide-react';

export default function WorkflowVisualizer({ lang }) {
  const [activeSlideTab, setActiveSlideTab] = useState('workflow'); // 'workflow', 'innovation', 'methodology', 'impact'

  const workflowSteps = [
    {
      step: 1,
      title: "Capture symptoms",
      desc: "Patient or doctor enters symptoms by voice or text in Hindi or English",
      actor: "people",
      icon: <Mic size={20} />
    },
    {
      step: 2,
      title: "Collect records",
      desc: "Prescriptions, lab reports, and medical PDFs are uploaded",
      actor: "people",
      icon: <FileText size={20} />
    },
    {
      step: 3,
      title: "Convert to text",
      desc: "Speech-to-text and OCR convert inputs to structured digital text",
      actor: "ai",
      icon: <Sparkles size={20} />
    },
    {
      step: 4,
      title: "Identify key information",
      desc: "AI extracts symptoms, drugs, allergies, and lab biomarker values",
      actor: "ai",
      icon: <Search size={20} />
    },
    {
      step: 5,
      title: "Build dated timeline",
      desc: "Records are put in date order on an interactive medical timeline",
      actor: "ai",
      icon: <Calendar size={20} />
    },
    {
      step: 6,
      title: "Create 60-sec brief",
      desc: "A concise summary of key findings, red flags, and risk conflicts",
      actor: "ai",
      icon: <Clock size={20} />
    },
    {
      step: 7,
      title: "Verify findings",
      desc: "Each key finding links directly to its source document for verification",
      actor: "people",
      icon: <FileCheck2 size={20} />
    },
    {
      step: 8,
      title: "Display summary",
      desc: "Allergies, drugs, and patient history shown on one screen",
      actor: "ai",
      icon: <Monitor size={20} />
    },
    {
      step: 9,
      title: "Make informed decisions",
      desc: "Doctor verifies facts and makes a faster, safer decision in under 2 minutes",
      actor: "people",
      icon: <Stethoscope size={20} />
    }
  ];

  return (
    <div className="container" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Title & Presentation Meta Header (Slide 1) */}
      <div className="glass-panel" style={{
        padding: '24px 30px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(18, 26, 44, 0.9))',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-teal" style={{ fontSize: '0.72rem' }}>
              Problem Statement ID — 01
            </span>
            <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>
              Theme: AI for Healthcare
            </span>
            <span className="badge badge-info" style={{ fontSize: '0.72rem' }}>
              Category: Software
            </span>
          </div>

          <h2 style={{
            fontSize: '1.8rem',
            color: '#fff',
            margin: '4px 0 8px 0',
            fontFamily: 'var(--font-display)'
          }}>
            TITLE: The Two-Minute Doctor
          </h2>

          <p style={{ color: '#cbd5e1', fontSize: '0.94rem', margin: 0, maxWidth: '720px' }}>
            <strong>Problem Statement:</strong> An AI Pre-Consultation Assistant that converts patient's Paperwork into a Summary.
          </p>
        </div>

        {/* Team Arogya Badge */}
        <div style={{
          background: 'rgba(6, 182, 212, 0.08)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          borderRadius: '14px',
          padding: '16px 20px',
          textAlign: 'right'
        }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
            Registered Team Name
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#22d3ee', margin: '2px 0' }}>
            Arogya
          </div>
          <div style={{ fontSize: '0.78rem', color: '#c084fc', fontFamily: 'var(--font-mono)' }}>
            Team ID: AAYU-XJDK
          </div>
        </div>
      </div>

      Slide Navigation Tabs
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBottom: '12px',
        overflowX: 'auto'
      }}>
        <button
          onClick={() => setActiveSlideTab('workflow')}
          className={`btn ${activeSlideTab === 'workflow' ? 'btn-primary' : 'btn-outline'}`}
          style={{ fontSize: '0.84rem' }}
        >
          <GitBranch size={15} />
          <span>Slide 2: 9-Step MediBrief Workflow</span>
        </button>

        <button
          onClick={() => setActiveSlideTab('innovation')}
          className={`btn ${activeSlideTab === 'innovation' ? 'btn-ai' : 'btn-outline'}`}
          style={{ fontSize: '0.84rem' }}
        >
          <Sparkles size={15} />
          <span>Slide 3: Innovation & Uniqueness</span>
        </button>

        <button
          onClick={() => setActiveSlideTab('methodology')}
          className={`btn ${activeSlideTab === 'methodology' ? 'btn-primary' : 'btn-outline'}`}
          style={{ fontSize: '0.84rem' }}
        >
          <Layers size={15} />
          <span>Slide 4: Methodology Breakdown</span>
        </button>

        <button
          onClick={() => setActiveSlideTab('impact')}
          className={`btn ${activeSlideTab === 'impact' ? 'btn-outline' : 'btn-outline'}`}
          style={{
            fontSize: '0.84rem',
            borderColor: activeSlideTab === 'impact' ? '#10b981' : 'transparent',
            background: activeSlideTab === 'impact' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
            color: activeSlideTab === 'impact' ? '#34d399' : 'var(--text-muted)'
          }}
        >
          <TrendingUp size={15} />
          <span>Slide 5: Impact & Benefits</span>
        </button>
      </div>

      TAB 1: 9-STEP WORKFLOW DIAGRAM (SLIDE 2)
      {activeSlideTab === 'workflow' && (
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: 0 }}>
                MediBrief: AI-powered clinical assistant
              </h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                End-to-end clinical workflow connecting patients and doctors via AI
              </p>
            </div>

            {/* Legend for People vs AI (exact match to screenshot) */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#10b981' }}></span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#34d399' }}>By people</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#8b5cf6' }}></span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#c084fc' }}>By AI system</span>
              </div>
            </div>
          </div>

          {/* Flow Stepper Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px'
          }}>
            {workflowSteps.map((s) => {
              const isAI = s.actor === 'ai';
              return (
                <div
                  key={s.step}
                  style={{
                    background: isAI ? 'rgba(139, 92, 246, 0.08)' : 'rgba(16, 185, 129, 0.08)',
                    border: `1px solid ${isAI ? 'rgba(139, 92, 246, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
                    borderRadius: '14px',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: isAI ? '#8b5cf6' : '#10b981',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {s.icon}
                    </div>

                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      background: isAI ? 'rgba(139, 92, 246, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                      color: isAI ? '#c084fc' : '#34d399'
                    }}>
                      Step {s.step} • {isAI ? 'By AI System' : 'By People'}
                    </span>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '6px' }}>
                      {s.title}
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: '1.45', margin: 0 }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: INNOVATION & UNIQUENESS (SLIDE 3) */}
      {activeSlideTab === 'innovation' && (
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '20px' }}>
            Innovation & Uniqueness of Our Solution
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '18px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#38bdf8', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} /> 60-Second Clinical Brief
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0, lineHeight: '1.5' }}>
                Converts scattered medical records and bulky OPD files into a quick, doctor-friendly summary ready before the patient enters the chamber.
              </p>
            </div>

            <div style={{
              background: 'rgba(139, 92, 246, 0.08)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#c084fc', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileCheck2 size={18} /> Evidence-Linked Information
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0, lineHeight: '1.5' }}>
                Connects every key finding directly to its original medical document, page, and OCR excerpt for instant 1-click physician verification.
              </p>
            </div>

            <div style={{
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f87171', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={18} /> Critical Information Highlighting
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0, lineHeight: '1.5' }}>
                Makes critical details, such as severe drug allergies (e.g. Penicillin) and contraindicated medications, immediately noticeable at the top.
              </p>
            </div>

            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#34d399', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} /> Unified Medical Timeline
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0, lineHeight: '1.5' }}>
                Creates a unified, chronological patient timeline sorting historical prescriptions, admissions, and lab panels into clean sequential order.
              </p>
            </div>

            <div style={{
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fbbf24', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mic size={18} /> Multimodal Patient Input
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0, lineHeight: '1.5' }}>
                Accepts spoken voice (Hindi or English), typed complaints, handwritten prescriptions, mobile photos, and multi-page medical PDFs.
              </p>
            </div>

            <div style={{
              background: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#22d3ee', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={18} /> AI-Powered Data Extraction
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0, lineHeight: '1.5' }}>
                Extracts relevant medical information, clinical entities, dosages, and abnormal lab biomarkers from unstructured clinical documents.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: METHODOLOGY (SLIDE 4) */}
      {activeSlideTab === 'methodology' && (
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '20px' }}>
            System Methodology & Implementation Pipeline
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '18px'
            }}>
              <h4 style={{ fontSize: '1.05rem', color: '#38bdf8', marginBottom: '6px' }}>
                1. Patient Input & Document Collection
              </h4>
              <ul style={{ paddingLeft: '20px', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.6' }}>
                <li>Capture patient complaints through voice or text input in native languages.</li>
                <li>Upload prescriptions, laboratory reports, discharge summaries, and medical PDFs.</li>
              </ul>
            </div>

            <div style={{
              background: 'rgba(139, 92, 246, 0.06)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '12px',
              padding: '18px'
            }}>
              <h4 style={{ fontSize: '1.05rem', color: '#c084fc', marginBottom: '6px' }}>
                2. AI-Based Data Processing
              </h4>
              <ul style={{ paddingLeft: '20px', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.6' }}>
                <li>Convert voice input into text using Speech-to-Text with multi-lingual Hindi & English support.</li>
                <li>Extract text and structured tables from medical records using Optical Character Recognition (OCR).</li>
              </ul>
            </div>

            <div style={{
              background: 'rgba(6, 182, 212, 0.06)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              borderRadius: '12px',
              padding: '18px'
            }}>
              <h4 style={{ fontSize: '1.05rem', color: '#22d3ee', marginBottom: '6px' }}>
                3. Medical Information Extraction & Organization
              </h4>
              <ul style={{ paddingLeft: '20px', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.6' }}>
                <li>Identify symptoms, active medications, allergies, and laboratory values using Named Entity Recognition.</li>
                <li>Organize extracted information into a chronological patient medical timeline.</li>
              </ul>
            </div>

            <div style={{
              background: 'rgba(239, 68, 68, 0.06)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '12px',
              padding: '18px'
            }}>
              <h4 style={{ fontSize: '1.05rem', color: '#f87171', marginBottom: '6px' }}>
                4. Clinical Summarization & Evidence Linking
              </h4>
              <ul style={{ paddingLeft: '20px', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.6' }}>
                <li>Generate a concise, 60-second clinical brief using advanced LLM reasoning.</li>
                <li>Link important medical facts to their original documents for 1-click verification.</li>
              </ul>
            </div>

            <div style={{
              background: 'rgba(16, 185, 129, 0.06)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '12px',
              padding: '18px'
            }}>
              <h4 style={{ fontSize: '1.05rem', color: '#34d399', marginBottom: '6px' }}>
                5. Doctor Dashboard & Clinical Review
              </h4>
              <ul style={{ paddingLeft: '20px', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.6' }}>
                <li>Display the summarized medical history and red flags in a unified, high-contrast dashboard.</li>
                <li>Enable OPD doctors to verify patient information and make informed clinical decisions in 2 minutes.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: IMPACT & BENEFITS (SLIDE 5) */}
      {activeSlideTab === 'impact' && (
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: '0 0 6px 0' }}>
              Potential Impact on Target Audience
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Addressing core pain points in crowded OPDs and government hospitals
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            <div style={{
              background: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#22d3ee', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Stethoscope size={18} /> For Doctors
              </div>
              <p style={{ color: '#e2e8f0', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                One clear screen to understand a patient fast, with red flags and conflicts shown first. Eliminates 12 minutes of manual history-taking per consult.
              </p>
            </div>

            <div style={{
              background: 'rgba(139, 92, 246, 0.08)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#c084fc', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} /> For Patients
              </div>
              <p style={{ color: '#e2e8f0', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                Explain their problem in Hindi or English while waiting in the OPD queue, ensuring their old records and allergies are actually utilized.
              </p>
            </div>

            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#34d399', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HeartHandshake size={18} /> For Hospital Staff
              </div>
              <p style={{ color: '#e2e8f0', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>
                Less repeated paperwork and redundant history taking in crowded OPD registration desks.
              </p>
            </div>
          </div>

          Triple Benefits: Social, Economic, Environmental
          <div>
            <h4 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '14px' }}>
              Triple Bottom-Line Benefits
            </h4>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '20px'
              }}>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={18} /> Social Benefit
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0, lineHeight: '1.5' }}>
                  Provides better and safer care in crowded government hospitals, bridging the language barrier with Hindi support for everyone.
                </p>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '20px'
              }}>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fbbf24', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <DollarSign size={18} /> Economic Benefit
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0, lineHeight: '1.5' }}>
                  Low cost. Uses simple AI models and runs on standard existing hardware. Saves valuable doctor hours and avoids repeating costly lab tests.
                </p>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '20px'
              }}>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#4ade80', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Leaf size={18} /> Environmental Benefit
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.88rem', margin: 0, lineHeight: '1.5' }}>
                  Paperless OPD: patient history and old records are captured digitally, dramatically reducing paper file folders and printing waste.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

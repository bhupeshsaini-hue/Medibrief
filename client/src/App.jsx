import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DoctorDashboard from './components/DoctorDashboard';
import PatientIntake from './components/PatientIntake';
import WorkflowVisualizer from './components/WorkflowVisualizer';
import MetricsView from './components/MetricsView';
import EvidenceModal from './components/EvidenceModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('doctor'); // 'doctor', 'intake', 'workflow', 'metrics'
  const [lang, setLang] = useState('en'); // 'en', 'hi'
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('MB-2026-081');
  const [activeEvidence, setActiveEvidence] = useState(null);
  const [backendOnline, setBackendOnline] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initial fetch from Express backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Test health
        const healthRes = await fetch('/api/health');
        if (healthRes.ok) {
          setBackendOnline(true);
        }

        // Fetch patients
        const pRes = await fetch('/api/patients');
        if (pRes.ok) {
          const list = await pRes.json();
          // Fetch full detailed object for each patient
          const detailedPatients = await Promise.all(
            list.map(async (p) => {
              const detailRes = await fetch(`/api/patients/${p.id}`);
              return detailRes.ok ? await detailRes.json() : p;
            })
          );
          setPatients(detailedPatients);
          if (detailedPatients.length > 0) {
            setSelectedPatientId(detailedPatients[0].id);
          }
        }

        // Fetch metrics
        const mRes = await fetch('/api/metrics');
        if (mRes.ok) {
          const mData = await mRes.json();
          setMetrics(mData);
        }
      } catch (err) {
        console.warn('Backend connection notice:', err);
        setBackendOnline(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handler when new patient is created in intake portal
  const handlePatientCreated = (newPatient) => {
    setPatients(prev => [newPatient, ...prev]);
    setSelectedPatientId(newPatient.id);
    setActiveTab('doctor'); // Instantly switch to doctor dashboard
  };

  // Handler for doctor review update
  const handleUpdatePatient = (patientId, updates) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return { ...p, ...updates };
      }
      return p;
    }));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Global Navbar with Internet Icon & Team Arogya branding */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        lang={lang} 
        setLang={setLang}
        backendOnline={backendOnline}
        queueCount={patients.length}
      />

      {/* Main Body */}
      <main style={{ flex: 1, paddingBottom: '60px' }}>
        {activeTab === 'doctor' && (
          <DoctorDashboard 
            patients={patients}
            selectedPatientId={selectedPatientId}
            setSelectedPatientId={setSelectedPatientId}
            onOpenEvidence={(ev) => setActiveEvidence(ev)}
            onUpdatePatient={handleUpdatePatient}
            lang={lang}
          />
        )}

        {activeTab === 'intake' && (
          <PatientIntake 
            onPatientCreated={handlePatientCreated}
            lang={lang}
          />
        )}

        {activeTab === 'workflow' && (
          <WorkflowVisualizer 
            lang={lang}
          />
        )}

        {activeTab === 'metrics' && (
          <MetricsView 
            metrics={metrics}
            lang={lang}
          />
        )}
      </main>

      {/* Evidence Document Modal */}
      {activeEvidence && (
        <EvidenceModal 
          evidence={activeEvidence}
          onClose={() => setActiveEvidence(null)}
          onVerify={(ev) => {
            console.log('Verified finding:', ev);
          }}
        />
      )}

      {/* Minimal Footer */}
      <footer className="no-print" style={{
        textAlign: 'center',
        padding: '20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        color: 'var(--text-dim)',
        fontSize: '0.78rem',
        background: 'rgba(9, 13, 22, 0.95)'
      }}>
        MediBrief • The Two-Minute Doctor • Team Arogya (AAYU-XJDK) • Problem Statement 01 • AI for Healthcare
      </footer>
    </div>
  );
}

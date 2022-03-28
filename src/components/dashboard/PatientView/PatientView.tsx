import React, { useState, useEffect, useContext } from 'react';
// eslint-disable-next-line import/no-unresolved
import '../../../static/style/CovidData.css';
import {
  Box,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Modal,
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import BiotechIcon from '@mui/icons-material/Biotech';
import { useNavigate } from 'react-router-dom';
import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import { UserContext } from '../../../context/UserContext';
import SideBar from '../../layout/SideBar';
import UpdateTestResult from './UpdateTestResult';
import TestResults from './TestResults';
import { firestore } from '../../../config/firebase_config';
import PatientDashboard from './PatientDashboard';
import PatientMedicalConnect from './PatientMedicalConnect';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  boxShadow: 0,
  margin: 0,
  p: 4,
};

function PatientView() {
  const [contentId, setContentId] = useState<number>(0);
  const navigate = useNavigate();
  const [testOpen, setTestOpen] = useState(false);
  const [testROpen, setTestROpen] = useState(false);
  const handleTestOpen = () => setTestOpen(true);
  const handleTestClose = () => setTestOpen(false);
  const handleTestROpen = () => setTestROpen(true);
  const handleTestRClose = () => setTestROpen(false);
  const { state } = useContext(UserContext);
  const [user, setUser] = useState<DocumentData>();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(firestore, 'users', `${state.id}`), (docu) => {
      const data = docu.data();
      if (data) {
        setUser(data);
      }
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <CssBaseline />
      <SideBar>
        <List>
          <ListItem button key="Dashboard" onClick={() => setContentId(0)}>
            <ListItemIcon>
              <DashboardOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button key="Dashboard2">
            <ListItemIcon>
              <CoronavirusIcon />
            </ListItemIcon>
            <ListItemText data-testid="covidtest2" primary="Add Covid-19 Test" onClick={handleTestOpen} />
          </ListItem>
          <ListItem button key="Test">
            <ListItemIcon>
              <BiotechIcon />
            </ListItemIcon>
            <ListItemText data-testid="TestResults" primary="Test Results" onClick={handleTestROpen} />
          </ListItem>
          {user?.assignedDoctor && (
            <ListItem button key="Results" data-testid="SymptomsUpdate2">
              <ListItemIcon>
                <ContentPasteIcon />
              </ListItemIcon>
              <ListItemText
                primary="Symptoms Update"
                onClick={() => { navigate('/symptomsUpdate'); }}
              />
            </ListItem>
          )}
        </List>
        <Divider />
      </SideBar>
      {contentId === 0 && <PatientDashboard setContentId={setContentId} />}
      {contentId === 1 && <PatientMedicalConnect />}
      <Modal
        open={testOpen}
        onClose={handleTestClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateTestResult handleTestClose={handleTestClose} />
        </Box>
      </Modal>
      <Modal
        open={testROpen}
        onClose={handleTestRClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TestResults handleTestRClose={handleTestRClose} />
        </Box>
      </Modal>
    </Box>
  );
}

export default PatientView;
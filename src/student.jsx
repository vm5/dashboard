import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { sessionDataStudent, sessionDataTeacher, testAssignmentsData } from './data'; // Import test/assignment data
import { userCodes } from './usercodes'; // Import user codes from the new file

// Define all styled components here
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
  background-image: url('https://img.freepik.com/free-photo/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall_1258-28313.jpg');
  background-size: cover;
  background-position: center;

  @media (min-width: 768px) {
    flex-direction: row; /* Switch to row layout on wider screens */
  }
`;

const Sidebar = styled.div`
  width: 100%;
  background-color: rgba(28, 37, 54, 0.8);
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    width: 300px; /* Increased width for larger screens */
    margin-bottom: 0; /* Remove margin when sidebar is not stacked */
  }
`;

const SidebarItem = styled.div`
  padding: 20px;
  color: ${(props) => (props.active ? '#fff' : '#adb5bd')};
  font-size: 1.2em; /* Increased font size */
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 10px;
  border-radius: 8px;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  margin: 30px;

  @media (min-width: 768px) {
    margin: 30px;
    padding: 50px; /* Increased padding for larger screens */
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;

  @media (min-width: 768px) {
    flex-direction: row; /* Horizontal layout for larger screens */
    align-items: center;
  }
`;

const WelcomeMessage = styled.div`
  font-size: 2em; /* Increased font size */
  color: #333;
  margin-bottom: 15px;

  @media (min-width: 768px) {
    margin-bottom: 0; /* Align text with the calendar on larger screens */
  }
`;

const DateSelector = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2em; /* Increased font size */
`;

const CalendarButton = styled.a`
  margin-left: 15px;
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.1em; /* Increased font size */

  &:hover {
    background-color: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 25px;
  font-size: 1em;

  @media (min-width: 768px) {
    font-size: 1.1em; /* Normal font size for larger screens */
  }
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th`
  padding: 15px; /* Increased padding */
  text-align: left;
  border-bottom: 2px solid #ddd; /* Thicker border */
`;

const TableCell = styled.td`
  padding: 15px; /* Increased padding */
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const ExitButton = styled.button`
  margin-top: 30px;
  padding: 12px 20px; /* Increased padding */
  border: none;
  background-color: #dc3545;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em; /* Increased font size */

  &:hover {
    background-color: #c82333;
  }
`;

const AssignmentsSection = styled.div`
  margin-top: 30px; /* Increased margin */
`;

const AssignmentsHeader = styled.h2`
  font-size: 1.4em; /* Increased font size */
  margin-bottom: 15px; /* Increased margin */
`;

const AssignmentsTable = styled(Table)`
  margin-top: 0;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-image: url('https://img.freepik.com/free-photo/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall_1258-28313.jpg');
  background-size: cover;
  background-position: center;
  color: silver;
  padding: 30px;
  text-align: center;
`;

const LoginForm = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 30px;
  border-radius: 15px; /* Increased border-radius */
  width: 100%;
  max-width: 450px; /* Increased maximum width for login form */
  height: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Added box shadow for better visibility */
`;


const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');
  const [inputCode, setInputCode] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  const handleLogin = () => {
    const trimmedInputCode = inputCode.trim(); // Trim whitespace from input code
    const foundUser = Object.values(userCodes).find(user => user.code === trimmedInputCode);
  
    if (foundUser) {
      setIsAuthenticated(true);
      setRole(foundUser.role);
      setUserName(foundUser.name);
      setInputCode(''); // Clear the input after successful login
    } else {
      alert('Incorrect code. Please try again.');
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole('');
    setUserName('');
    setInputCode('');
  };

  const renderDashboard = () => {
    const data = role === 'teacher' ? sessionDataTeacher : sessionDataStudent;
    const testsAndAssignments = role === 'student' ? testAssignmentsData : [];

    return (
      <Container>
        <Sidebar>
          <div>
            <SidebarItem active>Dashboard</SidebarItem>
            {role === 'student' && <SidebarItem>Information with respect to Tests shall be displayed here</SidebarItem>}
          </div>
          <SidebarItem>{userName}<br /></SidebarItem>
          <ExitButton onClick={handleLogout}>Exit</ExitButton>
        </Sidebar>
        <MainContent>
          <Header>
            <WelcomeMessage>
              Welcome {userName}!<br />
            </WelcomeMessage>
            <DateSelector>
              {selectedDate}
              <CalendarButton href="https://calendar.google.com/calendar/u/0/r?hl=en" target="_blank" rel="noopener noreferrer">
                View Calendar
              </CalendarButton>
            </DateSelector>
          </Header>

          {/* Session Table */}
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Session Number</TableHeader>
                <TableHeader>Sessions</TableHeader>
                <TableHeader>Topics</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {data.map((session, index) => (
                <TableRow key={session.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {session.time}<br />
                    <a 
                      href={session.sessionType.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {session.sessionType.type}
                    </a><br />
                    {session.subject}
                  </TableCell>
                  <TableCell>{session.topics}</TableCell>
                  <TableCell>...</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>

          {/* Tests/Assignments Section */}
          {role === 'student' && (
            <AssignmentsSection>
              <AssignmentsHeader>Tests</AssignmentsHeader>
              <AssignmentsTable>
                <TableHead>
                  <TableRow>
                    <TableHeader>Test Number</TableHeader>
                    <TableHeader>Test/Assignment</TableHeader>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>Actions</TableHeader>
                  </TableRow>
                </TableHead>
                <tbody>
                  {testsAndAssignments.map((test, index) => (
                    <TableRow key={test.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{test.name}</TableCell>
                      <TableCell>{test.date}</TableCell>
                      <TableCell>...</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </AssignmentsTable>
            </AssignmentsSection>
          )}
        </MainContent>
      </Container>
    );
  };

  return (
    <>
      {isAuthenticated ? (
        renderDashboard()
      ) : (
        <LoginContainer>
          <LoginForm>
            <h2>Welcome to ProdigyPeak's Dashboard. This Dashboard helps streamline the entire process. To acceess it, please enter the code assigned to you!</h2>
            <input
              type="text"
              placeholder="Enter the code assigned to you"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
            />
            <button onClick={handleLogin}>Access</button>
          </LoginForm>
        </LoginContainer>
      )}
    </>
  );
};

export default Dashboard;

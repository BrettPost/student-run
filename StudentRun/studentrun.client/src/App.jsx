import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Container from './Container';

function App() {
  

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Container />
            </Router>
        </QueryClientProvider>
  );
}

export default App;
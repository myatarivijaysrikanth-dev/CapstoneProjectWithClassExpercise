import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import QuestionCard from '../components/questions/QuestionCard';

const mockQuestion = {
  _id: '123',
  title: 'What is Node.js and how does it work?',
  description: 'I want to understand the Node.js event loop in detail.',
  topic: 'Node.js',
  isOpen: true,
  askedBy: { username: 'testuser' },
  createdAt: new Date().toISOString(),
};

describe('QuestionCard Component', () => {
  test('renders question title', () => {
    render(<MemoryRouter><QuestionCard question={mockQuestion} /></MemoryRouter>);
    expect(screen.getByText('What is Node.js and how does it work?')).toBeInTheDocument();
  });

  test('renders topic badge', () => {
    render(<MemoryRouter><QuestionCard question={mockQuestion} /></MemoryRouter>);
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  test('renders asked by username', () => {
    render(<MemoryRouter><QuestionCard question={mockQuestion} /></MemoryRouter>);
    expect(screen.getByText(/testuser/i)).toBeInTheDocument();
  });

  test('shows Resolved badge when thread is closed', () => {
    render(
      <MemoryRouter>
        <QuestionCard question={{ ...mockQuestion, isOpen: false }} />
      </MemoryRouter>
    );
    expect(screen.getByText('Resolved')).toBeInTheDocument();
  });
});
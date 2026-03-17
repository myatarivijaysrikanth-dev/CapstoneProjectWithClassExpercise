import React from 'react';
import QuestionCard from './QuestionCard';

const QuestionList = ({ questions }) => {
  if (!questions || questions.length === 0) {
    return (
      <div className="text-center text-muted py-5">
        <h5>No questions found.</h5>
        <p>Be the first to ask a question!</p>
      </div>
    );
  }

  return (
    <div>
      {questions.map((question) => (
        <QuestionCard key={question._id} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;
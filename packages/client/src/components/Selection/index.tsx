import React, { useState } from 'react';

interface VoteOption {
  id: number;
  label: string;
  count: number;
}

const VoteComponent: React.FC = () => {
  const [voteOptions, setVoteOptions] = useState<VoteOption[]>([
    { id: 1, label: 'Option 1', count: 0 },
    { id: 2, label: 'Option 2', count: 0 },
    { id: 3, label: 'Option 3', count: 0 },
    { id: 4, label: 'Option 4', count: 0 },
    { id: 5, label: 'Option 5', count: 0 },
  ]);

  const [totalVotes, setTotalVotes] = useState(0);

  const handleVote = (optionId: number) => {
    const updatedOptions = voteOptions.map((option) =>
      option.id === optionId ? { ...option, count: option.count + 1 } : option
    );
    setVoteOptions(updatedOptions);
    setTotalVotes(totalVotes + 1);
  };

  return (
    <div className="p-4">
      <div className="mb-2">
        Total Votes: <span className="font-bold">{totalVotes}</span>
      </div>
      {voteOptions.map((option) => (
        <div key={option.id} className="flex items-center mb-2">
          <button
            onClick={() => handleVote(option.id)}
            className="p-2 bg-blue-500 text-white rounded mr-2"
          >
            {option.label}
          </button>
          <div className="relative flex-grow h-4 bg-gray-300 rounded">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 rounded"
              style={{ width: `${(option.count / totalVotes) * 100}%` }}
            />
          </div>
          <span className="ml-2">{`${((option.count / totalVotes) * 100).toFixed(2)}%`}</span>
        </div>
      ))}
    </div>
  );
};

export default VoteComponent;
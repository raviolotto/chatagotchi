import React, { useState } from 'react';

interface NameEditorProps {
  currentName: string;
  onNameChange: (name: string) => void;
}

export const NameEditor: React.FC<NameEditorProps> = ({
  currentName,
  onNameChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(currentName);

  const handleSave = () => {
    if (tempName.trim()) {
      onNameChange(tempName.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempName(currentName);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 justify-center">
        <input
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onKeyDown={handleKeyPress}
          className="px-3 py-1 border-2 border-blue-300 rounded-lg text-center focus:outline-none focus:border-blue-500"
          maxLength={20}
          autoFocus
        />
        <button
          onClick={handleSave}
          className="px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
        >
          OK
        </button>
        <button
          onClick={handleCancel}
          className="px-2 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
        >
          X
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="group flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 py-1 transition-colors"
    >
      <h2 className="text-xl font-semibold text-gray-700">
        {currentName}
      </h2>
      <span className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
        ✎
      </span>
    </button>
  );
};

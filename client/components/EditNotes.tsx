import { useState } from 'react';
import { useAddNote } from '../hooks/useAddNote';

interface EditNotesProps {
  sessionId: number;
  currentNotes: string;
  onClose: () => void;
}

export default function EditNotes({ sessionId, currentNotes, onClose }: EditNotesProps) {
  const [notes, setNotes] = useState(currentNotes);
  const { mutate, isPending, isError } = useAddNote(sessionId, notes);

  const handleSave = () => {
    mutate();
    onClose();
  };

  return (
    <div>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button onClick={handleSave} disabled={isPending}>
        Save
      </button>
      {isError && <p>Error saving notes.</p>}
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

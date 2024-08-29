import { useState } from 'react';
import Modal from './Modal';
import SessionForm from './AddSessionForm';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <h1>Welcome to the Workout </h1>
      <button onClick={openModal}>Add New Session</button>
      <Modal show={isModalOpen} onClose={closeModal}>
        <SessionForm />
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
}

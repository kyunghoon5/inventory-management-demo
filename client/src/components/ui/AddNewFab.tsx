import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import VendorAddModal from '../../pages/vendor/components/VendorAddModal';
import ContactAddModal from '../../pages/vendor/vendorId/components/ContactAddModal';

interface AddNewFabProps {
  title?: string;
  setModalIsOpen?: (value: boolean) => void;
  modalIsOpen?: boolean;
  setModalContactDetailIsOpen?: (value: boolean) => void;
  modalContactDetailIsOpen?: boolean;
}

const AddNewFab: React.FC<AddNewFabProps> = ({
  title,
  setModalIsOpen,
  modalIsOpen,
  setModalContactDetailIsOpen,
  modalContactDetailIsOpen,
}) => {
  return (
    <>
      <button
        className="bg-white border rounded-full shadow-md text-purple-500 font-bold py-2 px-4 hover:text-purple-400 hover:shadow-lg"
        onClick={() => {
          if (setModalContactDetailIsOpen) {
            setModalContactDetailIsOpen(!modalContactDetailIsOpen);
          }
          if (setModalIsOpen) setModalIsOpen(!modalIsOpen);
        }}
      >
        <FontAwesomeIcon
          icon={faPlus}
          style={{ color: '#8E24AA', marginRight: '6px' }}
          size="xl"
        />
        {title}
      </button>
      {modalIsOpen ? (
        <VendorAddModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen ? setModalIsOpen : () => {}}
        />
      ) : null}
      {modalContactDetailIsOpen ? (
        <ContactAddModal
          modalContactDetailIsOpen={modalContactDetailIsOpen}
          setModalContactDetailIsOpen={setModalContactDetailIsOpen? setModalContactDetailIsOpen: ()=>{}}
        />
      ) : null}
    </>
  );
};

export default AddNewFab;

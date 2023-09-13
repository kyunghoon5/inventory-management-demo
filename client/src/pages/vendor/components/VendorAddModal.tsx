import Modal from 'react-modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import '../../../styles/modal.css';

interface VendorAddModalProps {
  setModalIsOpen: (value: boolean) => void;
  modalIsOpen: boolean;
}

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-25%',
    marginTop: '35%',
    transform: 'translate(-50%, -50%)',
  },
};

const VendorAddModal: React.FC<VendorAddModalProps> = ({
  setModalIsOpen,
  modalIsOpen,
}) => {
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    closeModal();
    window.location.reload();
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal w-[750px]"
        overlayClassName="modal-fondo"
      >
        <h1 className="text-[25px] font-bold bg-purple-200 pl-4 rounded-md">
          Add Vendor
        </h1>
        <hr />

        <form className="container" onSubmit={handleSubmitForm}>
          <div className="pt-8">
            <label className="font-bold">Vendor Order Lead Time</label>
            <input
              type="number"
              placeholder="days"
              name="leadtime"
              autoComplete="off"
              className="flex mt-2   bg-white rounded-full shadow-md w-full outline-purple-500 h-8 font-bold text-lg pl-3"
            />
          </div>

          <div className="pt-4">
            <label className="font-bold">Vendor Name</label>
            <input
              type="text"
              placeholder="Name"
              name="vendorName"
              autoComplete="off"
              className="flex mt-2   bg-white rounded-full shadow-md w-full outline-purple-500 h-8 font-bold text-lg pl-3"
            />
          </div>
          <div className="pt-4">
            <label className="font-bold">Contact Email</label>
            <input
              type="text"
              placeholder="Email"
              name="vendorName"
              autoComplete="off"
              className="flex mt-2   bg-white rounded-full shadow-md w-full outline-purple-500 h-8 font-bold text-lg pl-3"
            />
          </div>

          <div className="pt-4">
            <label className="font-bold">Contact Phone Number</label>
            <input
              type="text"
              placeholder="Phone"
              name="vendorName"
              autoComplete="off"
              className="flex mt-2   bg-white rounded-full shadow-md w-full outline-purple-500 h-8 font-bold text-lg pl-3"
            />
          </div>

          <div className="pt-4">
            <label className="font-bold">Website</label>
            <input
              type="text"
              placeholder="URL"
              name="website"
              autoComplete="off"
              className="flex mt-2   bg-white rounded-full shadow-md w-full outline-purple-500 h-8 font-bold text-lg pl-3"
            />
          </div>

          <div className="pt-4 pb-4">
            <label className="font-bold">Address</label>
            <textarea
              placeholder="Address"
              rows={4}
              name="Address"
              autoComplete="off"
              className="flex mt-2   bg-white  shadow-md w-full outline-purple-500  font-bold  pl-3"
            ></textarea>
          </div>

          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="outlined">
              <span> Submit</span>
            </Button>

            <Button onClick={closeModal} variant="outlined" color="error">
              <span> Cancel</span>
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default VendorAddModal;

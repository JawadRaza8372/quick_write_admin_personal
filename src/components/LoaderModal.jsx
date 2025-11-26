import { ReactComponent as Ring } from "@assets/oval.svg";
import { Modal } from "@mui/material";
const LoaderModal = ({ isOpen }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <Modal open={isOpen}>
      <div className="flex flex-1 h-[100%] w-[100%] justify-center items-center">
        <div className="!w-[150px] card rounded-[30px] !h-[150px] text-accent">
          <Ring />
        </div>
      </div>
    </Modal>
  );
};

export default LoaderModal;

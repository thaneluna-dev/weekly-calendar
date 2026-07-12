import { Modal, Box, TextareaAutosize, Button } from "@mui/material";
export const EditModal = ({currentEditTask, editopen, handleclose}) => {
  return (
    <Modal
      open={editopen}
      onClose={handleclose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          display: "grid",
        }}
      >
        <h2>Editing Task</h2>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Empty"
          style={{ width: "100%", marginTop: 10, height: 50 }}
          onChange={(e) => handleOnChange(e)}
          value={currentEditTask.title}
        />
        <Button
          variant="outlined"
          sx={{
            width: "auto",
            marginTop: 4,
            justifySelf: "right",
            textAlign: "right",
          }}
        >
          Update Task
        </Button>
      </Box>
    </Modal>
  );
};

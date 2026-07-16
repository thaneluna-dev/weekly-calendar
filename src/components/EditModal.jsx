import { Modal, Box, TextareaAutosize, Button } from "@mui/material";
import { useState, useEffect } from "react";

export const EditModal = ({ currentEditTask, editopen, handleclose, task_id }) => {
  const [taskName, setTaskName] = useState("");

  const handleUpdate = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/tasks/updatetasks/${currentEditTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: taskName
          }),
        },
      );

      if (!response.ok) {
        console.log(taskName);
        throw new Error("Failed to update task");
      }

      console.log("updated task");

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTaskName(currentEditTask?.title || "");
  }, [currentEditTask]);

  const handleOnChange = (event) => {
    setTaskName(event.target.value);
    // TODO - Save to backend
  };

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
          style={{ width: "100%", marginTop: 10, height: 50 }}
          value={taskName}
          onChange={handleOnChange}
        />

        <Button
          variant="outlined"
          sx={{
            width: "auto",
            marginTop: 4,
            justifySelf: "right",
            textAlign: "right",
          }}
          onClick={handleUpdate}
        >
          Update Task
        </Button>
      </Box>
    </Modal>
  );
};

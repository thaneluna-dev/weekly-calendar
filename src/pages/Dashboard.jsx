import Container from "@mui/material/Container";
import {
  Box,
  Button,
  Grid,
  Input,
  Modal,
  TextareaAutosize,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [currentDateIndex, setcurrentDateIndex] = useState();
  const [taskName, setTaskName] = useState();
  const [currentEventDate, setcurrentEventDate] = useState();
  const [currentDateDisplay, setcurrentDateDisplay] = useState();
  const [taskData, settaskData] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    try {
      const response = await fetch("http://localhost:8000/api/v1/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const tasks = await response.json();

      console.log(tasks);
      settaskData(tasks);
    } catch (error) {
      console.error(error);
    }
  }
  let currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  let days = {};

  for (let i = 0; i < 7; i++) {
    const date = new Date();

    if (i === 0 && date.getDay() === 0) {
      date.setDate(date.getDate());
    } else {
      date.setDate(date.getDate() - date.getDay() + i);
    }

    days[i] = {
      display: date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
      value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
    };
  }

  let events = {
    0: ["Event 1"],
    1: ["Event 2"],
    2: ["Event 3"],
    3: ["Event 4"],
    4: ["Event 5"],
    5: ["Event 6"],
    6: ["Event 7"],
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEventClick = (index) => {
    // Modal for handling events pop up
    setOpen(true);
    setcurrentDateIndex(index);
    setcurrentDateDisplay(days[index].display);
    setcurrentEventDate(days[index].value);
  };

  const handleAddTask = async () => {
    if (taskName == undefined || taskName == "") {
      console.log("no task name");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/tasks/createtasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: taskName,
            taskdate: currentEventDate, // e.g. "2026-07-11"
            dateindex: currentDateIndex, // e.g. 0
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const newTask = await response.json();
      console.log(newTask);

      setTaskName("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (event) => {
    // event.target.value
    setTaskName(event.target.value);
    //TODO - Needs to implement to save to backend in fastapi python
  };

  return (
    <Container maxWidth="xxl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "inline-flex",
            justifyContent: "space-evenly",
            width: "100%",
            gap: 2,
          }}
        >
          {Object.values(days).map((day, index) => (
            <Grid
              key={index}
              size="grow"
              sx={{
                height: "100%",
                backgroundColor: "lightgray",
                borderRadius: 1,
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  color: "black",
                  borderRadius: 1,
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                }}
              >
                <h2 style={{ paddingBottom: 10 }}>{day.display}</h2>
                <Button
                  onClick={() => handleEventClick(index)}
                  variant="contained"
                  color="primary"
                  sx={{ marginBottom: 3 }}
                >
                  Add Event
                </Button>
                {/* Add your event list or other content here */}
                <div className="events">
                  {taskData.filter((task) => task.dateindex === index).map((task) => 
                  (
                    <div key={task.id}>{task.title}</div>
                  ))}
                </div>
              </Box>
            </Grid>
          ))}
          <Modal
            open={open}
            onClose={handleClose}
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
              <h2>Adding to event {currentDateDisplay}</h2>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Empty"
                style={{ width: "100%", marginTop: 10, height: 50 }}
                onChange={(e) => handleOnChange(e)}
              />
              <Button
                variant="outlined"
                sx={{
                  width: "auto",
                  marginTop: 4,
                  justifySelf: "right",
                  textAlign: "right",
                }}
                onClick={handleAddTask}
              >
                Create Task
              </Button>
            </Box>
          </Modal>
        </Grid>
      </Box>
    </Container>
  );
}

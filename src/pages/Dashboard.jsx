import Container from "@mui/material/Container";
import { Box, Button, Grid, Input, Modal, TextareaAutosize } from "@mui/material";
import { useState } from "react";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [currentEventDate, setcurrentEventDate] = useState();

  let currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  let days = {};
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    if (i == 0 && date.getDay() === 0) {
      date.setDate(date.getDate() - 6);
    } else {
      date.setDate(date.getDate() - date.getDay() + i);
    }
    const options = { weekday: "long", month: "long", day: "numeric" };
    const weekdate = date.toLocaleDateString("en-US", options);
    days[i] = weekdate;
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
    setcurrentEventDate(index);
  };

  const handleOnChange = (event) => {
    // event.target.value
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
                <h2 style={{ paddingBottom: 10 }}>{day}</h2>
                <Button
                  onClick={() => handleEventClick(index)}
                  variant="contained"
                  color="primary"
                  sx={{ marginBottom: 3 }}
                >
                  Add Event
                </Button>
                {/* Add your event list or other content here */}
                <p className="events">
                  {events[index].map((event, eventIndex) => (
                    <div key={eventIndex}>{event}</div>
                  ))}
                </p>
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
              }}
            >
              <h2>Adding to event {days[currentEventDate]}</h2>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Empty"
                style={{ width: 200 }}
                onChange={(e) => handleOnChange(e) }
              />
            </Box>
          </Modal>
        </Grid>
      </Box>
    </Container>
  );
}

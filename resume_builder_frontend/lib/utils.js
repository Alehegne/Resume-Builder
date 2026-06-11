function sendLogEvent(action) {
  fetch("http://localhost:8000/api/logs/index.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(action),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Log event sent:", data);
    })
    .catch((error) => {
      console.error("Error sending log event:", error);
    });
}

export { sendLogEvent };

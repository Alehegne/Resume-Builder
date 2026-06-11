export async function exportToPDF(elementId, fileName = "resume.pdf") {
  try {
    console.log("EXPORT FUNCTION CALLED");
    // Dynamically import html2pdf
    const html2pdf = (await import("html2pdf.js")).default;

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Element not found");
    }

    const options = {
      margin: 10,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
      pagebreak: { mode: ["css", "legacy"] },
    };

    await html2pdf().set(options).from(element).save();
  } catch (error) {
    console.error("Error exporting to PDF:", error);
    throw error;
  }
}

// Render a resume object into a hidden offscreen container, export it, then cleanup.
export async function exportResumeToPDF(resume, fileName = "resume.pdf") {
  if (typeof window === "undefined") {
    throw new Error("exportResumeToPDF can only run in the browser");
  }

  // Dynamically import react rendering utilities and templates resolver
  const React = (await import("react")).default;
  const { createRoot } = await import("react-dom/client");
  const { getTemplate } = await import("@/lib/templates");

  const Template = getTemplate(resume.selectedTemplate);
  const containerId = `resume-pdf-${Date.now()}`;
  const container = document.createElement("div");
  container.id = containerId;
  // keep offscreen but allow rendering and styles to apply
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.width = "1200px";
  container.style.zIndex = "9999";
  document.body.appendChild(container);

  const root = createRoot(container);

  // Render the template into the container and wait a tick for layout/styles
  await new Promise((resolve) => {
    root.render(React.createElement(Template, { resume }));
    // give browser a short moment to layout fonts/images
    setTimeout(resolve, 300);
  });

  try {
    await exportToPDF(containerId, fileName);
  } finally {
    try {
      root.unmount();
    } catch (e) {
      // ignore
    }
    try {
      container.remove();
    } catch (e) {
      // ignore
    }
  }
}

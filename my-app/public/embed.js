// public/embed.js
(function () {
  const script = document.currentScript;
  const adminId = script.getAttribute("data-admin-id");
  const widgetSrc = `http://localhost:8080/widget/${adminId}`;

  const iframe = document.createElement("iframe");
  iframe.src = widgetSrc;
  iframe.style.border = "none";
  iframe.style.width = "300px"; // Adjust width as needed
  iframe.style.height = "400px"; // Adjust height as needed
  iframe.style.position = "fixed";
  iframe.style.bottom = "0";
  iframe.style.right = "0";
  iframe.style.zIndex = "9999";

  document.body.appendChild(iframe);
})();

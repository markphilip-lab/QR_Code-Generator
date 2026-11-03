const urlInput = document.getElementById("urlInput");
const generateBtn = document.getElementById("generateBtn");
const qrPlaceholder = document.getElementById("qrPlaceholder");
const qrResult = document.getElementById("qrResult");
const downloadBtn = document.getElementById("downloadBtn");

let qrCode = null;

function validateURL(url) {
    try {
        const parsedURL = new URL(url);

        return (
            parsedURL.protocol === "http:" ||
            parsedURL.protocol === "https:"
        );
    } catch (error) {
        return false;
    }
}

function generateQRCode() {
    const url = urlInput.value.trim();

    if (url === "") {
        alert("Please enter a website URL.");
        return;
    }

    if (!validateURL(url)) {
        alert("Please enter a valid URL starting with http:// or https://");
        return;
    }

    qrResult.innerHTML = "";

    qrCode = new QRCode(qrResult, {
        text: url,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    qrPlaceholder.style.display = "none";
    qrResult.style.display = "flex";
    downloadBtn.style.display = "block";
}

generateBtn.addEventListener("click", generateQRCode);

urlInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        generateQRCode();
    }
});
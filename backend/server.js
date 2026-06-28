const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Function to check password strength
function checkPasswordStrength(password) {
    const suggestions = [];
    let score = 0;

    if (password.length >= 8) score++;
    else suggestions.push("Make sure your password is at least 8 characters long.");

    if (/[A-Z]/.test(password)) score++;
    else suggestions.push("Add uppercase letters.");

    if (/[a-z]/.test(password)) score++;
    else suggestions.push("Add lowercase letters.");

    if (/\d/.test(password)) score++;
    else suggestions.push("Include numbers.");

    if (/[^A-Za-z0-9]/.test(password)) score++;
    else suggestions.push("Add special characters.");

    const isStrong = score >= 4; // Adjust threshold as needed
    return { isStrong, suggestions };
}

// Route to check password strength
app.post('/check-password', (req, res) => {
    const { password } = req.body;
    const result = checkPasswordStrength(password);
    res.json(result);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
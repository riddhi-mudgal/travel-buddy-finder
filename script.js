// Registration Form Validation
function validateRegistrationForm() {
    const name = document.querySelector("#registerForm input[type='text']").value;
    const email = document.querySelector("#registerForm input[type='email']").value;
    const password = document.querySelector("#registerForm input[type='password']").value;
    const interest = document.querySelector("#registerForm select").value;

    if (!name || !email || !password || !interest) {
        alert("Please fill in all fields to register.");
        return false;
    } else {
        alert("Registration successful!");
        // You could store user info in localStorage as an example
        localStorage.setItem("user", JSON.stringify({ name, email, interest }));
        return true;
    }
}

// Attach to form submission
document.querySelector("#registerForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    validateRegistrationForm();
});

// Save Itinerary Data
document.getElementById("add-place").addEventListener("click", addPlace);
document.getElementById("view-itinerary").addEventListener("click", showItinerary);

const places = [];

function addPlace() {
    const placeInput = document.getElementById("place-input");
    const placeName = placeInput.value.trim();

    if (placeName) {
        places.push(placeName);
        renderPlaces();
        placeInput.value = ""; // Clear the input
    }
}

function renderPlaces() {
    const placesList = document.getElementById("places-list");
    placesList.innerHTML = ""; // Clear current list

    places.forEach((place, index) => {
        const li = document.createElement("li");
        li.textContent = place;
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.style.marginLeft = "10px";
        removeButton.onclick = () => removePlace(index);

        li.appendChild(removeButton);
        placesList.appendChild(li);
    });
}

function removePlace(index) {
    places.splice(index, 1);
    renderPlaces();
}

function showItinerary() {
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    const itineraryView = document.getElementById("itinerary-view");

    if (startDate && endDate && places.length > 0) {
        itineraryView.style.display = "block";
        itineraryView.innerHTML = `
            <h3>Your Itinerary</h3>
            <p><strong>Start Date:</strong> ${startDate}</p>
            <p><strong>End Date:</strong> ${endDate}</p>
            <h4>Places to Visit:</h4>
            <ul>
                ${places.map(place => `<li>${place}</li>`).join('')}
            </ul>
        `;
    } else {
        alert("Please select dates and add at least one place to visit.");
    }
}

function goToMatch() {
    window.location.href = "match.html";
}


// Simulated Buddy Matching
function handleMatch(name, action) {
    alert(`${action}ed ${name}!`);
}
// Function to handle match/reject action and show the submit button
function handleMatch(name, action, cardId) {
    if (action === 'Match') {
        document.getElementById('submit-' + cardId).style.display = 'block'; // Show Submit button
    } else {
        document.getElementById('submit-' + cardId).style.display = 'none'; // Hide Submit button if rejected
    }
}

// Function to redirect to the chat page when submit button is clicked
function goToChatPage() {
    window.location.href = 'chat.html';
}


// Simple Group Chat Simulation
function sendMessage() {
    const messageInput = document.querySelector("#chatInput");
    const message = messageInput.value;
    if (!message) return;

    // Retrieve and update chat history from localStorage
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    const randomUser = ["You", "Alex", "Jamie", "Morgan"][Math.floor(Math.random() * 4)];
    chatHistory.push({ user: randomUser, message });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));

    // Update chat display
    displayChat();
    messageInput.value = "";
}

function displayChat() {
    const chatBox = document.querySelector("#chatBox");
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatBox.innerHTML = ""; // Clear chat box before re-displaying

    chatHistory.forEach(chat => {
        const messageElement = document.createElement("p");
        messageElement.innerText = `${chat.user}: ${chat.message}`;
        chatBox.appendChild(messageElement);
    });
}

// Attach event to send message button
document.querySelector("#chatInput")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});
document.querySelector("#chatBox") && displayChat();

// Payment Form Validation
function validatePaymentForm() {
    const cardNumber = document.querySelector("#paymentForm input[placeholder='Card Number']").value;
    const cardholderName = document.querySelector("#paymentForm input[placeholder='Cardholder Name']").value;
    const expiryDate = document.querySelector("#paymentForm input[placeholder='Expiry Date (MM/YY)']").value;
    const cvv = document.querySelector("#paymentForm input[placeholder='CVV']").value;

    if (!cardNumber || !cardholderName || !expiryDate || !cvv) {
        alert("Please fill in all payment details.");
        return false;
    } else if (cardNumber.length !== 16 || cvv.length !== 3) {
        alert("Invalid card details. Please check your card number and CVV.");
        return false;
    }

    alert("Payment successful!");
    return true;
}

// Attach to payment form submission
document.querySelector("#paymentForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    validatePaymentForm();
});

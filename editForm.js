// Function to show edit form
function showEditForm(userId, name, email) {
    const editForm = document.createElement('form');
    editForm.classList.add('edit-form');
    editForm.innerHTML = `
        <div class="edit-form-container">
            <h4>Edit User</h4>
            <label for="new_name">Name</label>
            <input type="text" id="new_name" name="new_name" value="${name}" required>
            <label for="new_email">Email</label>
            <input type="email" id="new_email" name="new_email" value="${email}" required>
            <div class="edit-form-buttons">
                <button type="button" onclick="updateUser(${userId})">Update</button>
                <button type="button" onclick="cancelEdit()">Cancel</button>
            </div>
        </div>
    `;
    
    // Append the edit form to the main content
    const mainContent = document.querySelector('.content');
    mainContent.appendChild(editForm);
}

// Function to update user data
function updateUser(userId) {
    const newName = document.getElementById('new_name').value;
    const newEmail = document.getElementById('new_email').value;

    fetch('crud.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `update=true&userid=${userId}&new_name=${newName}&new_email=${newEmail}`,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Display success message and reload the page
            alert(data.message);
            location.reload();
        } else {
            // Display error message
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Function to cancel editing and remove the edit form
function cancelEdit() {
    const editForm = document.querySelector('.edit-form');
    if (editForm) {
        editForm.remove();
    }
}
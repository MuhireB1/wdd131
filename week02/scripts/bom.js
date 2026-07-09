const input = document.querySelector('input');
const button = document.querySelector('button');
const list = document.querySelector('ul');

// Create a click event listener for the Add Chapter button
button.addEventListener("click", function () {

    // Only add if the input is not empty
    if (input.value.trim() !== '') {

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = input.value;

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';

        // Append the delete button to the list item
        li.append(deleteButton);

        // Append the list item to the unordered list
        list.append(li);

        // Add an event listener to remove the list item
        deleteButton.addEventListener('click', function () {
            list.removeChild(li);
            input.focus();
        });

        // Clear the input and return focus to it
        input.value = '';
        input.focus();
    }
});
function removeItem(button) {
    var confirmation = confirm("Are you sure you want to remove this item?");
    if (confirmation) {
        var inventoryFields = document.getElementById('inventoryFields');
        var inventoryItem = button.parentElement;
        inventoryFields.removeChild(inventoryItem);
    }
}

const collectForm = () => {
    const eventValue = document.getElementById('event').value;
    const inventoryArray = Array.from(document.querySelectorAll('.inventory-item')).map((item) => ({
        product: item.querySelector('[name="product[]"]').value,
        warehouse: item.querySelector('[name="warehouse[]"]').value,
        quantity: item.querySelector('[name="quantity[]"]').value,
    }));

    return JSON.stringify({
        event: eventValue,
        inventory: inventoryArray,
    });
};

document.getElementById('jsonForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const targetElement = document.getElementById('result');

    try {
        const dto = collectForm();
        const formAction = '/api/transaction';

        const response = await fetch(formAction, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: dto,
        });

        const payload = await response.json();
        const transactionId = payload.data.transaction.id;
        window.location.href = `/transaction/${transactionId}`;
    } catch (error) {
        targetElement.innerHTML = error;
    }
});

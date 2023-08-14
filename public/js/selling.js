function calculateSum() {
    var inputs = document.querySelectorAll(`input[name="quantity[]"]`);
    var sum = 0;
    inputs.forEach(input => {
        sum += parseInt(input.value) || 0;
    });
    return sum;
}

function updateMaxSell(selectElement) {
    var selectedIndex = selectElement.selectedIndex;
    var selectedOption = selectElement.options[selectedIndex];
    var stock = selectedOption.getAttribute('data-stock');

    var productionQuantityInput = document.getElementById("product-quantity");
    productionQuantityInput.setAttribute("max", stock);
}

function updateMax(selectElement) {
    var selectedIndex = selectElement.selectedIndex;
    var selectedOption = selectElement.options[selectedIndex];
    var stock = selectedOption.getAttribute('data-stock');

    var productionQuantityInput = document.getElementById("product-quantity");
    var productionQuantity = parseInt(productionQuantityInput.value, 10);

    var maxFromNeeds = productionQuantity;
    var maxFromStock = stock;

    var max = Math.min(maxFromNeeds, maxFromStock);

    selectElement.nextElementSibling.setAttribute("max", max);
}

function validateQInput(input) {
    var min = parseInt(input.min);
    var max = parseInt(input.max);
    var value = parseInt(input.value);

    if (isNaN(value) || value < min) {
        input.value = min;
    } else if (value > max) {
        input.value = max;
    } else if (value === 0) {
        input.value = min;
    }
}

function validateQuantity() {
    var productQuantity = document.getElementById('product-quantity').value;
    var needsInt = parseInt(productQuantity, 10);
    var sum = calculateSum();
    var errorMessage = document.getElementById(`ErrorMessage`);

    if (sum !== needsInt) {
        errorMessage.textContent = `Sum of quantities must be equal to ${needsInt}. Current sum: ${sum}`;
        return false;
    } else {
        errorMessage.textContent = '';
        return true;
    }
}

function removeSplit(button) {
    var confirmation = confirm("Are you sure you want to remove this item?");
    if (confirmation) {
        var inventoryItem = button.parentElement;
        inventoryItem.parentElement.removeChild(inventoryItem);
    }
}

const collectForm = () => {
    const eventValue = document.getElementById('event').value;
    const inventoryArray = Array.from(document.querySelectorAll('.inventory-item')).map((item) => ({
        product: item.querySelector('[name="product[]"]').value,
        warehouse: item.querySelector('[name="warehouse[]"]').value,
        quantity: Number(item.querySelector('[name="quantity[]"]').value),
    }));

    for (let i = 0; i < inventoryArray.length; i++) {
        if (inventoryArray[i].quantity > 0) {
            inventoryArray[i].quantity = -inventoryArray[i].quantity;
        }
    }

    return JSON.stringify({
        event: eventValue,
        inventory: inventoryArray,
    });
};

document.getElementById('jsonForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validateQuantity()) {
        alert('Some quantity are incorrect. Please check the quantities.');
        return;
    }
    const targetElement = document.getElementById('result');
    targetElement.setAttribute("aria-busy", "true");

    try {
        const dto = collectForm();
        const formAction = event.target.action;

        const response = await fetch(formAction, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: dto,
        });

        if (response.ok) {
            const payload = await response.json();
            const transactionId = payload.data.transaction.id;
            window.location.href = `/transaction/${transactionId}`;
        } else {
            const errorHTML = await response.text();
            targetElement.innerHTML = errorHTML;
        }
    } catch (error) {
        targetElement.innerHTML = error;
    }
    targetElement.setAttribute("aria-busy", "false");
});

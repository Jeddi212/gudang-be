function calculateSum(materialName) {
    var inputs = document.querySelectorAll(`input[name="quantity[]"][data-material="${materialName}"]`);
    var sum = 0;
    inputs.forEach(input => {
        sum += parseInt(input.value) || 0;
    });
    return sum;
}

function updateNeedsUI() {
    var quantityInput = document.getElementById("product-quantity");
    var productQuantity = parseInt(quantityInput.value, 10);

    var needsElements = document.querySelectorAll('.needs');
    needsElements.forEach(needsElement => {
        var materialQuantity = parseInt(needsElement.dataset.quantity, 10);
        needsElement.textContent = `Needs: ${materialQuantity * productQuantity}`;
    });
}

function updateMax(selectElement, needsInt) {
    var selectedIndex = selectElement.selectedIndex;
    var selectedOption = selectElement.options[selectedIndex];
    var stock = selectedOption.getAttribute('data-stock');

    var productionQuantityInput = document.getElementById("product-quantity");
    var productionQuantity = parseInt(productionQuantityInput.value, 10);

    var maxFromNeeds = needsInt * productionQuantity;
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

function validateQuantity(materialName, needs) {
    var productQuantity = document.getElementById('product-quantity').value;
    var needsInt = parseInt(needs, 10) * parseInt(productQuantity, 10);
    var sum = calculateSum(materialName, needsInt);
    var errorMessage = document.getElementById(`${materialName}ErrorMessage`);

    if (sum !== needsInt) {
        errorMessage.textContent = `Sum of quantities must be equal to ${needsInt}. Current sum: ${sum}`;
    } else {
        errorMessage.textContent = '';
    }
}

function validateQuantityAll() {
    var productQuantity = document.getElementById('product-quantity').value;
    var qtyInputs = document.querySelectorAll('.qty');

    qtyInputs.forEach(input => {
        var materialName = input.getAttribute('data-material');
        var needsInt = parseInt(input.getAttribute('data-quantity'), 10) * parseInt(productQuantity, 10);
        var sum = calculateSum(materialName, needsInt);
        var errorMessage = document.getElementById(`${materialName}ErrorMessage`);

        if (sum !== needsInt) {
            errorMessage.textContent = `Sum of quantities must be equal to ${needsInt}. Current sum: ${sum}`;
        } else {
            errorMessage.textContent = '';
        }
    });
}

function validateSubmit() {
    var productQuantity = document.getElementById('product-quantity').value;
    var qtyInputs = document.querySelectorAll('.qty');

    for (var i = 0; i < qtyInputs.length; i++) {
        var input = qtyInputs[i];
        var materialName = input.getAttribute('data-material');
        var needsInt = parseInt(input.getAttribute('data-quantity'), 10) * parseInt(productQuantity, 10);
        var sum = calculateSum(materialName, needsInt);
        var errorMessage = document.getElementById(`${materialName}ErrorMessage`);

        if (sum !== needsInt) {
            errorMessage.textContent = `Sum of quantities must be equal to ${needsInt}. Current sum: ${sum}`;
            return false;
        } else {
            errorMessage.textContent = '';
        }
    }

    return true;
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

    for (let i = 1; i < inventoryArray.length; i++) {
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

    if (!validateSubmit()) {
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

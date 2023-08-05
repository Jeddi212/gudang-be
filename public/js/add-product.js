function removeItem(button) {
    var confirmation = confirm("Are you sure you want to remove this item?");
    if (confirmation) {
        var materialFields = document.getElementById('materialFields');
        var materialItem = button.parentElement;
        materialFields.removeChild(materialItem);
    }
}

const collectForm = () => {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value || 'No description';
    const materials = Array.from(document.querySelectorAll('.material-item')).map((item) => ({
        name: item.querySelector('[name="materialName[]"]').value,
        quantity: item.querySelector('[name="quantity[]"]').value,
    }));

    return JSON.stringify({
        name,
        description,
        materials,
    });
};

document.getElementById('createProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const targetElement = document.getElementById('result');

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

        const payload = await response.json();
        const productName = payload.data.name;
        window.location.href = `/product/${productName}`;
    } catch (error) {
        targetElement.innerHTML = error;
    }
});
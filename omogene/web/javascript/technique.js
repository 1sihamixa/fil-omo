document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addButton');
    const extraInputs = document.getElementById('extraInputs');
    let inputCount = 1;
  
    addButton.addEventListener('click', function() {
      const inputGroup = document.createElement('div');
      inputGroup.classList.add('form-group');
      const newColorInput = document.createElement('input');
      newColorInput.type = 'color';
      newColorInput.name = 'clothingColor[]';
      inputGroup.appendChild(newColorInput);
      const newTypeSelect = document.createElement('select');
      newTypeSelect.name = 'clothingType[]';
      const clothingTypes = ['Shirt', 'Pants', 'Dress'];
      clothingTypes.forEach(function(type) {
        const option = document.createElement('option');
        option.value = type.toLowerCase();
        option.textContent = type;
        newTypeSelect.appendChild(option);
      });
      inputGroup.appendChild(newTypeSelect);
      extraInputs.appendChild(inputGroup);
      inputCount++;
    });
  });
  
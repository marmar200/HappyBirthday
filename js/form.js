document.getElementById('surpriseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Собираем данные
    const formData = {
      name: this.fullname.value,
      willGo: this.querySelector('[name="attendance"]:checked')?.value || '',
      alchogol: Array.from(this.querySelectorAll('[name="alcohol"]:checked')).map(el => el.value)
    };
  
    // Отправка в Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbydWI8fEOZu0BC_U7-xAPYEfOufeApIrbvcNBEV6PtYI82q37w_vejvVlNzJb-pdxe3/exec', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    .then(response => alert('Данные успешно отправлены!'))
    .catch(error => alert('Ошибка: ' + error));
});
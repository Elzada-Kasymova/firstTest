// Получаем элементы модального окна
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalButton");
var span = document.getElementsByClassName("close")[0];

// Открытие модального окна при нажатии на кнопку
btn.onclick = function () {
    modal.style.display = "block";
}

// Закрытие модального окна при нажатии на крестик
span.onclick = function () {
    modal.style.display = "none";
}

// Закрытие модального окна при клике вне его
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Функция для отправки формы в Pipedrive
async function submitForm() {
    // Получаем данные из формы
    const data = {
        title: document.getElementById('jobType').value + " - " + document.getElementById('firstName').value,
        person_name: document.getElementById('firstName').value + " " + document.getElementById('lastName').value,
        phone: [document.getElementById('phone').value],
        email: [document.getElementById('email').value],
        address: document.getElementById('address').value,
        custom_fields: {
            job_source: document.getElementById('jobSource').value,
            description: document.getElementById('description').value
        }
    };

    // Отправляем запрос в Pipedrive через API
    try {
        const response = await fetch('https://api.pipedrive.com/v1/deals?api_token=4a15eacffb0b6b16f5efeb413c7e8c63f01a1a12', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Данные успешно сохранены! ID сделки: ' + result.data.id);
            modal.style.display = "none";  // Закрытие модального окна
        } else {
            alert('Ошибка при сохранении данных: ' + result.error);
        }
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
}

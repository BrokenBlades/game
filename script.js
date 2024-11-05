let hp = 100;
let coins = 0;

const events = {
    'Комната 1': 'Ты в Комнате 1. Здесь тихо и спокойно.',
    'Комната 2': 'Ты в Комнате 2. О, ты нашел монету!',
    'Комната 3': 'Ты в Комнате 3. Ты видишь странную бумажку, но ничего особенного.',
    'Столовая': 'Ты в Столовой. Ты можешь выбрать блюдо для восстановления HP.',
    'Коридор': 'Ты идешь по коридору. Никого не видно, путь свободен.'
};

const roomImages = {
    'Комната 1': 'img/room1.jpg',
    'Комната 2': 'img/room2.jpg',
    'Комната 3': 'img/room3.jpg',
    'Столовая': 'img/bufet.jpg',
    'Университет': 'img/udsu.jpg' 
};

document.querySelectorAll('.room-button').forEach(button => {
    button.addEventListener('click', function() {
        const roomName = this.getAttribute('data-room');
        if (roomName) {
            renderRoom(roomName);
        }
    });
});

function renderRoom(room) {
    const roomDisplay = document.getElementById('roomDisplay');
    roomDisplay.textContent = `Вы находитесь в ${room}`;

    const roomImage = document.getElementById('roomImage');
    if (roomImages[room]) {
        roomImage.src = roomImages[room];
        roomImage.style.display = 'block';
    } else {
        roomImage.style.display = 'none';
    }

    if (room === 'Университет') {
        roomImage.src = roomImages['Университет'];
        updateDisplay('Ты успешно добрался до университета!');
        document.querySelectorAll('.room-button').forEach(button => {
            button.style.display = 'none'; 
        });
    } else {
        updateDisplay(events[room] || 'Ничего не происходит.');
        if (room === 'Комната 2' && Math.random() > 0.5) {
            coins += 5;
            updateDisplay(`Ты нашел монету! Теперь у тебя ${coins} монет.`);
        }
    }

    updateCounters();
}

function goToCafeteria() {
    renderRoom('Столовая');
    document.getElementById('cafeteriaMenu').style.display = 'block'; 
}

function buyItem(item) {
    const menuItems = {
        'котлетки с пюрешкой': { price: 10, hpRestore: 25 },
        'рамэн': { price: 20, hpRestore: 50 },
        'сосиска в тесте': { price: 5, hpRestore: 15 }
    };

    const selectedItem = menuItems[item];

    if (coins >= selectedItem.price) {
        coins -= selectedItem.price;
        hp = Math.min(hp + selectedItem.hpRestore, 100); 
        updateDisplay(`Ты купил ${item} и восстановил ${selectedItem.hpRestore} HP.`);
    } else {
        showModal('У тебя недостаточно монет для покупки этого предмета.');
    }

    updateCounters();
}

function fallOutWindow() {
    endGame();
}

function goToToilet() {
    endGame();
}

function goToUniversity() {
    renderRoom('Университет');
}

function endGame() {
    document.querySelectorAll('.room-button').forEach(button => {
        button.style.display = 'none'; 
    });

    if (hp <= 0) {
        document.getElementById('deathScreen').style.display = 'block'; 
    }
}

function showModal(message) {
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function updateCounters() {
    document.getElementById('hpCounter').textContent = hp;
    document.getElementById('coinCounter').textContent = coins;

    if (hp <= 0) {
        endGame();
    }
}

function updateDisplay(message) {
    document.getElementById('eventDisplay').textContent = message;
}

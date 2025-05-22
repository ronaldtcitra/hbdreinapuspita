// Variabel untuk menyimpan nama yang berulang tahun
let birthdayPerson = "Reina Puspita";

// Fungsi untuk animasi teks ketik
function typeWriter(text, element, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Fungsi untuk memperbarui teks ucapan
function updateGreeting() {
    const greetingText = document.getElementById('greetingText');
    const messages = [
        `Happy Birthday, ${birthdayPerson}! 🎉`,
    ];
    
    let currentIndex = 0;
    
    function showNextMessage() {
        typeWriter(messages[currentIndex], greetingText);
        currentIndex = (currentIndex + 1) % messages.length;
    }
    
    showNextMessage();
}

// Fungsi untuk animasi konfeti
function setupConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
    
    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 10 + 5;
            this.weight = Math.random() * 1 + 1;
            this.directionX = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.shape = Math.random() > 0.5 ? 'circle' : 'rect';
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
        }
        
        update() {
            this.y += this.weight;
            this.x += this.directionX;
            this.rotation += this.rotationSpeed;
            
            if (this.y > canvas.height) {
                this.y = -20;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            
            if (this.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            }
            
            ctx.restore();
        }
    }
    
    function createConfetti(amount) {
        for (let i = 0; i < amount; i++) {
            confettiPieces.push(new ConfettiPiece());
        }
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach(piece => {
            piece.update();
            piece.draw();
        });
        
        requestAnimationFrame(animateConfetti);
    }
    
    // Buat konfeti awal
    createConfetti(100);
    animateConfetti();
    
    // Tambahkan konfeti saat lilin ditiup
    document.querySelector('.cake-container').addEventListener('click', () => {
        createConfetti(50);
    });
    
    // Perbarui ukuran canvas saat jendela diubah ukurannya
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Fungsi untuk menangani lilin yang ditiup
function setupCandle() {
    const flame = document.getElementById('flame');
    const cakeContainer = document.querySelector('.cake-container');
    
    cakeContainer.addEventListener('click', () => {
        // Sembunyikan api
        flame.style.display = 'none';
        
        // Tampilkan pesan
        alert(`Happy Birthday, ${birthdayPerson}! Love u <3`);
    });
}

// Fungsi untuk menangani musik latar
function setupMusic() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.textContent = '🎵 Putar Musik';
        } else {
            bgMusic.play().catch(error => {
                console.log('Autoplay prevented:', error);
                alert('Silakan klik tombol musik lagi untuk memutar musik');
            });
            musicToggle.textContent = '🔇 Hentikan Musik';
        }
        
        isPlaying = !isPlaying;
    });
}

// Fungsi untuk memperbarui nama
function setupNameUpdate() {
    const updateButton = document.getElementById('updateName');
    const nameInput = document.getElementById('nameInput');
    
    updateButton.addEventListener('click', () => {
        const newName = nameInput.value.trim();
        if (newName) {
            birthdayPerson = newName;
            updateGreeting();
            nameInput.value = '';
        }
    });
    
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            updateButton.click();
        }
    });
}

// Inisialisasi semua fungsi saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
    updateGreeting();
    setupConfetti();
    setupCandle();
    setupMusic();
    setupNameUpdate();
});

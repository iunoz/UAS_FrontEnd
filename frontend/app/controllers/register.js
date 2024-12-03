document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Mencegah reload halaman

        // Ambil nilai input
        const nickname = document.getElementById('nickname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validasi password
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Kirim data ke backend
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify({ nickname, email, password })
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message); // Pesan sukses dari backend
                // Redirect ke halaman login
                window.location.href = 'login.html';
            } else {
                alert(result.message || 'Failed to register.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again later.');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Mencegah reload halaman

        // Ambil nilai dari input form
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Kirim data ke backend
        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message); // Pesan sukses dari backend
                // Redirect ke halaman dashboard atau lainnya
                window.location.href = '/frontend/views/home.html'; // Contoh redirect ke home
            } else {
                alert(result.message || 'Failed to login.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again later.');
        }
    });
});

angular.module('reShoesApp')
    .controller('RegisterController', function ($scope, $http) {
        $scope.register = () => {
            const nickname = $scope.nickname;
            const email = $scope.email;
            const password = $scope.password;
            const confirmPassword = $scope.confirmPassword;

            // Validasi input di frontend
            if (!nickname || !email || !password || !confirmPassword) {
                alert('All fields are required!');
                return;
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                alert('Invalid email format!');
                return;
            }

            if (password.length < 6) {
                alert('Password must be at least 6 characters!');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Kirim data ke backend
            const userData = { nickname, email, password };
            console.log('Sending data to backend:', userData);

            $http.post('http://localhost:3000/api/users/register', userData)
                .then(response => {
                    alert(response.data.message);
                    // Redirect ke halaman login setelah sukses
                    window.location.href = '#/login';
                })
                .catch(err => {
                    console.error('Registration error:', err);
                    alert(err.data?.message || 'An error occurred. Please try again.');
                });
        };
    });

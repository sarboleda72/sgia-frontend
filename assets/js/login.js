$('#formLogin').on('submit', function (event) {
    event.preventDefault();

    const formData = {
        documentNumber: $('input[name="documentNumber"]').val(),
        password: $('input[name="password"]').val(),
    }

    $.post('http://localhost:4000/auth/login',
        formData,
        function (data) {
            // Limpiar formulario de registro

            if (data.result.user.length > 0) {
                // SweetAlert2
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: data.result.message
                });

                window.location.href = 'dashboard.html';
            } else {
                // SweetAlert2
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: "usuario y contraseña incorrectos"
                });
            }

            



        }
    )

});
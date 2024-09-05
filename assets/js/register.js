$('#formRegister').on('submit', function(event) {
    event.preventDefault();

    const formData={
        fullName: $('input[name="fullName"]').val(),
        documentType:$('select[name="documentType"]').val(),  
        documentNumber:$('input[name="documentNumber"]').val(),
        password:$('input[name="password"]').val(),
        fileId:$('input[name="fileId"]').val(),
        role:$('input[name="role"]').val(),
        status:$('input[name="status"]').val()
    }

    $.post('http://localhost:4000/auth/createUser', 
        formData,
        function(data) {
            // Limpiar formulario de registro
            $('#formRegister')[0].reset();
            
            // Tiempo de espera para redireccionar a login.html
            setTimeout(function(){
                window.location.href = 'http://localhost:5500/login.html';
            }, 5000);

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
        }
    )
    
});
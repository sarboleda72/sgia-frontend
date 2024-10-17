// metodo que lista todos los usuarios
$(document).ready(function () {

  $.get('http://localhost:4000/auth/viewUsers', function (data) {

    if (data.result.length > 0) {

      const users = data.result;
      let content = '';

      users.forEach(user => {

        content += `
        <div class="card">
          <div class="card-content">
            <h3>Nombre completo: `+ user.fullName + `</h3>
            <p>Tipo de documento: `+ user.documentType + `</p>
            <p>Documento: `+ user.documentNumber + `</p>
            <p>Ficha ID: `+ user.fileId + `</p>
            <p>Rol: `+ user.role + `</p>
            <p>Estado: `+ user.status + `</p>
            <p>id: `+ user.id + `</p>
          </div>
          <div class="card-actions">
            <button class="edit-btn">Editar</button>
            <button class="delete-btn" data-id="`+ user.id + `">Eliminar</button>
          </div>
        </div>`;

      });

      // Insertar los usuarios en el contenedor

      $('#main-content .content').append(content);
      $('body').append('<script src="/assets/js/script.js"></script>');

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
        title: "Usuarios consultados correctamente"
      });
    }
  })

});

// el metodo que envía la informacion para la edicion
$('#formEdit').on('submit', function (event) {
  event.preventDefault();

  const formData = {
    id: $('input[name="id"]').val(),
    fullName: $('#editFullName').val(),
    documentType: $('#editDocumentType').val(),
    documentNumber: $('#editDocumentNumber').val(),
    password: $('#editPassword').val(),
    fileId: $('#editFileId').val(),
    role: $('input[name="role"]').val(),
    status: $('input[name="status"]').val()
  }

  $.ajax({
    url: 'http://localhost:4000/auth/updateUser',
    type: 'PUT',
    data: formData,
    success: function (data) {
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

      // Tiempo de espera para redireccionar a login.html
      setTimeout(function () {
        window.location.href = 'http://localhost:5500/users.html';
      }, 2000);
    }
  })
});

// metodo para eliminar usuarios
$(document).on('click', '.delete-btn', function (event) {
  event.preventDefault();

  const userId = {
    id: $(this).data('id')
  };

  Swal.fire({
    title: "Realmente quiere eliminarlo?",
    text: "Este proceso es irrevercible!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminalo!"
  }).then((result) => {

    $.ajax({
      url: 'http://localhost:4000/auth/deleteUser',
      type: 'DELETE',
      data: userId,
      success: function (data) {

        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: data.result.message,
            icon: "success"
          });
        }

        // Tiempo de espera para redireccionar a login.html
        setTimeout(function () {
          window.location.href = 'http://localhost:5500/users.html';
        }, 2000);
      }
    })
  });
});

// Metodo crear usuario
$('#formCreate').on('submit', function (event) {
  event.preventDefault();

  const formData = {
    fullName: $('input[name="fullName"]').val(),
    documentType: $('select[name="documentType"]').val(),
    documentNumber: $('input[name="documentNumber"]').val(),
    password: $('input[name="password"]').val(),
    fileId: $('input[name="fileId"]').val(),
    role: $('select[name="role"]').val(),
    status: $('input[name="status"]').val()
  }

  $.post('http://localhost:4000/auth/createUser',
    formData,
    function (data) {

      // Tiempo de espera para redireccionar a users.html
      setTimeout(function () {
        window.location.href = 'http://localhost:5500/users.html';
      }, 2000);

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

function checkAuth() { 
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [name, value]= cookie.split('=').map(c=> c.trim());
    acc[name]= value;
    return acc;
  },{})

  if(cookies.isLoggedIn != 'true'){
    window.location.href = '/login.html';
  }
 }

 checkAuth();
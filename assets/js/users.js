$(document).ready(function () {

  $.get('http://localhost:4000/auth/viewUsers', function (data) {

    //console.log(data);

    if (data.result.length > 0) {

      const users = data.result;
      let content = '';

      users.forEach(user => {
        
        content += `
        <div class="card">
          <div class="card-content">
            <h3>Nombre completo: `+user.fullName+`</h3>
            <p>Tipo de documento: `+user.documentType+`</p>
            <p>Documento: `+user.documentNumber+`</p>
            <p>Ficha ID: `+user.fileId+`</p>
            <p>Rol: `+user.role+`</p>
            <p>Estado: `+user.status+`</p>
          </div>
          <div class="card-actions">
            <button class="edit-btn">Editar</button>
            <button class="delete-btn" data-id="`+user.id+`">Eliminar</button>
          </div>
        </div>`;
        
      });

      // Insertar los usuarios en el contenedor
      $('#main-content .content').append(content);


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
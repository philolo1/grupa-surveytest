import Swal from 'sweetalert2';

const errorAlert = err => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: `${err}`
  });
};

export default errorAlert;

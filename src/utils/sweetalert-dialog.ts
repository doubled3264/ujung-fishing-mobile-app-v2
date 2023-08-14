import Swal, { SweetAlertResult } from 'sweetalert2'

const normalButton = {
  cancelButton: 'btn btn--md btn__link--secondary',
  confirmButton: 'btn btn--md btn--verdigris',
}

/**
 * Fire confirm dialog
 * @param text - confirm dialog text
 * @param confirmButtonText
 * @returns sweetalert result as promise
 */
export const confirm = (
  text: string,
  confirmButtonText: string
): Promise<SweetAlertResult> => {
  return Swal.fire({
    title: 'Anda yakin ?',
    text: text,
    icon: 'question',
    showCancelButton: true,
    cancelButtonText: 'Batal',
    confirmButtonText: confirmButtonText,
    customClass: normalButton,
    buttonsStyling: false,
    heightAuto: false,
  })
}
/**
 * Fire error dialog
 * @param text - error dialog text
 * @returns sweetalert
 */
export const error = (text: string) => {
  return Swal.fire({
    icon: 'warning',
    text: text,
    showConfirmButton: true,
    customClass: normalButton,
    heightAuto: false,
  })
}
/**
 * Fire success dialog
 * @param text - success dialog text
 * @returns sweetalert
 */
export const success = (text: string) => {
  return Swal.fire({
    icon: 'success',
    text: text,
    showConfirmButton: false,
    timer: 1500,
    heightAuto: false,
  })
}

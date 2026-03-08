import { AbstractControl, ValidationErrors } from '@angular/forms';

/*
  Validador para confirmar que dos contraseñas coincidan.
  Se aplica a nivel formulario, ya que depende de la comparación
  entre más de un control.
*/
export function contraseniasIguales(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const passwordRepeat = control.get('passwordRepeat')?.value;

  /*
    Si alguno de los campos aún no tiene valor,
    no se fuerza el error para evitar feedback prematuro.
  */
  if (!password || !passwordRepeat) {
    return null;
  }

  /*
    Devuelve un error personalizado cuando las contraseñas no coinciden.
    Este error es utilizado por el formulario para mostrar feedback visual.
  */
  return password === passwordRepeat ? null : { contraseniasNoCoinciden: true };
}

import Link from "next/link"

const page = () => {
  return (
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/fondos/fondos7.jfif')] w-full max-w-7xl">
      <div className="flex justify-center items-center h-screen">
        <div className="border border-white ">
          <div className="flex flex-col">
            <div className="flex p-2">
              <h5>
                Gracias por volver! Inicia sesion para realizar tu proxima
                compra
              </h5>
            </div>

            <div className="flex">
              <h5 className="card-title">Iniciar sesion</h5>
            </div>
            {/*        <form [formGroup]="form" (ngSubmit)="login()">
          <div className="mb-2">
            <label>Email</label>
            <input
              className="form-control"
              formControlName="email"
              name="email"
              type="email"
              placeholder="Escribe tu email"
            />
            <span
              *ngIf="
                form.get('email')?.hasError('required') &&
                form.get('email')?.touched
              "
            >
              El campo email es <strong>requerido</strong>
            </span>
            <span
              *ngIf="
                form.get('email')?.hasError('email') &&
                form.get('email')?.touched
              "
            >
              Por favor, introduce un email válido.
            </span>
          </div>
          <div className="mb-2">
            <label>Contraseña</label>
            <div className="input-group">
              <input
                className="form-control"
                formControlName="password"
                name="password"
                type="{{ mostrarContrasena ? 'text' : 'password' }}"
                placeholder="************"
              />
              <div className="input-group-text">
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  (change)="toggleMostrarContrasena()"
                  value=""
                  aria-label="Checkbox for following text input"
                />
              </div>
            </div>
        
            <span
              *ngIf="
                form.get('password')?.hasError('required') &&
                form.get('password')?.touched
              "
            >
              El campo es <strong>requerido</strong>
            </span>
          </div>

          <div className="row mt-3" style="background-color: var(--color2)">
            <button
              [disabled]="form.invalid"
              className="submit text-white btn"
              type="submit"
            >
              login
            </button>
          </div>
        </form> */}
          </div>
          <h5>
            <Link href="recuperarcontraseña">Recuperar contraseña</Link>
          </h5>
          <h5 className="text-center">
            Si no tiene una cuenta puede crearse una desde
            <a href="register">aqui</a>
          </h5>
          <h5 className="text-center">
            Si tiene problemas con su código ingrese
            <a href="crear-codigo">aqui</a>
          </h5>
        </div>
      </div>
    </div>
  )
}
export default page

# ProyectoProductosWeb

- Proyecto Web
- Implementa un CRUD para productos
- Contiene Login para validar credenciales

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Estructura src/app
1. components : Componentes comunes
2. core : Contiene el interceptor para asignar el header Authorization en el consumo de las API
3. models : Modelos e interfaces
4. pages: Componentes de cada módulo, del login y el dashboard
5. services: Consumo de API's

## Configuración del Proyecto
1. En el archivo environment.ts se especifica la url para consumo del API REST
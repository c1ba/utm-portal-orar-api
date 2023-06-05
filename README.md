<p align="center">
  <a href="https://www.utm.ro/en/" target="blank"><img src="https://www.utm.ro/wp-content/uploads/2021/03/logo-UTM.png" width="200" alt="UTM Logo" /></a>
</p>

[circleci-image]: https://www.utm.ro/wp-content/uploads/2021/03/logo-UTM.png
[circleci-url]: https://www.utm.ro/en/

</p>

## Description

Aplicație practică pentru examenul de licență cu subiectul "Implementarea Tehnologiilor Web în Realizarea Aplicațiilor Dinamice". Tema aplicației practice este un portal pentru vizionarea și accesarea orarului, respectiv comunicarea prezențelor între studenți și profesori.

<p>Aceasta este partea de server, pentru partea de interfață puteți accesa acest <a href="https://github.com/c1ba/utm-portal-orar-fe">link</a>.</p>

## Installation

<p>Pentru ca aplicația să poată fi rulată, este necesară instalarea yarn și a Nest CLI-ului. Teoretic acestea ar trebui să fie deja instalate în proiect.</p>

  - <p>Linkul către instalarea yarn e regăsit  <a href="https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable">aici</a>.</p>
  - <p>Linkul către instalarea Nest CLI e regăsit  <a href="https://docs.nestjs.com/cli/overview">aici</a>.</p>


```bash
$ yarn install
```

## Running the app

1. Trebuie creat o filă .env ce conține următoarele variabile

  - NODE_ENV
  - DATABASE_URL
  - SALT_ROUNDS
  - JWT_SECRET (să fie aceeași cu cea de pe front-end pentru decriptarea tokenului)
  - JWT_EXPIRATION



```bash
# Pentru construirea aplicației
$ yarn build

# Pentru a rula aplicația construită
$ yarn start

# Pentru rularea aplicației în modul watch (acesta nu necesita construirea aplicației înainte de rulare)
$ yarn start:dev

```

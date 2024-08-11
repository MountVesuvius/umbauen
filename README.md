<div align="center">
  <h1 align="center">Umbauen</h1>
  <h3 align="center">Remapping classes to new plain object easily</h3>
</div>

Umbauen is a simple addition to class transformers/validators that allows you to create brand new plain objects without building awkward mappings around existing classes.

## Basic Example
```ts
import 'reflect-metadata'; // This is necessary
import { IsEmail, IsString } from "class-validator";
import { instanceToRemappedPlain, RemappedFieldKeys } from 'umbauen';

class User {
    @IsString()
    @RemappedFieldKeys('displayName', 'gameTag') // You can add as many additional keys as you'd like
    username!: string; 

    @IsEmail()
    @RemappedFieldKeys('mainContact')
    email!: string;

    @IsString()
    address!: string;
}

const exampleUser = new User();
exampleUser.username = "EGH";
exampleUser.email = "egh@mail.com";
exampleUser.address = 'Sentiero del Gran Cono, 80056 Ercolano NA, Italy';

const plain = instanceToRemappedPlain(exampleUser);
console.log(plain);
```

<strong>Output:</strong>
```
{
  displayName: 'EGH',
  gameTag: 'EGH',
  mainContact: 'egh@mail.com',
  address: 'Sentiero del Gran Cono, 80056 Ercolano NA, Italy'
}
```

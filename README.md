### Overview

TypeScript is a tool to help you write type-safe JavaScript. JavaScript is a weakly typed language which means that types are assigned implicitly as they are used at runtime. While this can be considered a feature, it can be dangerous if your code needs to be treating types precisely at all times. Enforcing type safety ensures that all usage of the properties, functions and classes are consistent within your application and as a result makes your application more robust.

### Compile The TypeScript File Into JavaScript}

Open the VSCode integrated terminal using the keys `Ctrl+Shift+`, or using the top menu `Terminal --> New Terminal`.
In the project root folder type.

`tsc ./src/test.ts --outDir ./dist`

### Adding tsconfig.json

Normally, it is best practice to create a tsconfig.json file in the base of your TypeScript source folder in your project.

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "../dist",
    "rootDir": "./",
    "moduleResolution": "node"
  },
  "include": ["**/*.ts"]
}
```

Now you can compile your test.ts into javascript by calling tsc and indicating the `tsconfig` location which is the `./src` folder.

- `"strict":true` : The strict flag enables a wide range of type checking behavior that results in stronger guarantees of program correctness. I mainly use it to ensure that all class properties are either assigned when first declared, or in the constructor.

- `"target": "ES2015"` : ES stands for ECMAScript which is a documented JavaScript standard. TSC will produce JavaScript that matches the selected standard. Options are ES3, ES5, ES2015, ES2016, ES2017, ES2018, ES2019, ES2020 and ESNEXT. Each ES version introduces new core JavaScript functionality. I have chosen ES2015 since TSC won't compile earlier versions if the source TypeScript contains private identifiers. Visit https://en.wikipedia.org/wiki/ECMAScript for more information about the ES version differences.

- `"module": "CommonJS"` : In many of the code examples in the course, I am using ES6 import/export syntax. The `CommonJS` module setting will produce output that relies on the popular `RequireJS` module loader that Node.js supports by default. This means that any JavaScript produced from TSC will work in Node.js in case your source TypeScript code contains any ES6 import commands.

- `"outDir": "../dist"` : This is the folder where the compiled JavaScript will be placed. Note that it has 2 dots indicating to go back/down one folder, and then up into the dist folder. This is relative to the rootDir parameter discussed in the next line.

- `"rootDir": "./" `: This is the root directory of the TypeScript project containing all of the \*.ts files, and not the project root directory which was referred to earlier that contains all of the projects files including the `src`, `dist`, `node_modules`, `package.json`, etc. It is the folder that TSC should consider to be the root when compiling.

- `"moduleResolution": "node"` : Is the default, and describes the file finding resolution process in which TSC will find dependencies if and when they are referenced in any code.

- `"include": ["**/*.ts"]` : Indicates to compile all files it finds ending in .ts in this and any sub folders relative to the rootDir setting within this same tsconfig.json.

#### Compile files

`tsc -p ./src`

For documentation on all the options that you can have in a tsconfig.json file, visit https://www.typescriptlang.org/tsconfig

#### TSC Watch

`tsc -p ./src -w`

### Common Types

#### Types

In the TypeScript version I have demonstrated explicitly setting some types of

- string
- boolean
- number
- array of numbers
- tuple
- dictionary
- set

```ts
let foo: string; //string
let bar: boolean; //boolean
let baz: number; //number
let qux: string[]; //array of string
let quuz: [number, string]; //a tuple of two elements consisting of a number and a string
let corge: { [key: number]: string }; //dictionary if string where the key is a number
let grault: Set<number>; //a Set of numbers

foo = "ABC";
bar = true;
baz = 123;
qux = ["a", "b", "c"];
quuz = [1, "abc"];
corge = { 123: "abc", 456: "def" };
grault = new Set([1, 2, 3]);
```

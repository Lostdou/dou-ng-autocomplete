# dou-ng-autocomplete

Un componente simple de Autocomplete hecho para Angular 18+ 🚀

[![npm version](https://badge.fury.io/js/dou-ng-autocomplete.svg)](https://www.npmjs.com/package/dou-ng-autocomplete)

## ✨ Características

- Fácil de usar  
- Personalizable  
- Compatible con Angular 18+  
- Ligero y sin dependencias externas  

## 📦 Instalación

```bash
npm install dou-ng-autocomplete
```

## 🔧 Uso básico

Importá el módulo en tu componente o en el módulo donde lo vayas a usar:

```ts
import { DouNgAutocompleteModule } from 'dou-ng-autocomplete';

@Component({
  imports: [DouNgAutocompleteModule]
})
```

En el HTML:

```html
<dou-autocomplete
  [items]="['Angular', 'React', 'Vue']"
  (select)="onItemSelect($event)">
</dou-autocomplete>
```

En el componente:

```ts
onItemSelect(item: string) {
  console.log('Seleccionado:', item);
}
```

## 📚 Inputs disponibles

| Input         | Tipo       | Descripción                    |
|---------------|------------|--------------------------------|
| `items`       | `string[]` | Lista de opciones a mostrar    |
| `placeholder` | `string`   | Texto del input (opcional)     |

## 📦 Outputs

| Output   | Tipo                  | Descripción                        |
|----------|-----------------------|------------------------------------|
| `select` | `EventEmitter<string>` | Se emite al seleccionar un ítem   |

## 🛠️ Requisitos

- Angular >= 18.0.0  
- `@angular/forms`


**[@lostdou](https://github.com/lostdou)**  
Hecho con ❤️.

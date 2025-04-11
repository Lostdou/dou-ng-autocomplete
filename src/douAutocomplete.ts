import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, Renderer2, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

interface SearchItem {
  idUnidad: number;
  nombre: string;
}

@Component({
  selector: 'app-dou-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './douAutocomplete.html',
  styleUrls: ['./douAutocomplete.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DouAutocompleteComponent),
      multi: true,
    },
  ],
})
export class DouAutocompleteComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() items: SearchItem[] = [];
  @Output() itemSelected = new EventEmitter<SearchItem>();
  @Output() inputCleared = new EventEmitter<void>();

  query: string = '';
  filteredItems: SearchItem[] = [];
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private clickListener?: () => void; // Marcar como opcional

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Escucha clics en el documento
    this.clickListener = this.renderer.listen('document', 'click', (event: Event) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.filteredItems = []; // Cierra el autocompletado si el clic es fuera del componente
      }
    });
  }

  ngOnDestroy(): void {
    // Elimina el listener al destruir el componente
    if (this.clickListener) {
      this.clickListener();
    }
  }

  onInput(): void {
    const normalize = (str: string) =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const queryLower = normalize(this.query || '');
    this.filteredItems = this.items.filter(item =>
      normalize(item.nombre || '').includes(queryLower)
    );
    this.onChange(this.query);
  }

  selectItem(item: SearchItem): void {
    this.query = item.nombre;
    this.filteredItems = [];
    this.onChange(item.idUnidad);
    this.itemSelected.emit(item);
  }

  clearQuery(): void {
    this.query = '';
    this.filteredItems = [];
    this.onChange('');
    this.inputCleared.emit();
  }

  writeValue(value: any): void {
    this.query = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  highlightText(text: string, keyword: string): string {
    if (!text || !keyword) return text;

    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<b>$1</b>');
  }
}
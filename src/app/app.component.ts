import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'roman-numbers';

  numberConverted!: number;

  error: boolean = false;

  convertRomanNumber(romanNumber: string): void {
    if (romanNumber == null || romanNumber.length == 0) {
      this.numberConverted = -1;
      this.error = false;
      return;
    }

    try {
      this.error = false;
      if (!this.isRomanNumber(romanNumber)) {
        throw new Error(
          'The number is empty, incorrect, or contains invalid characters!'
        );
      }

      const romanValues = new Map<string, number>([
        ['I', 1],
        ['V', 5],
        ['X', 10],
        ['L', 50],
        ['C', 100],
        ['D', 500],
        ['M', 1000],
        ['P', 5000],
        ['O', 10000],
        ['U', 50000],
        ['K', 100000],
        ['J', 500000],
        ['H', 1000000],
      ]);

      let result = 0;

      for (let i = 0; i < romanNumber.length; i++) {
        const currentValue = romanValues.get(romanNumber[i])!;
        const nextValue =
          i + 1 < romanNumber.length ? romanValues.get(romanNumber[i + 1])! : 0;

        if (nextValue > currentValue) {
          result += nextValue - currentValue;
          i++;
        } else {
          result += currentValue;
        }
      }

      this.numberConverted = result;
    } catch (error) {
      this.numberConverted = -1;
      this.error = true;
      console.error(error);
    }
  }

  isRomanNumber(romanNumber: string): boolean {
    var pattern = new RegExp(
      '^H{0,4}(HJ|JK|J?K{0,3})(KU|OU|U?O{0,3})(OP|UP|P?O{0,3})(OM|PM|P?M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$'
    );
    if (romanNumber.length == 0 || romanNumber == null) {
      return false;
    } else if (pattern.test(romanNumber)) {
      return true;
    }
    return false;
  }
}

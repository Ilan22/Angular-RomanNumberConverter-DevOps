import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterOutlet], // Au lieu de declarations: [AppComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default title', () => {
    expect(component.title).toBe('roman-numbers');
  });

  describe('convertRomanNumber', () => {
    it('should convert simple roman numbers correctly', () => {
      component.convertRomanNumber('X');
      expect(component.numberConverted).toBe(10);
      expect(component.error).toBeFalsy();

      component.convertRomanNumber('V');
      expect(component.numberConverted).toBe(5);
      expect(component.error).toBeFalsy();

      component.convertRomanNumber('III');
      expect(component.numberConverted).toBe(3);
      expect(component.error).toBeFalsy();
    });

    it('should handle subtractive notation correctly', () => {
      component.convertRomanNumber('IV');
      expect(component.numberConverted).toBe(4);
      expect(component.error).toBeFalsy();

      component.convertRomanNumber('IX');
      expect(component.numberConverted).toBe(9);
      expect(component.error).toBeFalsy();

      component.convertRomanNumber('XL');
      expect(component.numberConverted).toBe(40);
      expect(component.error).toBeFalsy();
    });

    it('should handle complex roman numbers correctly', () => {
      component.convertRomanNumber('MCMXCIX');
      expect(component.numberConverted).toBe(1999);
      expect(component.error).toBeFalsy();

      component.convertRomanNumber('MMXXIII');
      expect(component.numberConverted).toBe(2023);
      expect(component.error).toBeFalsy();
    });

    it('should handle empty or null input', () => {
      component.convertRomanNumber('');
      expect(component.numberConverted).toBe(-1);
      expect(component.error).toBeFalsy();

      component.convertRomanNumber(null!);
      expect(component.numberConverted).toBe(-1);
      expect(component.error).toBeFalsy();
    });

    it('should handle invalid roman numbers', () => {
      component.convertRomanNumber('ABC');
      expect(component.numberConverted).toBe(-1);
      expect(component.error).toBeTruthy();

      component.convertRomanNumber('IIII');
      expect(component.numberConverted).toBe(-1);
      expect(component.error).toBeTruthy();
    });

    it('should handle extended roman numerals', () => {
      component.convertRomanNumber('H');
      expect(component.numberConverted).toBe(1000000);
      expect(component.error).toBeFalsy();

      component.convertRomanNumber('J');
      expect(component.numberConverted).toBe(500000);
      expect(component.error).toBeFalsy();

      component.convertRomanNumber('K');
      expect(component.numberConverted).toBe(100000);
      expect(component.error).toBeFalsy();
    });
  });

  describe('isRomanNumber', () => {
    it('should validate correct roman numbers', () => {
      expect(component.isRomanNumber('I')).toBeTruthy();
      expect(component.isRomanNumber('IV')).toBeTruthy();
      expect(component.isRomanNumber('MCMXCIX')).toBeTruthy();
      expect(component.isRomanNumber('H')).toBeTruthy();
    });

    it('should invalidate incorrect roman numbers', () => {
      expect(component.isRomanNumber('')).toBeFalsy();
      expect(component.isRomanNumber('ABC')).toBeFalsy();
      expect(component.isRomanNumber('IIII')).toBeFalsy();
      expect(component.isRomanNumber('VV')).toBeFalsy();
    });
  });
});

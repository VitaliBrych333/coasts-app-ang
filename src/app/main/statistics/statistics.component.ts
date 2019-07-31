import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  startDate = new Date(1990, 0, 1);
  selectedCompanies;
    companies: any[] = [];
    companiesNames = ['Uber', 'Microsoft', 'Flexigen'];

    ngOnInit() {
        this.companiesNames.forEach((c, i) => {
            this.companies.push({ id: i, name: c });
        });
    }

    addTagFn(name) {
        return { name: name, tag: true };
    }

}



// import { Component, OnInit, forwardRef, Input } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
// import { DataService } from '../data.service';

// @Component({
//   selector: 'app-ng-select',
//   templateUrl: './ng-select.component.html',
//   styleUrls: ['./ng-select.component.css'],
//   host: {'(click)': 'onTouched($event)'},
//   providers: [
//     {
//         provide: NG_VALUE_ACCESSOR,
//         useExisting: forwardRef(() => MultipleDemoComponent),
//         multi: true
//     },
//     {
//       provide: NG_VALIDATORS,
//       useExisting: forwardRef(() => MultipleDemoComponent),
//       multi: true,
//     }
//   ]
// })

// export class MultipleDemoComponent implements  ControlValueAccessor, OnInit, Validator {
//   @Input() public valueSelect: object;

//   items: Array<string> = [];
//   active: Array<string> = [];

//   ngOnInit() {
//     this.dataService.getAuthors().subscribe((data: any) => {
//       data.map(obj => this.items = [...this.items, obj.name].sort())
//     })
//   }

//   constructor(private dataService: DataService) { }

//   public selected(value:any):void {
//     this.writeValue(value);
//   }

//   public removed(value:any):void {
//     this.active.splice(this.active.indexOf(value), 1);
//     this.onChange(this.active.length);
//   }

//   public itemsToString(value:Array<any> = []):string {
//     return value
//       .map((item:any) => {
//         return item.text;
//       }).join(',');
//   }

//   public validate(c: FormControl) {
//     return (this.active.length > 0) ? null : {
//         checkValid: {
//           valid: false,
//         },
//     };
//   }

//   writeValue(value) {
//     if (!value || typeof value !== 'object') {
//       return
//     }

//     this.active.push(value);
//     this.onChange(this.active.length);
//   }

//   onChange: any = () => {
//   };

//   onTouched: any = () => {
//   };

//   registerOnChange(fn) {
//     this.onChange = fn;
//   }

//   registerOnTouched(fn) {
//     this.onTouched = fn;
//   }
// }

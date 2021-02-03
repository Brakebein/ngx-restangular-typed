# ngx-restangular-typed

This module depends on [ngx-restangular](https://github.com/2muchcoffeecom/ngx-restangular/), passes its compiled scripts, but overrides type definitions for better typings and IDE support in your Angular app.
It also adds generic types, such that you can equip your data to be returned with Restangular methods. 

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { Restangular, RestCollection, RestElement } from 'ngx-restangular-typed';

interface IResource {
  id: string;
  value: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private rest: Restangular
  ) { }
  
  getData(): Observable<RestCollection<IResource>> {
    this.rest
      .all<IResource>('resource')
      .getList();
  }
  
  getItem(id: string|number): Observable<RestElement<IResource>> {
    this.rest
      .one<IResource>('resource', id)
      .get();
  }
  
}

// in your component
@Component({
  selector: 'app-some',
  templateUrl: './some.component.html'
})
export class SomeComponent implements OnInit {
  
  constructor(
    private apiService: ApiService
  ) { }
  
  ngOnInit(): void {
    
    this.apiService.getData()
      .subscribe(resources => {
        
        // RestCollection has all Array methods
        resources.forEach(res => { console.log(res); })
        const firstResource: RestElement<IResource> = resources[0];
        
        // and Restangular methods
        const plain: IResource[] = resources.plain();
        
        resources.post<IResource>({value: 'foo'})
          .subscribe(resource => {
            console.log('Added resource', resource);
          });
        
      });
    
    this.apiService.getItem(1)
      .subscribe(resource => {
        
        // RestElement has all properties of returned data
        console.log(resource.value);
        
        // and Restangular methods
        const plain: IResource = resource.plain();
        
        resource.patch({value: 'bar'});
        
      });
    
  }
  
}
```

import { Directive, ElementRef, HostListener, Input ,Renderer2,HostBinding} from '@angular/core';

@Directive({
  selector: '[employeeHover]'
})
export class EmployeeDirective {


  @Input('role') role: boolean;

  constructor(private el: ElementRef,private renderer: Renderer2) {
  }



  @HostListener('mouseover') onMouseEnter() {

    if (this.role) {
            // this.el.nativeElement.style.backgroundColor = 'red';
            this.renderer.setStyle(this.el.nativeElement,'color','red')
          } else {
            // this.el.nativeElement.style.backgroundColor = 'blue';
            this.renderer.setStyle(this.el.nativeElement,'color','blue')
          }
        this.active=true;
      
  }

  // @HostListener('mouseout') onMouseLeave() {
  //   // this.el.nativeElement.style.backgroundColor = '';
  //   this.renderer.setStyle(this.el.nativeElement,'color','')

  // }
  @HostBinding('class.selected') active:boolean;
  
  @HostListener('mouseout') onMouseOut(){
    this.renderer.removeStyle(this.el.nativeElement, 'color');
    this.active = false;
  } 

}

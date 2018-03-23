import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export interface ScrollEvent {
  element: HTMLElement;
  scrollTop: number;
  scrollHeight: number;
  height: number;
  bottom: number;
}

@Injectable()
export class ScrollService {
  private scrollSource = new Subject<ScrollEvent>();
  private scrollSource$ = this.scrollSource.asObservable();

  private scroller: HTMLElement;

  constructor() {

  }

  setScroller(scroller: HTMLElement) {
    this.scroller = scroller;
  }

  getScroller() {
    return this.scroller;
  }

  scrollTop(scrollTop?: number) {
    if (this.scroller) {
      scrollTop = scrollTop || 0;
      this.scroller.scrollTop = scrollTop;
    }
  }

  // Broadcast scroll event to child component
  broadcastScrollEvent(event: ScrollEvent) {
      this.scrollSource.next(event);
  }

  // Observable for child component subscribe scroll event
  getScrollObservable(): Observable<Object> {
    return this.scrollSource$;
  }

}

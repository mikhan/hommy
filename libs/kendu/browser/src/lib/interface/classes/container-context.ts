// import { filter, map, share, tap } from 'rxjs'
// import { isUndefined } from '@decet/core-common'
// import {
//   ContainerTrigger,
//   ContainerContextConfig,
//   OBSERVER_OPTIONS,
//   Query,
// } from '../services/container-query.service'
// import { IntersectionObservable } from '../services/intersection-observer.service'

export class ContainerContext {
  // export class ContainerContext<T extends HTMLElement = HTMLElement> {
  // private triggers = new Map<string, ContainerTrigger>()
  // public observable: IntersectionObservable
  // constructor(
  //   public element: T,
  //   private config: ContainerContextConfig,
  //   observerFactory: (
  //     options: IntersectionObserverInit,
  //   ) => IntersectionObservable,
  // ) {
  //   const options = { ...OBSERVER_OPTIONS, root: element }
  //   this.observable = observerFactory(options)
  //   this.element.classList.add(this.config.containerClassname)
  // }
  // query(query: Query) {
  //   let trigger = this.triggers.get(query.width)
  //   if (!trigger) {
  //     trigger = this.getTrigger(query)
  //     this.triggers.set(query.width, trigger)
  //     this.observable.observe(trigger.element)
  //     this.element.append(trigger.element)
  //   }
  //   return trigger.observable
  // }
  // private getTrigger(query: { width: string }): ContainerTrigger {
  //   const element = document.createElement('div')
  //   element.classList.add(this.config.triggerClassname)
  //   element.style.setProperty('width', query.width)
  //   const observable = this.observable.changes$.pipe(
  //     map((entries) => entries.find((entry) => entry.target === element)),
  //     filter(
  //       (entry): entry is IntersectionObserverEntry => !isUndefined(entry),
  //     ),
  //     tap((e) => e),
  //     share(),
  //   )
  //   return { element, observable }
  // }
}

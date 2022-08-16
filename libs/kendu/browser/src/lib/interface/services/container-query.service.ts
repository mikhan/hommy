// import { coerceElement } from '@angular/cdk/coercion'
// import { DOCUMENT } from '@angular/common'
// import { ElementRef, InjectionToken } from '@angular/core'
// import { Inject } from '@nestjs/common'
// import { finalize, map, Observable } from 'rxjs'
// import { ContainerContext } from '../classes/container-context'
// import { IntersectionObserverManagerService } from './intersection-observer.service'

// export const QUERY_CONTAINER_CONFIG = new InjectionToken('Query container service configuration')

// const QUERY_ELEMENT_CLASSNAME_PREFIX = new InjectionToken('Query element className prefix', {
//   providedIn: 'root',
//   factory: () => 'container-element',
// })

// export const OBSERVER_OPTIONS: IntersectionObserverInit = {
//   rootMargin: '0px 0px 0px 0px',
//   threshold: 1,
// }

// export interface ContainerQueryMatch<T extends HTMLElement> {
//   target: T
//   queries: string[]
// }

// const DEFAULT_CONFIG = {
//   containerClassname: 'cq',
//   triggerClassname: 'cq__trigger',
// }

// export interface ContainerTrigger {
//   element: HTMLElement
//   observable: Observable<IntersectionObserverEntry>
// }

// export interface Query {
//   width: string
// }

// export interface ContainerContextConfig {
//   type: 'size' | 'inline-size' | 'block-size'
//   containerClassname: string
//   triggerClassname: string
// }

// export class ContainerRegistry<T extends HTMLElement> extends Map<T, ContainerContext<T>> {}

export class ContainerQueryService {
  // private styleElement: HTMLStyleElement | null = null
  // private config: ContainerContextConfig
  // readonly isAvailable: boolean = this.observerManager.isAvailable
  // private containerRegistry = new ContainerRegistry()
  // constructor(
  //   private observerManager: IntersectionObserverManagerService,
  //   @Inject(DOCUMENT) private document: Document,
  //   @Inject(QUERY_ELEMENT_CLASSNAME_PREFIX) private prefix: string,
  //   @Inject(QUERY_CONTAINER_CONFIG) config: Partial<ContainerContextConfig> = {},
  // ) {
  //   this.config = { ...DEFAULT_CONFIG, ...config } as ContainerContextConfig
  //   if (!this.isAvailable) return
  //   this.createStyles()
  // }
  // registerContainer<T extends HTMLElement>(element: T | ElementRef<T>): ContainerContext<T> {
  //   const target = coerceElement(element)
  //   let container = this.containerRegistry.get(target) as ContainerContext<T> | undefined
  //   if (container) return container
  //   container = new ContainerContext(target, this.config, (options) => this.observerManager.create(options))
  //   this.containerRegistry.set(target, container)
  //   return container
  // }
  // observe<T extends HTMLElement>(target: T): Observable<ContainerQueryMatch<T>> {
  //   const triggers = this.createTriggers(target)
  //   const getPrefixedClassName = (className: string) => `${this.prefix} ${className}`.trim().replaceAll(' ', '-')
  //   return this.observerManager.create(triggers, { ...OBSERVER_OPTIONS, root: target }).pipe(
  //     map((entries) => {
  //       const queries: string[] = []
  //       for (const { target, intersectionRatio } of entries) {
  //         const query = (target as HTMLElement).dataset['eqioQuery']
  //         if (!query) throw new Error("query property is not defined in element's dataset.")
  //         const className = getPrefixedClassName(query)
  //         const isMinWidthQuery = query.indexOf('>') === 0
  //         const isIntersected = intersectionRatio === 1
  //         const hasClassName = target.classList.contains(className)
  //         if (isMinWidthQuery === isIntersected && hasClassName) {
  //           target.classList.add(className)
  //           queries.push(query)
  //         }
  //         if (isMinWidthQuery !== isIntersected && !hasClassName) {
  //           target.classList.remove(className)
  //           queries.push(query)
  //         }
  //       }
  //       return { target, queries }
  //     }),
  //     finalize(() => {
  //       triggers.forEach((trigger) => target.removeChild(trigger))
  //       delete target.dataset['eqioQueries']
  //     }),
  //   )
  // }
  // private createTrigger({ width }: { width: string }) {
  //   const trigger = document.createElement('div')
  //   trigger.classList.add(this.config.triggerClassname)
  //   trigger.style.setProperty('width', width)
  //   return trigger
  // }
  // private createTriggers(element: HTMLElement) {
  //   const queries = element.dataset['eqioQueries']?.split(' ') ?? []
  //   const fragment = document.createDocumentFragment()
  //   const triggers: HTMLElement[] = []
  //   for (const query of queries) {
  //     const trigger = document.createElement('div')
  //     trigger.classList.add('eqio__trigger')
  //     trigger.dataset['eqioQuery'] = query
  //     trigger.style.setProperty('width', `${query.slice(1)}px`)
  //     triggers.push(trigger)
  //     fragment.appendChild(trigger)
  //   }
  //   element.appendChild(fragment)
  //   return triggers
  // }
  // private createStyles(): void {
  //   if (this.styleElement) return
  //   const css = this.document.createTextNode(`
  //     .${this.config.containerClassname} {
  //       position: relative;
  //     }
  //     .${this.config.triggerClassname} {
  //       height: 1px;
  //       left: 0;
  //       pointer-events: none;
  //       position: absolute;
  //       top: 0;
  //       visibility: hidden;
  //       z-index: -1;
  //     }`)
  //   this.styleElement = this.document.createElement('style')
  //   this.styleElement.appendChild(css)
  //   this.document.head.insertBefore(this.styleElement, this.document.head.children[0])
  // }
}

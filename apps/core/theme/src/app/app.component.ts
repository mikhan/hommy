import { Component, OnInit } from '@angular/core'
import { Apollo, gql, TypedDocumentNode } from 'apollo-angular'

interface GetNeighborResult {
  getNeighbor: {
    id: string
    profile: {
      name: string
      lastname: string
    }
  }
}

const GetNeighborQuery1: TypedDocumentNode<GetNeighborResult, { id: string }> = gql`
  query GetNeighbor($id: ID!) {
    getNeighbor(id: $id) {
      id
      profile {
        id
        name
        lastname
      }
    }
  }
`

const GetNeighborQuery2: TypedDocumentNode<GetNeighborResult, { id: string }> = gql`
  query GetNeighbor($id: ID!) {
    getNeighbor(id: $id) {
      id
      profile {
        id
        name
        lastname
        age
        gender
      }
    }
  }
`

const GetNeighborQuery3: TypedDocumentNode<GetNeighborResult, { id: string }> = gql`
  query GetNeighbor($id: ID!) {
    getNeighbor(id: $id) {
      id
      profile {
        id
        name
      }
    }
  }
`

@Component({
  selector: 'core-theme-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({ query: GetNeighborQuery2, variables: { id: '1' } })
      .valueChanges.subscribe(({ data, loading, error }) => {
        console.log('GetNeighborQuery', { data: data?.getNeighbor, loading, error })

        this.apollo
          .watchQuery({ query: GetNeighborQuery1, variables: { id: '1' } })
          .valueChanges.subscribe(({ data, loading, error }) => {
            console.log('GetNeighborQuery2', { data: data?.getNeighbor, loading, error })

            this.apollo
              .watchQuery({ query: GetNeighborQuery3, variables: { id: '1' } })
              .valueChanges.subscribe(({ data, loading, error }) => {
                console.log('GetNeighborQuery2', { data: data?.getNeighbor, loading, error })
              })
          })
      })
  }
}

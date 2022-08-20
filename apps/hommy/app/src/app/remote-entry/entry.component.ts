import { Component, OnInit } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'

const GetNeighborQuery = gql`
  query GetNeighbor($id: ID!) {
    getNeighbor(id: $id) {
      id
      profile {
        name
        lastname
      }
    }
  }
`

@Component({
  selector: 'hommy-hommy-app-entry',
  templateUrl: './entry.component.html',
})
export class RemoteEntryComponent implements OnInit {
  neightbor: any
  loading = true
  error?: string

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({ query: GetNeighborQuery, variables: { id: '1' } })
      .valueChanges.subscribe(({ data, loading, error }) => {
        console.log({ data, loading, error })
        this.neightbor = data
        this.loading = loading
        this.error = error?.message
      })
  }
}

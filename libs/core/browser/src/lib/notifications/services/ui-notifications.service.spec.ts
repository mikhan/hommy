import { TestBed } from '@angular/core/testing'
import { UiNotificationsService } from './ui-notifications.service'

function createService() {
  TestBed.configureTestingModule({})
  return TestBed.inject(UiNotificationsService)
}

describe('UiNotificationsService', () => {
  it("should return 'default' permission", async () => {
    expect.assertions(1)

    const service = createService()
    const permission = await service.requestPermission()

    expect(permission).toBe('default')
  })
})

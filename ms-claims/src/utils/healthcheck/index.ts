import { StatusCodes, StatusHealth } from './constants'

export interface Healthy {
	healty?: boolean
  status?: string
  statusCode?: number
	message?: string
	errors?: string[]
}

export interface HealthIndicator {
  name: string
  heathy: boolean,
  error?: string
}

export class HealthCheck {
  private name: string
  private indicators: HealthIndicator[]
  private errors: string[] = []

  constructor(name: string, indicators: HealthIndicator[]) {
    this.name = name
    this.indicators = indicators
  }

  preparedHealty(): Healthy {
    const isHealty: boolean = this.errors.length == 0
    const statusCode: number = isHealty ? StatusCodes.OK : StatusCodes.SERVICE_UNAVAILABLE
    const status: string = isHealty ? StatusHealth.UP : StatusHealth.DOWN
    const message: string = `The ${this.name} is ${status}`

    return {
      healty: isHealty,
      status,
      statusCode,
      message,
      errors: this.errors
    }
  }

  getIsHealthy(): Healthy {
    this.indicators.forEach((indicator) => {
      if (!indicator.heathy) {
        const error: string = indicator.hasOwnProperty('error') ? indicator.error ?? '' : ''
        this.errors.push(`has no connection to ${indicator.name} ${error}`)
      }
    })
    return this.preparedHealty()
  }
}
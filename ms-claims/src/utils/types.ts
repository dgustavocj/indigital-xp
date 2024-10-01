const TYPES = {
	PgClient: Symbol.for('PgClient'),

    // Health
	HealthController: Symbol.for('HealthController'),
	HealthService: Symbol.for('HealthService'),

	// Claims
	ClaimsController: Symbol.for('ClaimsController'),
	ClaimsService: Symbol.for('ClaimsService'),
	ClaimsRepository: Symbol.for('ClaimsRepository'),
}

export default TYPES;
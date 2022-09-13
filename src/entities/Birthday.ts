import { Entity, PrimaryKey, Property, EntityRepositoryType } from '@mikro-orm/core'
import { EntityRepository } from '@mikro-orm/sqlite'

import { CustomBaseEntity } from './BaseEntity'

// ===========================================
// ================= Entity ==================
// ===========================================

@Entity({ customRepository: () => BirthdayRepository })
export class Birthday extends CustomBaseEntity {
	persistAndFlush() {
		throw new Error("Method not implemented.")
	}

    [EntityRepositoryType]?: BirthdayRepository

    @PrimaryKey()
    id: string

    @Property()
    birthday: Date
	
}

// ===========================================
// =========== Custom Repository =============
// ===========================================

export class BirthdayRepository extends EntityRepository<Birthday> { 

}
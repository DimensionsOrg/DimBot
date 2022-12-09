import { Entity, PrimaryKey, Property, EntityRepositoryType } from '@mikro-orm/core'
import { EntityRepository } from '@mikro-orm/sqlite'

import { CustomBaseEntity } from './BaseEntity'

// ===========================================
// ================= Entity ==================
// ===========================================

@Entity({ customRepository: () => RepRepository })
export class Rep extends CustomBaseEntity {

    [EntityRepositoryType]?: RepRepository

    @PrimaryKey()
    id: string
    user: string

    @Property()
    rep: number
    name : string
}

// ===========================================
// =========== Custom Repository =============
// ===========================================

export class RepRepository extends EntityRepository<Rep> { 

}
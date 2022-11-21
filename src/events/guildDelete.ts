import { ArgsOf, Client } from "discordx"

import { Discord, On } from "@decorators"
import { syncGuild } from "@utils/functions"

@Discord()
export default class GuildDeleteEvent {

    @On('guildDelete')
    async guildDeleteHandler(
        [oldGuild]: ArgsOf<'guildDelete'>,
        client: Client
    ) {

       await syncGuild(oldGuild.id, client)
    }
}
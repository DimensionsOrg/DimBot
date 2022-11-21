import { Category } from "@discordx/utilities"
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js"
import { Client } from "discordx"
import { injectable } from "tsyringe"

import { generalConfig } from "@config"
import { Discord, Slash, SlashOption } from "@decorators"
import { Guild } from "@entities"
import { UnknownReplyError } from "@errors"
import { Guard, UserPermissions } from "@guards"
import { Database } from "@services"
import { resolveGuild, simpleSuccessEmbed } from "@utils/functions"

@Discord()
@injectable()
@Category('Admin')
export default class PrefixCommand {

	constructor(
		private db: Database,
	) {}

	@Slash({ name: 'prefix' })
	@Guard(
		UserPermissions(['Administrator'])
	)
	async prefix(
		@SlashOption({ 
			name: 'prefix', 
			localizationSource: 'COMMANDS.PREFIX.OPTIONS.PREFIX',
			type: ApplicationCommandOptionType.String,
		}) prefix: string | undefined,
		interaction: CommandInteraction,
		client: Client,
		{ localize }: InteractionData
	) {

		const guild = resolveGuild(interaction),
			  guildData = await this.db.get(Guild).findOne({ id: guild?.id || '' })

		if (guildData) {

			guildData.prefix = prefix || null
			this.db.get(Guild).persistAndFlush(guildData)

			simpleSuccessEmbed(
				interaction, 
				localize['COMMANDS']['PREFIX']['EMBED']['DESCRIPTION']({ 
					prefix: prefix || generalConfig.simpleCommandsPrefix 
				})
			)
		} 
		else {
			throw new UnknownReplyError(interaction)
		}
			  
	}
}
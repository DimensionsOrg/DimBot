import { Client } from "discordx"
import { Category } from "@discordx/utilities"
import { ApplicationCommandOptionType, CommandInteraction, User } from "discord.js"
import { Birthday } from "@entities"
import  dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import timezone from "dayjs/plugin/timezone"

import { Discord, Slash, SlashGroup, SlashOption } from "@decorators"
import { Guard } from "@guards"
import { Database } from "@services"
import { injectable } from "tsyringe"

dayjs.extend(timezone)
dayjs.extend(customParseFormat)

dayjs.tz.setDefault("Europe/Paris")

@Discord()
@SlashGroup({ name: 'birth' })
@SlashGroup('birth')
@Category('Admin')
@injectable()
export default class DelBirthCommand {
	
	constructor(
		private db : Database
	){}

	@Slash({name: 'del'})
	@Guard()
	async delBirth(
		@SlashOption({name : 'user', type : ApplicationCommandOptionType.User}) user: User,
		interaction: CommandInteraction,
		client: Client,
		{ localize }: InteractionData
	) {
		
		const birthdayRepo = this.db.get(Birthday)
		const birthday = await birthdayRepo.findOne({id : user.id})
		if(birthday){
			await birthdayRepo.removeAndFlush(birthday)
			interaction.followUp(`<@${user.id}> - ${dayjs(birthday.birthday).format('DD/MM/YYYY')} Supprimé!`)
		}else{
			interaction.followUp(`<@${user.id}> - Pas d'anniversaire trouvé..`)
		}
	}
}
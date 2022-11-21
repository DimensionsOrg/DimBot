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
export default class AddBirthCommand {
	
constructor(
	private db : Database
){}
	

	@Slash({ name: 'add' })
	@Guard()
	async addBirth(
		@SlashOption({name : 'user', type : ApplicationCommandOptionType.User}) user: User,
		@SlashOption({name : 'date', type : ApplicationCommandOptionType.String}) date: string,
		interaction: CommandInteraction,
		client: Client,
		{ localize }: InteractionData
		
	) {

		
		const birthdayRepo = this.db.get(Birthday)
		const birthday = new Birthday()
		birthday.birthday =  dayjs(date, 'DD/MM/YYYY').toDate()
		birthday.id = user.id

		await birthdayRepo.persistAndFlush(birthday)

		interaction.followUp(`<@${birthday.id}> - ${dayjs(birthday.birthday).format('DD/MM/YYYY')} added`)
	}	
}
import { Client } from "discordx"
import { Category } from "@discordx/utilities"
import { CommandInteraction, EmbedBuilder, User } from "discord.js"
import { Birthday } from "@entities"
import  dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import timezone from "dayjs/plugin/timezone"

import { Discord, Slash, SlashGroup, SlashOption } from "@decorators"
import { Guard } from "@guards"
import { Database } from "@services"
import { injectable } from "tsyringe"
import { formatDate } from "@utils/functions"


@Discord()

@Category('Admin')
@injectable()
export default class AnnivCommand {
	
constructor(
	private db : Database
){}
	@Slash({ name: 'anniv' })
	@Guard()
	async anniv(
		
		interaction: CommandInteraction,
		client: Client,
		{ localize }: InteractionData
		
	) {
		
		const birthdayRepo = this.db.getRepo(Birthday)
		const birthdays = await birthdayRepo.findAll()
		const bids = await birthdays.filter(b => dayjs(b.birthday).format('DD/MM') === dayjs().format('DD/MM')).map(b => b.id!)
		const busernames: string[] = []
		for (const bid of bids) {
			const user = await client.users.fetch(bid).catch(err => null)
			if (user) busernames.push(user.tag)
		}
		//const busername = await client.users.fetch(bid).then(u => u.tag).catch(err => console.log(err))
		 
		
		if(birthdays.length === 0) {
			interaction.followUp('No birthdays')
			return
		}else{
			
			const embed = new EmbedBuilder()
				.setTitle('Anniversaires !')
				.setColor('#0099ff')
				.setDescription(birthdays.map(b => `<@${b.id}> : ${dayjs(b.birthday).format('DD/MM/YYYY')}`).join('\n'))			
				.setThumbnail('https://cdn.discordapp.com/avatars/617748486590300163/4d8b43300968e87f950bfc7161dab6b6.png')
				.setFooter({text : `🎉 Anniversaire(s) du jour : ${busernames.join(' | ')}`})
			interaction.followUp({embeds: [embed]})
		}
	}	
}
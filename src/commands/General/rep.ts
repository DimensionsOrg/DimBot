import { Client } from 'discordx'
import { Category } from '@discordx/utilities'
import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, User } from "discord.js"
import { Rep } from "@entities"
import { Discord, Slash, SlashGroup, SlashOption } from "@decorators"
import { Guard } from '@guards'
import { Database } from '@services'
import { injectable } from "tsyringe"


@Discord()
@Category('General')
@injectable()
export default class RepCommand {

	constructor(
		private db : Database
	){}

	@Slash({
		name: 'rep',
		description: 'Vous permet de donner de la réputation à un utilisateur'
	})
	
	@Guard()
		async rep(

		@SlashOption({name : 'user', type : ApplicationCommandOptionType.User}) user: User,
		interaction: CommandInteraction,
		client: Client,
		{ localize }: InteractionData
		

	) {
		const users = interaction.options.getUser('user')
		if(!user) return interaction.followUp('Vous devez mentionner un utilisateur !')
		if(user === interaction.user) return interaction.followUp('Vous ne pouvez pas vous donner de la réputation !')
		if(user === client.user) return interaction.followUp('Vous ne pouvez pas me donner de la réputation !')

		const repRepo = this.db.get(Rep)
		const rep = await repRepo.findOne({ user: user.id })
		if(!rep) {
			const newRep = new Rep()
			newRep.id = user.id
			newRep.rep = 0
			newRep.name = user.username
			await repRepo.persistAndFlush(newRep)
			return interaction.followUp('Vous avez donné de la réputation à ' + interaction.options.getUser('user') + ' !')

		}
		
		rep.rep++
		await repRepo.persistAndFlush(rep)
		return interaction.followUp('Vous avez donné de la réputation à ' + interaction.options.getUser('user') + ' !')
	}
}
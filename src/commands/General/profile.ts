import { Client } from 'discordx'
import { Category } from '@discordx/utilities'
import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder, User } from "discord.js"

import { Discord, Slash, SlashGroup, SlashOption } from "@decorators"
import { Guard } from "@guards"
import { Database } from "@services"
import { injectable } from "tsyringe"


@Discord()
@Category('General')
export default class ProfileCommand {

	@Slash({
		name: 'profile',
		description: 'Pour voir votre joli profil!',
	})
	@Guard()
	async profile(
		interaction: CommandInteraction,
		client: Client,
		{ localize }: InteractionData
	) {
		
		const embed = new EmbedBuilder()
			.setTitle('Profil')
			.setColor('#0099ff')
			.setDescription('Voici votre profil !')
			.addFields(
				{ name: 'Nom', value: interaction.user.username, inline: true },
				{ name: 'ID', value: interaction.user.id, inline: true },
				{ name: 'Tag', value: interaction.user.tag, inline: true },
				{ name: 'Réputation', value: '0', inline: true }

			)
			.setThumbnail(interaction.user.displayAvatarURL())
		interaction.followUp({embeds: [embed]})
		

	}
}
export const generalConfig: GeneralConfigType = {

    __templateVersion: '1.1.0',

	name: 'dimbot',
	description: '',
	defaultLocale: 'en',
	simpleCommandsPrefix: '!',
	ownerId: '788078995459145748',
	timezone: 'Europe/Paris',

	links: {
		invite: 'https://www.change_invite_link_here.com',
		supportServer: 'https://discord.com/your_invitation_link',
		gitRemoteRepo: 'https://github.com/barthofu/tscord',
	},
	
	automaticUploadImagesToImgur: false,

	devs: [
		'788078995459145748',
	],

	eval: {
		name: 'bot',
		onlyOwner: false
	},

    activities: [
		{
			text: 'discord.js v14',
			type: 'PLAYING'
		},
		{
			text: 'some knowledge',
			type: 'STREAMING'
		}
	]

}

export const colorsConfig = {

	primary: '#2F3136'
}

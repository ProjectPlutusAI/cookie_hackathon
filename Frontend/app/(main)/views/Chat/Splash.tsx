'use client'
import { Flex, Button } from '@/ui/primitives'
import Image, { StaticImageData } from 'next/image'
import { TypingAnimation } from '@/ui/magic'
import ai16z from '@/assets/icons/ai16z.jpg'
import fwog from '@/assets/icons/fwog.png'
import bonk from '@/assets/icons/bonk.jpg'

export const Splash = ({ handleSuggestion, custodialWallet }: { handleSuggestion: (input: string) => void; custodialWallet: string }) => {
	type Capability = { icon: string; text: string; fill: string }
	const capabilities: Capability[] = [
		{
			icon: 'gears',
			text: 'Token Analysis',
			fill: 'Please type a token address to analyze!'
		},
		{
			icon: 'github',
			text: 'Github Analysis',
			fill: 'Please type the url of a public github repo!'
		},
		{
			icon: 'github',
			text: 'Bottom Blaster',
			fill: 'Please type a token address to use the Bottom Blaster Agent!'
		},
		{
			icon: 'github',
			text: 'Top Seller',
			fill: 'Please type a token address to use the Top Seller Agent!'
		},
		{
			icon: 'github',
			text: 'Potatoe Agent',
			fill: 'Please type a token address to use the Potatoe Agent!'
		}
	]
	// "Token analysis" "Github analysis" "Bottom Blaster" "Top Seller"

	type Trending = { image: StaticImageData; address: string; name: string; fill: string }
	const trending: Trending[] = [
		{
			image: bonk,
			address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
			name: 'BONK',
			fill: 'Analyze: DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'
		},
		{
			image: ai16z,
			address: 'HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC',
			name: 'ai16z',
			fill: 'Analyze: HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC'
		},
		{
			image: fwog,
			address: 'A8C3xuqscfmyLrte3VmTqrAq8kgMASius9AFNANwpump',
			name: 'FWOG',
			fill: 'Analyze: A8C3xuqscfmyLrte3VmTqrAq8kgMASius9AFNANwpump'
		}
	]

	return (
		<Flex className="flex-col size-full max-h-[620px] items-start justify-between px-4 py-2 md:py-4 gap-8 text-ppGray100">
			<Flex className="flex-col items-start h-20 min-h-20 md:h-44 md:min-h-44 md:m-0">
				{/* NEED TO FIX FOR SMALL NON-MOBILE SCREENS */}
				<TypingAnimation className="!text-mob-h1 md:!text-h1 lg:!text-h1 !leading-snug text-splash h-[88px] min-h-[88px] md:h-44 md:min-h-44">{['Hi there!', "I'm Agent PP"]}</TypingAnimation>{' '}
			</Flex>
			<Flex className="flex-col md:w-5/5 gap-4 items-start">
				<span className="text-offWhite !text-mob-h4 md:!text-h4">Your PP Wallet:</span>
				<span className="text-offWhite !text-mob-h4 md:!text-h4">{custodialWallet}</span>
				<Button onClick={() => handleSuggestion('So11111111111111111111111111111111111111112')} className=" text-zinc-900 bg-[white] hover:bg-[white] font-medium mb-10">
					Withdraw SOL
				</Button>
				<span className="text-offWhite !text-mob-h4 md:!text-h4">Select an Agent</span>
				<Flex className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{capabilities.map((c: any) => {
						return (
							<Flex
								key={c.text}
								className="bg-ppGray500 border border-ppGray300 rounded-full font-mob-body-lg px-4 py-2
					 transition-all duration-200 hover:bg-ppGray400 hover:border-ppGray100 hover:scale-105 cursor-pointer"
								onClick={() => handleSuggestion(c.fill)}>
								{c.text}
							</Flex>
						)
					})}
				</Flex>
			</Flex>

			<Flex className="flex-col md:w-3/5 gap-4 items-start">
				<span className="text-offWhite !text-mob-h4 md:!text-h4">Try exploring memecoins</span>
				<Flex className="flex-row gap-4">
					{trending.map((t: any) => {
						return (
							<Button onClick={() => handleSuggestion(t.fill)} key={t.name} className="bg-ppGray400 border border-ppGray300 rounded-full font-mob-body-lg h-12 hover:text-ppGray500">
								<Image src={t.image} alt={t.name} width={24} height={24} className="rounded-full mr-1" />
								{t.name}
							</Button>
						)
					})}
				</Flex>
			</Flex>
		</Flex>
	)
}

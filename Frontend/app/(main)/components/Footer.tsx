'use client'
import { SplashCloud } from '@/(main)/components/splashCloud'
import { Flex, Button } from '@/ui/primitives'
import { dexscreener, twitter, telegram, gitbooks } from '@/assets/linkouts'
import Image from 'next/image'
import { ArrowRight, Copy } from 'lucide-react'

// THESE LINKS NEED TO BE UPDATED
export const Footer = ({ view }: { view: 'splash' | 'gate' | 'chat' }) => {
	return (
		['splash', 'gate'].includes(view) && (
			<Flex className="hidden md:flex flex-row justify-between md:px-24 w-full bg-ppGray500 h-[68px] gap-6">
				<span className="text-body text-ppGray100">&copy; {new Date().getFullYear()} Project Plutus. All rights reserved</span>
				<Flex className="gap-6 ">
					<a href="https://www.birdeye.so/token/76PsEyML7UV9uiBDWMdG3itRRuupDuRs6nNpjNBpump?chain=solana" target="_blank" rel="noopener noreferrer">
						<Image src={dexscreener} alt="Project Plutus" width={24} height={24} />
					</a>
					<a href="https://x.com/ProjectPlutus_" target="_blank" rel="noopener noreferrer">
						<Image src={twitter} alt="Project Plutus" width={24} height={24} />
					</a>
					<a href="https://t.me/PlutusZz" target="_blank" rel="noopener noreferrer">
						<Image src={telegram} alt="Project Plutus" width={24} height={24} />
					</a>
					<a href="https://docs.projectplutus.ai/" target="_blank" rel="noopener noreferrer">
						<Image src={gitbooks} alt="Project Plutus" width={24} height={24} />
					</a>
				</Flex>
			</Flex>
		)
	)
}


'use client'
import { SplashCloud } from '@/(main)/components/splashCloud'
import { Flex, Button } from '@/ui/primitives'
import { dexscreener, twitter, telegram, gitbooks } from '@/assets/linkouts'
import Image from 'next/image'
import { ArrowRight, Copy } from 'lucide-react'

export const Gate = () => {
	return (
		<>
			<Flex className="flex-col w-full h-[calc(100vh-180px)] p-6 justify-end items-start gap-8">
				<SplashCloud />
				<h1 className="text-h1 text-ppGray100">You need 1M $PPCOIN</h1>
				<span className="text-body text-white">Balance</span>
				<Button className="bg-primary hover:bg-highlight text-black !text-button h-[44px] w-[180px] rounded-full" >
					Buy $PPCOIN
					<ArrowRight color="black" className="!size-6" size={24} />
				</Button>
				<Button className="bg-ppGray500 border-ppGray400 text-ppGray100 h-[44px] w-[180px] rounded-full">
					7sPsE...pump
					<Copy color="#aeafb0" fill="#aeafb0" className="!size-6" size={24} />
				</Button>
			</Flex>
			<GateFooter />
		</>
	)
}

// THESE LINKS NEED TO BE UPDATED
const GateFooter = () => {
	return (
		<Flex className="flex-col w-full bg-ppGray500 h-[120px] gap-6">
			<Flex className="gap-6">
				<a href="https://www.birdeye.so/token/76PsEyML7UV9uiBDWMdG3itRRuupDuRs6nNpjNBpump?chain=solana" target="_blank" rel="noopener noreferrer">
					<Image src={dexscreener} alt="Project Plutus" width={24} height={24} />
				</a>
				<a href="https://x.com/ProjectPlutus_" target="_blank" rel="noopener noreferrer">
					<Image src={twitter} alt="Project Plutus" width={24} height={24} />
				</a>
				<a href="https://x.com/ProjectPlutus_" target="_blank" rel="noopener noreferrer">
					<Image src={telegram} alt="Project Plutus" width={24} height={24} />
				</a>
				<a href="https://x.com/ProjectPlutus_" target="_blank" rel="noopener noreferrer">
					<Image src={gitbooks} alt="Project Plutus" width={24} height={24} />
				</a>
			</Flex>
			<span className="text-body text-ppGray100">&copy; {new Date().getFullYear()} Project Plutus. All rights reserved</span>
		</Flex>
	)
}
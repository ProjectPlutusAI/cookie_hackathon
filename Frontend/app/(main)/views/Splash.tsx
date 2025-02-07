'use client'
import { TypingAnimation } from '@/ui/magic/'
import { SplashCloud } from '@/(main)/components/splashCloud'
import { Flex, Button } from '@/ui/primitives'
import { ArrowRight, Copy } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Footer } from '@/(main)/components/Footer'
import { signIn } from '@/actions'
import { useAuthContext } from '@/context/AuthProvider'
import { useWallet } from '@solana/wallet-adapter-react'

const WalletMultiButton = dynamic(async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton, { ssr: false })


export const Splash = ({ setView }: { setView: (view: 'splash' | 'gate' | 'chat') => void }) => {
	const { publicKey, signMessage } = useWallet()
	const { authMessage, setAuthMessage, access, authSignature, setAuthSignature, setAccess, setCustodialWallet } = useAuthContext()

	const conditionallySignIn = async () => {
		if (!publicKey) return
		if (authMessage && authSignature) return
		await signIn({ publicKey, signMessage, setAuthMessage, setAuthSignature, setAccess, setCustodialWallet })
	}


	return (
		<Flex className="flex-col md:flex-row-reverse w-full h-[calc(100vh-60px)] md:h-[calc(100vh-144px)] md:p-6 justify-end items-start md:items-center gap-8">

			<Flex className="hidden xs:flex flex-1 justify-center items-center w-full h-[260px] md:w-2/5 max-w-[620px] px-0 py-0 m-0">
				<SplashCloud />
			</Flex>

			<Flex className="flex-col h-[calc(100vh-320px)] w-full justify-start md:justify-center items-center md:2/5 max-w-[620px] gap-8 md:mx-8 md:items-start">
				<Flex className="items-start h-20 min-h-20 md:h-44 md:min-h-44 md:m-0">
					<TypingAnimation className="!text-mob-h1 md:!text-h1 lg:!text-h1 !leading-snug text-splash">{['Empowered by AI.', 'Guided by Wealth.']}</TypingAnimation>
				</Flex>
				<h3 className={`${authSignature && !access ? 'hidden' : '!text-mob-h3 sm:!text-h3 text-splash'}`}>Let AI watch the charts for you.</h3>
				<h3 className={`${authSignature && !access ? '!text-mob-h3 sm:!text-h3 text-splash' : 'hidden'}`}>Not on the whitelist. Please contact us.</h3>
				<Flex className="flex-col justify-start items-start md:flex-row gap-4">
					<span onClick={() => conditionallySignIn()} className={`${authSignature && !access ? 'hidden' : ''}`}>
						<WalletMultiButton style={{ backgroundColor: 'white', color: 'black', height: '44px', width: '169px', borderRadius: '9999px', padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', lineHeight: '24px' }}>
							Try the Alpha
							<ArrowRight color="black" className="!size-6" size={24} />
						</WalletMultiButton>
					</span>
					<Button onClick={() => { navigator.clipboard.writeText('76PsEyML7UV9uiBDWMdG3itRRuupDuRs6nNpjNBpump') }} className="bg-ppGray500 border-ppGray400 border-2 text-ppGray100 h-[44px] w-[169px] rounded-full">
						7sPsE...pump
						<Copy color="#aeafb0" fill="#aeafb0" className="!size-6" size={24} />
					</Button>
				</Flex>

			</Flex>
		</Flex>
	)
}
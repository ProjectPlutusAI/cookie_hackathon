'use client'
import { Flex, Button } from '@/ui/primitives'
import logo from '@/assets/brand/logo_full.svg'
import { Menu } from 'lucide-react'
import Image from 'next/legacy/image'
import dynamic from 'next/dynamic'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { shorten } from '@/utils'
import { useAuthContext } from '@/context/AuthProvider'
import { signIn } from '@/actions'
import { dexscreener, twitter, telegram, gitbooks } from '@/assets/linkouts'
const WalletMultiButton = dynamic(async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton, { ssr: false })

const WalletDisconnectButton = dynamic(async () => (await import('@solana/wallet-adapter-react-ui')).WalletDisconnectButton, { ssr: false })

export const Header = ({ view }: { view: 'splash' | 'gate' | 'chat' }) => {
	const { publicKey, signMessage } = useWallet()
	const { authMessage, setAuthMessage, access, authSignature, setAuthSignature, setAccess, setCustodialWallet } = useAuthContext()

	const conditionallySignIn = async () => {
		if (!publicKey) return
		if (authMessage && authSignature) return
		await signIn({ publicKey, signMessage, setAuthMessage, setAuthSignature, setAccess, setCustodialWallet })
	}

	return (
		<Flex className="w-full h-[60px] md:h-[76px] bg-ppGray500 md:bg-transparent py-4 px-6 justify-between">
			{['splash', 'gate'].includes(view) && (
				<Flex className="w-full h-full md:justify-between md:px-24 lg:px-32">
					<Image src={logo} alt="Project Plutus" layout="intrinsic" />
					<span onClick={() => conditionallySignIn()} className={`${authSignature && !access ? 'hidden' : 'hidden md:block'}`} >
						<WalletMultiButton style={{ backgroundColor: '#D5F903', color: 'black', height: '44px', width: '169px', borderRadius: '9999px', padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', lineHeight: '24px' }}>
							Try the Alpha
							<ArrowRight color="black" className="!size-6" size={24} />
						</WalletMultiButton>
					</span>
				</Flex>
			)}
			{['chat'].includes(view) && (
				<Flex className="w-full h-full md:justify-between md:px-24 lg:px-32">
					<Image src={logo} alt="Project Plutus" layout="intrinsic" />
					<Flex className="flex-row gap-6 hidden md:flex">
						<Flex className="gap-6">
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
						<span>
							<WalletMultiButton style={{ backgroundColor: '#111111', color: '#AEAFB0', border: '1px solid #2A2B2E', height: '44px', width: '169px', borderRadius: '9999px', fontSize: '16px', fontWeight: 'bold', lineHeight: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
								{shorten(publicKey?.toBase58() ?? '', 4)}
								<ChevronDown color="#676766" className="!size-6" size={24} />
							</WalletMultiButton>
						</span>
					</Flex>
				</Flex>
			)}
		</Flex>
	)
}
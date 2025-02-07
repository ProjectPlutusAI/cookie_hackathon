import { Flex } from '@/ui/primitives/Flex'
import { TokenAnalysis } from '@/(main)/views/Chat/TokenAnalysis'
import type { Message, TokenData } from '@/utils/types'
import Image from 'next/image'
import robot from '@/assets/robot.svg'
import { ThinkingDots } from '@/ui/magic'
import { GithubAnalysis } from './GithubAnalysis'
import { CookieAnalysis } from './CookieAnalysis'
import { TriggerInfo } from './TriggerInfo'

export const History = ({ messages, isThinking, setInput }: { messages: Message[]; isThinking: boolean; setInput: (input: string) => void }) => {
	console.log('messages', messages)
	return (
		<Flex className="h-full justify-start flex-1 flex-col w-full gap-4 overflow-y-auto scrollbar-hide">
			{messages.map((m, i) => {
				if (m.sender === 'user' && m.text) {
					return (
						<Flex key={i} className="self-end bg-primary text-black p-3 rounded-lg w-[100%] max-w-96">
							<span className="max-w-[22rem] break-words px-2">{m.text}</span>
						</Flex>
					)
				}
				if (m.sender === 'bot' && m.text) {
					return (
						<Flex key={i} className="self-start flex text-white p-3 justify-start rounded-lg w-[85%] max-w-96 items-center gap-3">
							<span className="flex-shrink-0 w-[30px] h-[30px] flex justify-center items-center bg-ppGray400 rounded-full">
								<Image src={robot} alt="robot" width={20} height={20} className="w-auto h-auto" />
							</span>
							<span className="max-w-[22rem] break-words">{m.text}</span>
						</Flex>
					)
				}
				if (m.sender === 'bot' && m.cookieData) {
					return <CookieAnalysis key={i} cookieData={m.cookieData.data} setInput={setInput} />
				}
				if (m.sender === 'bot' && m.triggerInfo) {
					return <TriggerInfo key={i} triggerInfo={m.triggerInfo} />
				}
			})}

			{isThinking && (
				<Flex className="w-full flex-1 justify-start gap-2 max-h-[50px]">
					<span className="flex w-[30px] h-[30px] justify-center items-center bg-ppGray400 rounded-full pb-[2px]">
						<Image src={robot} alt="robot" width={20} height={20} />
					</span>
					<ThinkingDots color="white" />
				</Flex>
			)}
		</Flex>
	)
}

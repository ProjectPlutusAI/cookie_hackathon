'use client'
import { Flex, Button } from '@/ui/primitives'
import { ArrowRight } from 'lucide-react'

type InputProps = { input: string, setInput: (input: string) => void, handleMessage: (input?: string) => void }

export const ChatBox = ({ input, setInput, handleMessage }: InputProps) => {
	return (
		<Flex className="w-full h-16 bg-ppGray500 border border-ppGray400 rounded-full max-w-[760px] pl-6 pr-2">
			{/* Input */}
			<Flex className="flex-1 relative">
				{/* Blinking cursor */}
				<span className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-[2px] h-5 bg-primary animate-blink ${input.length > 0 && 'hidden'}`}></span>
				<input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleMessage(input) }} placeholder="Enter a token address" className="w-full pl-2 text-mob-body-lg md:text-body-lg bg-transparent text-ppGray100 focus:outline-none placeholder-ppGray200" />
			</Flex>
			{/* Send button */}
			<Button onClick={() => handleMessage(input)} className="flex items-center justify-center w-10 h-10 rounded-full bg-primary hover:bg-opacity-90 transition">
				<ArrowRight color="black" className="!size-6" size={24} />
			</Button>
		</Flex>
	)
}
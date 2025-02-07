'use client'
import React, { useEffect, useState } from 'react'
import { Flex } from '@/ui/primitives'
import { Splash } from '@/(main)/views/Chat/Splash'
import { History } from '@/(main)/views/Chat/History'
import { ChatBox } from '@/(main)/views/Chat/ChatBox'
import { wait, findAddressBySymbol } from '@/utils'
import type { Message } from '@/utils/types'
import { useAuthContext } from '@/context/AuthProvider'
import { useWallet } from '@solana/wallet-adapter-react'
import { parseInput, getTokenData, getGithubDataBasic, getGithubDataAdvanced, getGithubAnalysis } from '@/(main)/views/Chat/utils'

export const Chat: React.FC<any> = ({ messages, setMessages }) => {
	const [isThinking, setIsThinking] = useState(false)
	const [input, setInput] = useState('')
	const { authMessage, authSignature, access, custodialWallet, goHome, setGoHome } = useAuthContext()
	const { publicKey, signMessage } = useWallet()

	useEffect(() => {
		if (goHome) {
			setMessages([])
			setGoHome(false)
		}
	}, [goHome])


	const handleCookieAnalysis = async (parsed: string) => {
		try {
			const response = await fetch('/api/getCookieTop')
			if (!response.ok) {
				throw new Error('Failed to fetch Cookie data')
			}
			const data = await response.json()

			if (data.success && data.data) {
				console.log('Cookie top agents data:', data.data)
				setIsThinking(false)
				setMessages((prevMessages: any) => [
					...prevMessages,
					{
						sender: 'bot',
						cookieData: data
					}
				])
			} else {
				throw new Error('Invalid data structure')
			}
		} catch (error) {
			console.error('Error fetching Cookie data:', error)
			setIsThinking(false)
			setMessages((prevMessages: any) => [...prevMessages, { sender: 'bot', text: 'We could not fetch the Cookie data. Please try again later.' }])
		}
	}

	const handleMessage = async (suggestion?: string) => {
		const messageToSend = suggestion || input.trim()
		if (!messageToSend || !access || isThinking) return
		setMessages((prevMessages: any) => [...prevMessages, { sender: 'user', text: messageToSend }])
		setInput('')
		setIsThinking(true)
		const { parsed, type } = await parseInput(messageToSend)
		console.log('type', type)
		if (type == 'cookie_analysis') {
			handleCookieAnalysis(parsed)
		}
		if (type == 'unknown') {
			setIsThinking(false)
			setMessages((prevMessages: any) => [...prevMessages, { sender: 'bot', text: 'Please enter a valid CA. Try again!' }])
		}
	}

	const handleMessagePreSet = async (suggestion?: string) => {
		const messageToSend = suggestion || input.trim()
		if (!messageToSend || !access || isThinking) return
		setMessages((prevMessages: any) => [...prevMessages, { sender: 'bot', text: messageToSend }])
		setInput('')
		const { parsed, type } = await parseInput(messageToSend)
	}

	return (
		<>
			<Flex className="flex-col w-full h-[calc(100vh-60px)] md:h-[calc(100vh-76px)] p-4 gap-8 m-auto">
				<Flex className="h-[calc(100vh-124px)] flex-1 w-full max-w-[760px] md:px-4 m-auto overflow-hidden">
					{messages.length === 0 && <Splash handleSuggestion={handleMessagePreSet} custodialWallet={custodialWallet} />}
					{messages.length > 0 && <History messages={messages} isThinking={isThinking} setInput={setInput} />}
				</Flex>
				<ChatBox input={input} setInput={setInput} handleMessage={handleMessage} />
			</Flex>
		</>
	)
}
